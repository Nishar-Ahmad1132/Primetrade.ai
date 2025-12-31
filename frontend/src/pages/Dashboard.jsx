/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Edit state
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();

  // Decode user from JWT
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await api.post("/tasks", { title, status: "pending" });
      toast.success("Task added");
      setTitle("");
      fetchTasks();
    } catch {
      toast.error("Failed to add task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  // Update task (edit / toggle status)
  const updateTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        title: editTitle || task.title,
        status: task.status,
      });
      toast.success("Task updated");
      setEditingTaskId(null);
      setEditTitle("");
      fetchTasks();
    } catch {
      toast.error("Failed to update task");
    }
  };

  // Toggle status
  const toggleStatus = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        title: task.title,
        status: task.status === "pending" ? "completed" : "pending",
      });
      toast.success("Status updated");
      fetchTasks();
    } catch {
      toast.error("Failed to update status");
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Task Dashboard
            {user?.role === "admin" && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                Admin
              </span>
            )}
          </h1>
          <button
            onClick={logout}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Add Task */}
        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Add New Task
          </h2>

          <div className="flex gap-3">
            <input
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              onClick={addTask}
              className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Your Tasks
          </h2>

          {loading ? (
            <p className="text-sm text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-sm text-gray-500">
              No tasks yet. Add your first task above.
            </p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-2"
                >
                  {/* Left side */}
                  <div className="flex items-center gap-3 flex-1">
                    {editingTaskId === task._id ? (
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <>
                        <span className="text-sm text-gray-700">
                          {task.title}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 ml-4">
                    {editingTaskId === task._id ? (
                      <button
                        onClick={() => updateTask(task)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingTaskId(task._id);
                          setEditTitle(task.title);
                        }}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => toggleStatus(task)}
                      className="text-sm text-green-600 hover:underline"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
