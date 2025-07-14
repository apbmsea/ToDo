import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openTaskForm, setTask } from "../../TaskForm/model/taskFormSlice";
import { formatDate } from "../../../shared/utils/formatDate";
import style from "./TaskCard.module.scss";
import { type Task } from "../../../shared/types/task.types";
import type { RootState } from "../../../shared/types/store.types";

interface TaskCardProps {
  task: Task;
}

const highlight = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text
    .split(regex)
    .map((part, index) =>
      regex.test(part) ? <mark  key={index}>{part}</mark> : part
    );
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.filters.search);

  return (
    <li
      className={style["task-card"]}
      onClick={() => {
        dispatch(openTaskForm());
        dispatch(setTask(task));
      }}
    >
      <h2>{highlight(task.title, searchQuery)}</h2>
      <div className={style["task-card__content"]}>
        {task.description && (
          <p className={style["task-card__content-description"]}>
            {task.description}
          </p>
        )}
        <div className={style["task-card__info"]}>
          <div>
            {formatDate(task.startDate)} – {formatDate(task.endDate)}
          </div>
          <span
            className={`${style["task-card__info-status"]} ${
              style[`task-card__info-status--${task.status.toLowerCase()}`]
            }`}
          >
            {task.status}
          </span>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
