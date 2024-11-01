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
      req.user = await user.findUnique({
        where: { id: parseInt(decoded["id"]) },
      });

      next();
    } catch (error) {
      res.status(401).json({
        message: "Auth Failed",
      });
      return;
    }
  }
);
const authorize = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (req.user.id !== parseInt(id)) {
      res.status(403).json({
        message: "You are not authorized to view this resource.",
      });
      return;
    }
    next();
  }
);

export default {
  authenticate,
  authorize,
};
