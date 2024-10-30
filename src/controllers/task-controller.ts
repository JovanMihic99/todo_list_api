import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

const Task = prisma.task;

const get_tasks = asyncHandler(async (req, res) => {
  const data = await prisma.task.findMany();
  res.json(data);
});

const get_task = asyncHandler(async (req, res) => {
  const data = await prisma.task.findMany();
  res.json(data);
});

const get_tasks_by_user = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId);
  console.log(userId);
  const data = await prisma.task.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
    orderBy: {
      done: "asc",
    },
  });
  res.json(data);
});

const add_task = asyncHandler(async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = parseInt(req.body.userId); // change this to req.params later
  const data = {
    title,
    description,
    userId,
  };
  const task = await prisma.task.create({ data });
  res
    .status(200)
    .json({ message: `Task succesfully added for user ${userId}`, data });
});

export default {
  get_tasks,
  get_task,
  get_tasks_by_user,
  add_task,
};
