"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma = new client_1.PrismaClient();
const user = prisma.user;
dotenv_1.default.config();
const login = (0, express_async_handler_1.default)((req, res) => {
    const email = req.body.email;
    const payload = { email: email };
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("Server error: Missing ACCESS_TOKEN_SECRET environment variable.");
    }
    const token = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
    res.status(200).json({ token });
});
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access token is missing or invalid." });
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};
exports.default = {
    login,
};
//# sourceMappingURL=auth-controller.js.map