// controllers/adminController.ts
import { Request, Response } from "express";
import User from "../models/user";
import Restaurant from "../models/restaurant";

// GET all users (excluding password)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET all restaurants
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    console.log("Hello vansh delete user");
    
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE restaurant by ID
export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    console.log("Hello vansh delete restaurant");
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
