export const TaskStatus = {
  ToDo: 'ToDo',
  InProgress: 'InProgress',
  Ready: 'Ready',
} as const;

export type TaskStatus = keyof typeof TaskStatus;
