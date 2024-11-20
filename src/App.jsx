import React, { useState } from "react";

// Mock Task Data
const mockTaskData = [
  { id: 1, title: "Learn React", description: "Complete React tutorial", status: "Pending", dueDate: "2024-11-30" },
  { id: 2, title: "Do Laundry", description: "Wash and fold clothes", status: "Completed", dueDate: "2024-11-21" },
  { id: 3, title: "Buy Groceries", description: "Milk, Eggs, Bread", status: "Pending", dueDate: "2024-11-22" },
];

function App() {
  const [tasks, setTasks] = useState(mockTaskData);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "Pending", dueDate: "" });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState({ title: "", description: "", status: "Pending", dueDate: "" });

  // Add a new task
  const handleAddTask = () => {
    if (newTask.title && newTask.description && newTask.dueDate) {
      const newTaskEntry = { ...newTask, id: tasks.length + 1 };
      setTasks([...tasks, newTaskEntry]);
      setNewTask({ title: "", description: "", status: "Pending", dueDate: "" });
    }
  };

  // Edit a task
  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditTaskId(id);
    setEditTask(taskToEdit);
  };

  // Save the edited task
  const handleSaveEdit = () => {
    setTasks(
      tasks.map((task) => (task.id === editTaskId ? { ...task, ...editTask } : task))
    );
    setEditTaskId(null);
    setEditTask({ title: "", description: "", status: "Pending", dueDate: "" });
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700">Task Manager App</h1>

        {/* Add New Task Form */}
        <div className="p-6 bg-gray-50 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Task</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              className="w-full p-4 border border-gray-300 rounded-md"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Task Description"
              className="w-full p-4 border border-gray-300 rounded-md"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-4 border border-gray-300 rounded-md"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <button
              className="w-full py-3 bg-indigo-600 text-white rounded-md"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-6 bg-gray-50 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {task.dueDate}</p>
              <p>Status: {task.status}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md"
                  onClick={() => handleEditTask(task.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Task Form */}
        {editTaskId && (
          <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Task</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                className="w-full p-4 border border-gray-300 rounded-md"
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              />
              <textarea
                placeholder="Task Description"
                className="w-full p-4 border border-gray-300 rounded-md"
                value={editTask.description}
                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
              />
              <input
                type="date"
                className="w-full p-4 border border-gray-300 rounded-md"
                value={editTask.dueDate}
                onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
              />
              <select
                className="w-full p-4 border border-gray-300 rounded-md"
                value={editTask.status}
                onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
              >
                <option>Pending</option>
                <option>Completed</option>
              </select>
              <div className="flex space-x-4">
                <button
                  className="w-full py-3 bg-indigo-600 text-white rounded-md"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </button>
                <button
                  className="w-full py-3 bg-gray-500 text-white rounded-md"
                  onClick={() => setEditTaskId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
