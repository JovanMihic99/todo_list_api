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
const prisma = new client_1.PrismaClient();
const Task = prisma.task;
// CREATE
const add_task = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const description = req.body.description;
    const userId = parseInt(req.body.userId); // change this to req.params later
    const data = {
        title,
        description,
        userId,
    };
    const task = yield prisma.task.create({ data });
    res
        .status(200)
        .json({ message: `Task succesfully added for user ${userId}`, data });
}));
// READ
const get_tasks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.task.findMany();
    res.json(data);
}));
const get_task = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.task.findMany();
    res.json(data);
}));
const get_tasks_by_user_id = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const data = yield prisma.task.findMany({
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
}));
// UPDATE
// DELETE
exports.default = {
    get_tasks,
    get_task,
    get_tasks_by_user_id,
    add_task,
};
