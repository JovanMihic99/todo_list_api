import { PrismaClient } from "@prisma/client";

import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

dotenv.config();

const login = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const payload = { email, id: user.id };
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

const signup = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const checkUser = await prisma.user.findUnique({ where: { email } });
  if (checkUser) {
    res.status(409).json({
      message: "Email already taken",
    });
    return;
  }
  const hash = await bcrypt.hashSync(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
      return;
    }
  });
  console.log(hash);
  const createdUseer = await prisma.user.create({
    data: {
      email,
      password: hash,
      name,
    },
  });
  res.status(200).json({
    message: `Successfully signed up user ${email}`,
  });
});

export default {
  login,
  signup,
};
