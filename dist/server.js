"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const swagger_1 = __importDefault(require("./docs/swagger"));
const user_router_1 = __importDefault(require("./src/routes/v1/user-router"));
const task_router_1 = __importDefault(require("./src/routes/v1/task-router"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
(0, swagger_1.default)(app);
const v1 = express_1.default.Router();
v1.use("/users", user_router_1.default);
v1.use("/tasks", task_router_1.default);
app.use("/api/v1", v1);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(port, () => {
    console.log(`Todo List app listening on port ${port}`);
});
