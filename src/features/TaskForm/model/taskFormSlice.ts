import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../../shared/types/task.types";
import type { TaskStatus } from "../../../shared/types/tasksStatus.types";
import { v4 as uuidv4 } from "uuid";

interface TaskFormState {
  isOpen: boolean;
  task: Task;
}

const initialState: TaskFormState = {
  isOpen: false,
  task: {
    uuid: "",
    title: "",
    status: "ToDo",
    description: "",
    startDate: ""
  },
};

const taskFormSlice = createSlice({
  name: "taskForm",
  initialState,
  reducers: {
    openTaskForm: (state) => {
      state.isOpen = true;
      state.task = {
        uuid: uuidv4(),
        title: "Новая задача",
        description: "",
        status: "ToDo",
        startDate: "",
        endDate: undefined,
      };
    },
    closeTaskForm: (state) => {
      state.isOpen = false;
    },
    toggleTaskForm: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearTaskForm: (state) => {
      state.task = initialState.task;
    },
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.task.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.task.description = action.payload;
    },
    setStatus: (state, action: PayloadAction<TaskStatus>) => {
      state.task.status = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.task.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.task.endDate = action.payload;
    },
  },
});

export const {
  openTaskForm,
  closeTaskForm,
  toggleTaskForm,
  setTask,
  setTitle,
  setDescription,
  setStatus,
  setStartDate,
  setEndDate,
  clearTaskForm,
} = taskFormSlice.actions;
export default taskFormSlice.reducer;
