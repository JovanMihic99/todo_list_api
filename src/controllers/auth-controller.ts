import { PrismaClient } from "@prisma/client";

import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const prisma = new PrismaClient();

dotenv.config();

const login = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const payload = { email: email };
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      "Server error: Missing ACCESS_TOKEN_SECRET environment variable."
    );
  }
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
});

export default {
  login,
};
