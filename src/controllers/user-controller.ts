import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const user = prisma.user;

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
  const userId = parseInt(req.user.id);
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
  res.status(200).json({
    message: `Successfully removed user with id ${userId}`,
    removedUser: req.user,
  });
});

export default {
  get_users,
  get_user_by_id,
  delete_user,
};
