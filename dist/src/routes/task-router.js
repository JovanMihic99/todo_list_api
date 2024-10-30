"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = __importDefault(require("../controllers/task-controller"));
const router = (0, express_1.Router)();
// GET
router.get("/", task_controller_1.default.get_tasks);
// POST
router.post("/", task_controller_1.default.add_task);
exports.default = router;
