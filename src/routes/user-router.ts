import { Router } from "express";
import userController from "../controllers/user-controller";

const router = Router();

// GET
router.get("/", userController.get_users);
router.get("/:userId", userController.get_user_by_id);

// POST
router.post("/", userController.add_user);

export default router;
