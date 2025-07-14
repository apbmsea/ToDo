import React, { useEffect } from "react";
import { TaskStatus } from "../../../shared/types/tasksStatus.types";
import style from "./TaskForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../shared/types/store.types";
import {
  clearTaskForm,
  closeTaskForm,
  setDescription,
  setEndDate,
  setStartDate,
  setStatus,
  setTitle,
} from "../model/taskFormSlice";
import {
  deleteTask,
  updateTask,
} from "../../../entities/Tasks/model/tasksSlice";
import { formatToLocalTime } from "../../../shared/utils/formatDate";

const TaskForm: React.FC = () => {
  const task = useSelector((state: RootState) => state.taskForm.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTask(task));
  }, [dispatch, task]);

  return (
    <aside className={style["aside"]}>
      <div>
        <button
          onClick={() => {
            dispatch(closeTaskForm());
            dispatch(clearTaskForm());
          }}
          className={style["task-form__close"]}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z"
              fill="#333"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
              fill="#333"
            />
          </svg>
        </button>
      </div>

      <form className={style["task-form"]}>
        <div className={style["task-form__wrapper"]}>
          <label className={style["task-form__label"]}>
            Заголовок:
            <input
              autoFocus
              type="text"
              value={task.title}
              className={style["task-form__input"]}
              onChange={(e) => {
                dispatch(setTitle(e.target.value));
                dispatch(updateTask({ ...task, title: e.target.value }));
              }}
            />
            {!task.title.trim() && (
              <p className={style["task-form__error"]}>Заголовок обязателен</p>
            )}
          </label>

          <label className={style["task-form__label"]}>
            Описание:
            <textarea
              className={style["task-form__textarea"]}
              value={task.description}
              onChange={(e) => {
                dispatch(setDescription(e.target.value));
                dispatch(updateTask({ ...task, description: e.target.value }));
              }}
            />
          </label>

          <label className={style["task-form__label"]}>
            Статус:
            <select
              name="status"
              className={style["task-form__select"]}
              value={task.status}
              onChange={(e) => {
                const newStatus = e.target.value as TaskStatus;
                dispatch(setStatus(newStatus));
                dispatch(updateTask({ ...task, status: newStatus }));
              }}
            >
              <option value={TaskStatus.ToDo}>{TaskStatus.ToDo}</option>
              <option value={TaskStatus.InProgress}>
                {TaskStatus.InProgress}
              </option>
              <option value={TaskStatus.Ready}>{TaskStatus.Ready}</option>
            </select>
          </label>

          <label className={style["task-form__label"]}>
            Дата начала:
            <input
              type="datetime-local"
              className={style["task-form__input"]}
              value={
                task.startDate
                  ? formatToLocalTime(new Date(task.startDate))
                  : ""
              }
              max={
                task.endDate
                  ? formatToLocalTime(new Date(task.endDate))
                  : undefined
              }
              onChange={(e) => {
                dispatch(setStartDate(e.target.value));
                dispatch(updateTask({ ...task, startDate: e.target.value }));
              }}
            />
          </label>

          <label className={style["task-form__label"]}>
            Дата окончания:
            <input
              type="datetime-local"
              className={style["task-form__input"]}
              value={
                task.endDate ? formatToLocalTime(new Date(task.endDate)) : ""
              }
              min={
                task.startDate
                  ? formatToLocalTime(new Date(task.startDate))
                  : undefined
              }
              onChange={(e) => {
                dispatch(setEndDate(e.target.value));
                dispatch(updateTask({ ...task, endDate: e.target.value }));
              }}
            />
          </label>
        </div>

        <div className={style["task-form__buttons"]}>
          <button
            type="button"
            className={style["task-form__save-button"]}
            disabled={!task.title.trim()}
            onClick={() => {
              if (!task.title.trim()) {
                alert("Заголовок задачи не может быть пустым");
                return;
              }

              dispatch(updateTask(task));
              dispatch(clearTaskForm());
              dispatch(closeTaskForm());
            }}
          >
            Сохранить
          </button>
          <button
            type="button"
            className={style["task-form__delete-button"]}
            onClick={() => {
              dispatch(deleteTask({ uuid: task.uuid, status: task.status }));
              dispatch(clearTaskForm());
              dispatch(closeTaskForm());
            }}
          >
            Удалить
          </button>
        </div>
      </form>
    </aside>
  );
};

export default TaskForm;
