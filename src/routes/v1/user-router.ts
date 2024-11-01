import { Router } from "express";
import userController from "../../controllers/user-controller";
import taskController from "../../controllers/task-controller";
import authController from "../../controllers/auth-controller";
import auth from "../../middleware/auth";

const router = Router();

// GET
router.get("/", userController.get_users);
router.get("/:id", userController.get_user_by_id);

// POST
router.post("/", userController.add_user);

router.post("/signup", authController.signup);
router.post("/login", authController.login);

// DELETE
router.delete("/:userId", userController.delete_user);

export default router;
