import { Router } from "express";
import taskController from "../controllers/task-controller";

const router = Router();

// GET
router.get("/", taskController.get_tasks);
router.get("/user/:userId", taskController.get_tasks_by_user_id);
// POST
router.post("/", taskController.add_task);

export default router;
