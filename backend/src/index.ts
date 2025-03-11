import express, { Request, Response } from "express";
import myUserRoute from "./routes/MyUserRoute";

const app = express();
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "Health OK!" });
  });

  app.use("/api/my/user", myUserRoute);


  app.listen(7000, () => {
    console.log("server started on localhost:7000");
  });