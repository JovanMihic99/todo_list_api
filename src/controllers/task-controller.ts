import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

const Task = prisma.task;
// CREATE
const add_task = asyncHandler(async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = parseInt(req.params.id);
  const data = {
    title,
    description,
    userId,
  };
  const task = await prisma.task.create({ data });
  res.status(200).json({
    message: `Task succesfully added for user with id: ${userId}`,
    task,
  });
});

// READ
const get_tasks = asyncHandler(async (req, res) => {
  const data = await prisma.task.findMany();
  res.status(200).json(data);
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
  const title = req.body.title;
  const description = req.body.description;
  const finishBy = req.body.finishBy;
  const updateTask = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      finishBy,
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
