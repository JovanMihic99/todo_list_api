import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const user = prisma.user;

// CREATE
const add_user = asyncHandler(async (req, res) => {
  const name = req.params.name;
  const email = req.params.email;
  const password = req.params.password; // add hashing later
  const data = {
    name,
    email,
    password,
  };
  const user = await prisma.user.create({
    data,
  });

  res
    .status(200)
    .json({ message: `Succesfully added User with id: ${user.id}`, user });
});
// READ
const get_users = asyncHandler(async (req, res) => {
  const data = await prisma.user.findMany();
  res.status(200).json(data);
});
const get_user_by_id = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).json(data);
});
// UPDATE

// DELETE
const delete_user = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId);
  const deleteTasks = prisma.task.deleteMany({
    where: {
      userId: userId,
    },
  });
  const deleteUser = prisma.user.delete({
    where: {
      id: userId,
    },
  });

  const transaction = await prisma.$transaction([deleteTasks, deleteUser]);
});

export default {
  get_users,
  get_user_by_id,
  add_user,
  delete_user,
};
