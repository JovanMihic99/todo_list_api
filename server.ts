import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import taskController from "./src/controllers/task-controller";

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/tasks", taskController.get_tasks);
app.get("/tasks/user/:userId", taskController.get_tasks_by_user);
app.post("/task", taskController.add_task);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
