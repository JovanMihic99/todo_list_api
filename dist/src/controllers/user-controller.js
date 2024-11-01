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
const user = prisma.user;
// READ
const get_users = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.user.findMany();
    res.status(200).json(data);
}));
const get_user_by_id = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const data = yield prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    res.status(200).json(data);
}));
// UPDATE
// DELETE
const delete_user = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const transaction = yield prisma.$transaction([deleteTasks, deleteUser]);
    res.status(200).json({
        message: `Successfully removed user with id ${userId}`,
        removedUser: req.user,
    });
}));
exports.default = {
    get_users,
    get_user_by_id,
    delete_user,
};
//# sourceMappingURL=user-controller.js.map