"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const task_controller_1 = __importDefault(require("./src/controllers/task-controller"));
const app = (0, express_1.default)();
const port = 3000;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/tasks", task_controller_1.default.get_tasks);
app.get("/tasks/user/:userId", task_controller_1.default.get_tasks_by_user);
app.post("/task", task_controller_1.default.add_task);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
