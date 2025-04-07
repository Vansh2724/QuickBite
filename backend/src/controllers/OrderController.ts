import Razorpay from "razorpay";
import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";

// Razorpay key ID and secret (still needed for payment processing)
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay key ID or key secret not provided.");
}

const RAZORPAY = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

const FRONTEND_URL = process.env.FRONTEND_URL as string;

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[]; 
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

// In OrderController.ts

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId, status } = req.body;

  try {
    // Find the order by ID and update the status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.json({ message: "Order status updated successfully", order });
  } catch (error: any) {
    console.error("Order update error:", error);
    res.status(500).json({
      message: error.message || "An error occurred while updating the order.",
    });
  }
};

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    );
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems
    );
    const deliveryPrice = restaurant.deliveryPrice || 0;
    const totalAmount = lineItems.reduce(
      (sum, item) => sum + item.amount * item.quantity,
      deliveryPrice * 100
    );

    const newOrder = new Order({
      restaurant: restaurant._id,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      totalAmount: totalAmount / 100,
      createdAt: new Date(),
    });

    await newOrder.save();

    const razorpayOrder = await CreateOrder(
      lineItems,
      deliveryPrice,
      newOrder._id.toString()
    );

    if (!razorpayOrder) {
      return res
        .status(500)
        .json({ message: "Unable to create order with Razorpay." });
    }

    // Respond with order ID and restaurant name
    res.json({
      id: razorpayOrder.id,
      orderId: newOrder._id,
      restaurantName: restaurant.restaurantName,
      totalAmount: totalAmount / 100, // Send back the total amount
    });
  } catch (error: any) {
    console.error("Checkout session error:", error);
    res.status(500).json({
      message:
        error.message ||
        "An error occurred while creating the checkout session.",
    });
  }
};

const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  return checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId
    );
    if (!menuItem)
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`);

    return {
      name: menuItem.name,
      amount: parseInt(menuItem.price) * 100,
      currency: "INR",
      quantity: parseInt(cartItem.quantity),
    };
  });
};

const CreateOrder = async (
  lineItems: any[],
  deliveryPrice: number,
  orderId: string
) => {
  const totalAmount = lineItems.reduce(
    (sum, item) => sum + item.amount * item.quantity,
    deliveryPrice * 100 // Add delivery price to the total amount
  );

  return RAZORPAY.orders.create({
    amount: totalAmount,
    currency: "INR",
    receipt: `receipt_${orderId}`,
    notes: { orderId },
  });
};

export default { createCheckoutSession, updateOrderStatus, getMyOrders };
