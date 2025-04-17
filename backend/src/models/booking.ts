// models/booking.ts
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  people: { type: Number, required: true },
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
