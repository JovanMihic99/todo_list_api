import { type Request, type Response, type NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const user = prisma.user;

const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Access token is missing or invalid." });
      return;
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      async (err, userData) => {
        if (err) {
          res.status(403).json({ message: "Invalid token" });
          return;
        }
        if (userData)
          req.user = await prisma.user.findUnique({
            where: {
              email: userData["email"] as string,
            },
          });
        console.log(req.user);
        next();
      }
    );
  }
);

export default {
  authenticate,
};
