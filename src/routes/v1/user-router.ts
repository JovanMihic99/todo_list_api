import { Router } from "express";
import userController from "../../controllers/user-controller";
import taskController from "../../controllers/task-controller";

const router = Router();

// GET

router.get("/", userController.get_users);
router.get("/:id", userController.get_user_by_id);
router.get("/:id/tasks", taskController.get_tasks_by_user_id);

// POST
router.post("/", userController.add_user);
router.post("/:id/task", taskController.add_task);

// DELETE
router.delete("/:userId", userController.delete_user);

export default router;
