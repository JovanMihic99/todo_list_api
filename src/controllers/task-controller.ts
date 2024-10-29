import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

const Task = prisma.task;

const task_list = asyncHandler(async (req, res) => {
  const data = await prisma.task.findMany();
  res.json(data);
});

export default {
  task_list,

  // other methods
};
