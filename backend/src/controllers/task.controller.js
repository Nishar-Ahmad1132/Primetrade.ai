import Task from "../models/Task.js";

export const updateTask = async (req, res) => {
  try {
    const { title, status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Owner or admin check
    if (
      task.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (typeof title === "string") {
      task.title = title;
    }

    if (status === "pending" || status === "completed") {
      task.status = status; // ✅ explicit assignment
    }

    await task.save();

    res.status(200).json({
      message: "Task updated",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};


export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.id });
  res.json(tasks);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
