import type { Task } from "../types/task.types";

export interface TasksByStatus {
  ToDo: Task[];
  InProgress: Task[];
  Ready: Task[];
}

export const saveTasks = (tasks: TasksByStatus): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const loadTasks = (): TasksByStatus => {
  const data = localStorage.getItem("tasks");
  if (!data) {
    return {
      ToDo: [],
      InProgress: [],
      Ready: [],
    };
  }

  try {
    return JSON.parse(data) as TasksByStatus;
  } catch {
    return {
      ToDo: [],
      InProgress: [],
      Ready: [],
    };
  }
};
