"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Définition du type Task
type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editTask, setEditTask] = useState<{ id: number | null; title: string }>({
    id: null,
    title: "",
  });

  // Charger les tâches depuis sessionStorage
  useEffect(() => {
    const savedTasks = JSON.parse(sessionStorage.getItem("tasks") || "[]") as Task[];
    setTasks(savedTasks);
  }, []);

  // Sauvegarder les tâches dans sessionStorage
  const saveTasksToSessionStorage = (tasks: Task[]) => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Ajouter une nouvelle tâche
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const newTasks = [...tasks, { id: Date.now(), title: newTask, completed: false }];
    setTasks(newTasks);
    saveTasksToSessionStorage(newTasks);
    setNewTask("");
  };

  // Supprimer une tâche
  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToSessionStorage(updatedTasks);
  };

  // Basculer l'état d'une tâche
  const handleToggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToSessionStorage(updatedTasks);
  };

  // Préparer la modification d'une tâche
  const handleEditTask = (id: number, title: string) => {
    setEditTask({ id, title });
  };

  // Sauvegarder une tâche modifiée
  const handleSaveEditTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editTask.id ? { ...task, title: editTask.title } : task
    );
    setTasks(updatedTasks);
    saveTasksToSessionStorage(updatedTasks);
    setEditTask({ id: null, title: "" });
  };

  return (
    <main className="flex justify-center items-center bg-transparent-r to-gray-100 from-gray-700 min-h-screen bg-white dark:bg-gray-100">
      <div className="p-12 shadow-xl flex flex-col space-y-6 max-w-3xl w-full bg-black dark:bg-white">
        <h1 className="text-center text-black font-bold text-xl">Todo Next App</h1>
        <header className="flex justify-between w-full items-center">
          <h1 className="text-md font-bold text-white dark:text-gray-700">
            Felix&apos; Jobs
          </h1>
          <ModeToggle />
        </header>
        <ul className="flex flex-col space-y-4">
          {tasks.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`checkbox-${item.id}`}
                  className="text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                  checked={item.completed}
                  onChange={() => handleToggleTask(item.id)}
                />
                <label
                  htmlFor={`checkbox-${item.id}`}
                  className="text-sm font-medium leading-none text-gray-300 dark:text-gray-700"
                >
                  {item.title}
                </label>
                <span
                  onClick={() => handleToggleTask(item.id)}
                  className={`ml-2 px-2 py-1 rounded-full text-xs cursor-pointer ${
                    item.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.completed ? "Completed" : "Pending"}
                </span>
              </div>
              <div className="flex space-x-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      onClick={() => handleEditTask(item.id, item.title)}
                      className="text-sm text-blue-500 hover:text-blue-700"
                      aria-label={`Edit task ${item.title}`}
                    >
                      Edit
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Task</AlertDialogTitle>
                      <input
                        value={editTask.title}
                        onChange={(e) =>
                          setEditTask((prev) => ({ ...prev, title: e.target.value }))
                        }
                        placeholder="Edit Task Title"
                        className="h-9 w-full rounded-md border border-input bg-transparent pl-10 pr-5 py-1 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSaveEditTask}>
                        Save
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <button
                  onClick={() => handleDeleteTask(item.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                  aria-label={`Delete task ${item.title}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-white dark:hover:text-gray-700 rounded-lg transition"
              aria-label="Add a new task"
            >
              <Plus className="w-4 h-4" />
              <span>Create new task</span>
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add a new task</AlertDialogTitle>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new Task"
                className="h-9 w-full rounded-md border border-input bg-transparent pl-10 pr-5 py-1 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddTask}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
};

export default Home;
