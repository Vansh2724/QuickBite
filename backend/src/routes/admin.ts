// routes/admin.ts
import express from "express";
import { jwtCheck } from "../middleware/auth"; // still good to verify token
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();

router.get("/dashboard", jwtCheck, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin via email header!" });
});

export default router;
