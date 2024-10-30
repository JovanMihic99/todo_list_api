"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const swagger_1 = __importDefault(require("./docs/swagger"));
const user_router_1 = __importDefault(require("./src/routes/user-router"));
const task_router_1 = __importDefault(require("./src/routes/task-router"));
const app = (0, express_1.default)();
const port = 3000;
(0, swagger_1.default)(app);
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
app.use("/users", user_router_1.default);
app.use("/tasks", task_router_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(port, () => {
    console.log(`Todo List app listening on port ${port}`);
});
