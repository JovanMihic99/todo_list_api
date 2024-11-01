"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = __importDefault(require("../../controllers/task-controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
// GET
router.get("/", auth_1.default.authenticate, task_controller_1.default.get_tasks);
router.get("/:id", task_controller_1.default.get_task_by_id);
// POST
router.post("/", auth_1.default.authenticate, task_controller_1.default.add_task);
router.post("/:id", task_controller_1.default.update_task_by_id);
// DELETE
router.delete("/:id", task_controller_1.default.delete_task);
exports.default = router;
//# sourceMappingURL=task-router.js.map