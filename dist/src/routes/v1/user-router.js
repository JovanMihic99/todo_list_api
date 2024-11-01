"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user-controller"));
const auth_controller_1 = __importDefault(require("../../controllers/auth-controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
// GET
router.get("/", user_controller_1.default.get_users);
router.get("/:id", user_controller_1.default.get_user_by_id);
// POST
router.post("/signup", auth_controller_1.default.signup);
router.post("/login", auth_controller_1.default.login);
// DELETE
router.delete("/", auth_1.default.authenticate, user_controller_1.default.delete_user);
exports.default = router;
//# sourceMappingURL=user-router.js.map