import { type Request, type Response, type NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { decode } from "punycode";

const prisma = new PrismaClient();
const user = prisma.user;

const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      const decoded = jwt.verify(
        token as string,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      console.log("decoded", decoded);
      req.user = await user.findUnique({
        where: { id: parseInt(decoded["id"]) },
      });
      console.log(req.user);
      next();
    } catch (error) {
      res.status(401).json({
        message: "Auth Failed",
      });
      return;
    }
  }
);

export default {
  authenticate,
};
