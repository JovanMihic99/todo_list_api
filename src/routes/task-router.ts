import { Router } from "express";
import taskController from "../controllers/task-controller";

const router = Router();

// GET
router.get("/", taskController.get_tasks);

// POST
router.post("/", taskController.add_task);

export default router;
