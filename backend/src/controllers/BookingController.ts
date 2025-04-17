// controllers/bookingController.ts
import { Request, Response } from "express";
import { Booking } from "../models/booking";
import { log } from "console";

export const createBooking = async (req: Request, res: Response) => {
  try {
    console.log("hello");
    console.log(req.body);
    
    const { restaurantId, restaurantName, name, email, date, time, people } = req.body;

    if (!restaurantName || !name || !email || !date || !time || !people) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = new Booking({
      restaurantName,
      name,
      email,
      date,
      time,
      people,
    });

    await booking.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
