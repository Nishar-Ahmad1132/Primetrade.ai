import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);
router.post("/", createTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);
router.put("/:id", protect, updateTask);

export default router;
