import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import setupSwagger from "./docs/swagger";

import userRouter from "./src/routes/v1/user-router";
import taskRouter from "./src/routes/v1/task-router";

const app = express();
const port = 3000;
app.use(express.json());
const prisma = new PrismaClient();

setupSwagger(app);

const v1 = express.Router();
v1.use("/users", userRouter);
v1.use("/tasks", taskRouter);
app.use("/api/v1", v1);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Todo List app listening on port ${port}`);
});
