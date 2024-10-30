import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import userRouter from "./src/routes/user-router";
import taskRouter from "./src/routes/task-router";

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
