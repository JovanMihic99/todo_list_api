"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const task_controller_1 = __importDefault(require("../controllers/task-controller"));
const router = (0, express_1.Router)();
// GET
// get all users
router.get("/", user_controller_1.default.get_users);
router.get("/:id", user_controller_1.default.get_user_by_id);
router.get("/:id/tasks", task_controller_1.default.get_tasks_by_user_id);
// POST
router.post("/", user_controller_1.default.add_user);
router.post("/:id/task", task_controller_1.default.add_task);
// DELETE
router.delete("/:userId", user_controller_1.default.delete_user);
exports.default = router;
