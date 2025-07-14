import type { TaskStatus } from "./tasksStatus.types";

export interface Task {
  uuid: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  status: TaskStatus;
}
