import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
// import { authenticateToken } from "../middleware/auth";
const prisma = new PrismaClient();

const Task = prisma.task;
// CREATE
const add_task = asyncHandler(async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = req.user.id;
  const finishBy = req.body.finishBy;
  const data = {
    title,
    description,
    userId,
    finishBy,
  };
  const task = await prisma.task.create({ data });
  res.status(200).json({
    message: `Task succesfully added for user with id: ${userId}`,
    task,
  });
});

// READ
const get_tasks = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const data = await prisma.task.findMany({
    where: { userId },
    skip: skip,
    take: limit,
  });

  // Fetch total count of tasks for the user to calculate total pages
  const totalTasks = await prisma.task.count({ where: { userId } });
  const totalPages = Math.ceil(totalTasks / limit);

  if (!data) {
    res.status(404).json({ message: "No tasks found" });
    return;
  }
  res.status(200).json({
    message: `Successfully fetched ${data.length} tasks`,
    page: page,
    totalPages: totalPages,
    data,
  });
});

const get_task_by_id = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });
  if (data === null) {
    res.status(404).json({ message: `Error: Task ${id} does not exist` });
    return;
  }
  res
    .status(200)
    .json({ message: `Successfully fetched task with id: ${id}`, data });
});

const get_tasks_by_user_id = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id);
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
  res.status(200).json({
    message: `Succesffuly fetched ${data.length} tasks belonging to user with id: ${userId}`,
    data,
  });
});

// UPDATE
const update_task_by_id = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = parseInt(req.user.id);
  const title = req.body.title;
  const description = req.body.description;
  const finishBy = req.body.finishBy;
  const done = req.body.done === "true"; // convert to boolean

  if (finishBy && isNaN(Date.parse(finishBy))) {
    res.status(400).json({
      message: "Invalid date format for finishBy. Please provide a valid date.",
    });
    return;
  }

  const task = await prisma.task.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!task || task.userId !== req.user.id) {
    res.status(400).json({
      message: "Task not found or user not authorized.",
    });
    return;
  }

  const updateTask = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      finishBy,
      done,
    },
  });
  res.status(200).json({
    message: `Succesffuly updated task with id: ${id}`,
    data: updateTask,
  });
});

// DELETE
const delete_task = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const deletedTask = await prisma.task.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    message: `Sucessfully deleted task with id ${id}`,
    deleted_task: deletedTask,
  });
});

export default {
  add_task,
  get_tasks,
  get_task_by_id,
  get_tasks_by_user_id,
  update_task_by_id,
  delete_task,
};
