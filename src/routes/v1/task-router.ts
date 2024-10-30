import { Router } from "express";
import taskController from "../../controllers/task-controller";

const router = Router();

// GET
router.get("/", taskController.get_tasks);

router.get("/:id", taskController.get_task_by_id);

// POST
router.post("/:id", taskController.update_task_by_id);

// DELETE
router.delete("/:id", taskController.delete_task);

export default router;
