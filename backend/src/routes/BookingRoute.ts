import express from "express";
import {
  createBooking,
  getTodayBookingsForMyRestaurant,
} from "../controllers/BookingController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.post("/create-booking", createBooking);
router.get("/check-bookings", jwtCheck, jwtParse, getTodayBookingsForMyRestaurant);

export default router;
