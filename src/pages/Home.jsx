import Timer from "../components/Timer";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import DarkModeToggle from "../components/DarkModeToggle";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  // Add a new task to the task list
  const addTask = (task) => setTasks([...tasks, task]);

  // Toggle the completed status of a task
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task from the task list
  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
    if (index === currentTaskIndex) setCurrentTaskIndex(null); // Reset current task if deleted
  };

  // Mark the current task as complete
  const markCurrentTaskComplete = () => {
    if (currentTaskIndex !== null) {
      console.log(`Completing task at index: ${currentTaskIndex}`);
      const updatedTasks = tasks.map((task, index) =>
        index === currentTaskIndex ? { ...task, completed: true } : task
      );
      setTasks(updatedTasks);
      setCurrentTaskIndex(null); // Reset selection after completing the task
    } else {
      console.log("No task selected for completion.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-center sm:text-left">
            Pomodoro Timer
          </h1>
          <DarkModeToggle />
        </div>

        {/* Timer Section */}
        <Timer
          setSessionsCompleted={markCurrentTaskComplete} // Link timer with task completion
          currentTaskIndex={currentTaskIndex} // Pass selected task index to Timer
        />

        {/* Task Form */}
        <AddTaskForm addTask={addTask} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />

        {/* Current Task Selector */}
        <div className="mt-4">
          <h2 className="font-bold text-lg">Select a Task:</h2>
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                onClick={() => {
                  console.log(`Selected task at index: ${index}`);
                  setCurrentTaskIndex(index); // Select task when clicked
                }}
                className={`cursor-pointer p-2 rounded-lg ${
                  currentTaskIndex === index
                    ? "bg-blue-300 text-white dark:bg-blue-500" // Highlight in light and dark mode
                    : "bg-gray-100 dark:bg-gray-700" // Default colors for light and dark mode
                }`}
              >
                {task.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
