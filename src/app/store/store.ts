import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../../entities/Tasks";
import { taskFormReducer } from "../../features/TaskForm";
import { filtersReducer } from "../../features/Filters";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    taskForm: taskFormReducer,
    filters: filtersReducer,
  },
});
