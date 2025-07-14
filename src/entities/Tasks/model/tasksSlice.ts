import { createSlice, type Draft, type PayloadAction } from "@reduxjs/toolkit";
import { type Task } from "../../../shared/types/task.types";
import {
  loadTasks,
  saveTasks,
  type TasksByStatus,
} from "../../../shared/utils/localStorage";
import type { TaskStatus } from "../../../shared/types/tasksStatus.types";

export type TasksState = Record<TaskStatus, Task[]>;

const initialState: TasksState = loadTasks() || {
  ToDo: [],
  InProgress: [],
  Ready: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TasksByStatus>) {
      Object.assign(state, action.payload);
    },
    updateTask(state: Draft<TasksState>, action: PayloadAction<Task>) {
      const task = action.payload;
      const { uuid, status } = task;

      for (const s of Object.keys(state) as TaskStatus[]) {
        const index = state[s].findIndex((t) => t.uuid === uuid);
        if (index !== -1) {
          state[s].splice(index, 1);
          break;
        }
      }

      if (!task.title.trim()) {
        saveTasks(state as TasksState);
        return;
      }

      const updatedTask = {
        ...task,
        startDate: task.startDate || new Date().toISOString(),
      };

      state[status].push(updatedTask);
      saveTasks(state as TasksState);
    },

    deleteTask: (
      state,
      action: PayloadAction<{ uuid: string; status: TaskStatus }>
    ) => {
      const { uuid, status } = action.payload;
      state[status] = state[status].filter((task) => task.uuid !== uuid);
      saveTasks(state as TasksState);
    },
    updateTaskStatus: (
      state: Draft<TasksState>,
      action: PayloadAction<{ taskId: string; newStatus: TaskStatus }>
    ) => {
      const { taskId, newStatus } = action.payload;

      let movedTask: Task | undefined;

   
      for (const status of Object.keys(state) as TaskStatus[]) {
        const index = state[status].findIndex((t) => t.uuid === taskId);
        if (index !== -1) {
          movedTask = state[status][index];
          state[status].splice(index, 1);
          break;
        }
      }

      if (!movedTask) {
        return;
      }

      movedTask.status = newStatus;

      state[newStatus].push(movedTask);

      saveTasks(state as TasksState);
    },
  },
});

export const { setTasks, updateTask, deleteTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
