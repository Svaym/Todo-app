import { useState } from "react";

export default function Todo() {
  //  Табы
  const [activeTab, setActiveTab] = useState("all");
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  function handleEnter(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }
  //  Клик по задаче, появление подчёркивания
  function changeTask(id) {
    setTodos(
      todos.map((item, index) => {
        if (index === id) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }
        return item;
      })
    );
  }

  function removeTask(id) {
    setTodos(todos.filter((_, index) => index !== id));
  }

  function addTask() {
    setTodos([...todos, { task: task, isCompleted: false }]);
    setTask("");
  }
  //  Фильтрация задач
  const filterTodos = todos.filter((item) => {
    if (activeTab === "completed") {
      return item.isCompleted;
    } else if (activeTab === "active") {
      return !item.isCompleted;
    } else {
      return true;
    }
  });

  return (
    <>
      <div className="container">
        <div className="bg-gray-200 p-3 rounded-lg">
          <h1 className="text-3xl uppercase text-center">Todo</h1>
          <div className="flex items-center gap-x-2">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="Add a new task"
              className="text-black pl-3 py-2 rounded-lg"
            />
            <button
              className="p-3 bg-green-300 rounded-lg text-sm transition-colors duration-300 ease-out hover:bg-green-400"
              onClick={addTask}
              disabled={!task.length > 0}
            >
              Add
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              className={`py-2 px-4 rounded-lg ${
                activeTab === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Tasks
            </button>
            <button
              className={`py-2 px-4 rounded-lg ${
                activeTab === "completed"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed Tasks
            </button>
            <button
              className={`py-2 px-4 rounded-lg ${
                activeTab === "active"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active Tasks
            </button>
          </div>
          <div className="flex flex-col gap-y-1 h-48 overflow-y-auto">
            {filterTodos.map((item, id) => (
              <div
                key={id}
                className="flex items-center justify-between bg-gray-100 py-1 px-2 mt-1"
              >
                <h2
                  className={`cursor-pointer transition duration-200 ease-linear text-gray-700 hover:brightness-200 ${
                    item.isCompleted ? "underline text-green-400" : ""
                  }`}
                  onClick={() => changeTask(id)}
                >
                  {item.task}
                </h2>
                <button
                  onClick={() => removeTask(id)}
                  className="p-1 text-sm bg-red-300 rounded-lg transition-colors duration-300 ease-out hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
