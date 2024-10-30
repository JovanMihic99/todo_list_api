import { Router } from "express";
import taskController from "../controllers/task-controller";

const router = Router();

// GET
router.get("/", taskController.get_tasks);
router.get("/:id", taskController.get_task_by_id);

// POST

// DELETE
router.delete("/:id", taskController.delete_task);

export default router;
