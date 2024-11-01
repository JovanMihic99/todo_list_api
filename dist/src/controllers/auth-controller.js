"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const payload = { email, id: user.id };
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("Server error: Missing ACCESS_TOKEN_SECRET environment variable.");
    }
    const token = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
    res.status(200).json({ token });
}));
const signup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const checkUser = yield prisma.user.findUnique({ where: { email } });
    if (checkUser) {
        res.status(409).json({
            message: "Email already taken",
        });
        return;
    }
    const hash = yield bcrypt_1.default.hashSync(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
            return;
        }
    });
    console.log(hash);
    const createdUseer = yield prisma.user.create({
        data: {
            email,
            password: hash,
            name,
        },
    });
    res.status(200).json({
        message: `Successfully signed up user ${email}`,
    });
}));
exports.default = {
    login,
    signup,
};
//# sourceMappingURL=auth-controller.js.map