import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import setupSwagger from "./docs/swagger";

import userRouter from "./src/routes/v1/user-router";
import taskRouter from "./src/routes/v1/task-router";
import auth from "./src/middleware/auth";

const app = express();
const port = 3000;
app.use(express.json());
const prisma = new PrismaClient();

setupSwagger(app);

const v1 = express.Router();
v1.use("/users", userRouter);
v1.use("/tasks", auth.authenticate, taskRouter);
app.use("/api/v1", v1);
// KURAC

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error: something went wrong!!" });
});

app.listen(port, () => {
  console.log(`Todo List app listening on port ${port}`);
});
