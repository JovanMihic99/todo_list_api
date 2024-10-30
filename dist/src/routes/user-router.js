"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const router = (0, express_1.Router)();
// GET
router.get("/", user_controller_1.default.get_users);
router.get("/:userId", user_controller_1.default.get_user_by_id);
// POST
router.post("/", user_controller_1.default.add_user);
exports.default = router;
