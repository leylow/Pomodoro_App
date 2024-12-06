const TaskList = ({ tasks, toggleComplete, deleteTask, selectTask, selectedTaskIndex }) => (
  <ul className="space-y-2">
    {tasks.map((task, index) => (
      <li
        key={index}
        onClick={() => selectTask(index)}
        className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
          index === selectedTaskIndex ? "bg-blue-200" : task.completed ? "bg-green-200" : "bg-gray-100"
        } dark:bg-gray-700`}
      >
        <span className={`truncate ${task.completed ? "line-through" : ""}`}>{task.name}</span>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleComplete(index);
            }}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md"
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(index);
            }}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default TaskList;
