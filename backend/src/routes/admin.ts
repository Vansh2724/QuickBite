import express from "express";
import { jwtCheck } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import {
  getAllUsers,
  getAllRestaurants,
  deleteUser,
  deleteRestaurant,
} from "../controllers/adminController";

const router = express.Router();

router.use(jwtCheck, isAdmin);

router.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/users", getAllUsers);
router.get("/restaurants", getAllRestaurants);
router.delete("/user/:id", deleteUser);
router.delete("/restaurant/:id", deleteRestaurant);

export default router;
