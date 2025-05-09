import { Request, Response } from "express";
import { Booking } from "../models/booking";
import Restaurant from "../models/restaurant";
import { sendBookingEmail } from "../utils/email";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      restaurantId,
      restaurantName,
      name,
      email,
      phone,
      date,
      time,
      people,
    } = req.body;

    if (!restaurantId || !restaurantName || !name || !email || !phone || !date || !time || !people) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = new Booking({
      restaurantId,
      restaurantName,
      name,
      email,
      phone,
      date,
      time,
      people,
    });

    await booking.save();

    await sendBookingEmail({
      to: email,
      name,
      restaurantName,
      date,
      time,
      people,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTodayBookingsForMyRestaurant = async (req: Request, res: Response) => {
  try {
    console.log("Hello i am finding bookings");
    
    const userId = req.userId;
    
    const restaurant = await Restaurant.findOne({ user: userId });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const bookings = await Booking.find({
      restaurantId: restaurant._id,
      date: {
        $gte: startOfDay.toISOString().split("T")[0],
        $lte: endOfDay.toISOString().split("T")[0],
      },
    }).sort({ time: 1 });

    res.json({ bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
