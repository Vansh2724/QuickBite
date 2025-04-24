// middleware/isAdmin.ts
import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const ADMIN_EMAILS = ["vanshved2022@gmail.com"];
  const userEmail = req.headers["x-user-email"] as string;

  if (!userEmail) {
    return res.status(401).json({ message: "Unauthorized: No email provided" });
  }

  if (!ADMIN_EMAILS.includes(userEmail)) {
    return res.status(403).json({ message: "Forbidden: Not an admin" });
  }

  next();
};
