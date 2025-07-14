import React from "react";
import { TasksColumn } from "../../../features/TasksColumn";
import { TaskStatus } from "../../../shared/types/tasksStatus.types";
import { Toolbar } from "../../../features/Toolbar";
import AsideBlock from "../../../features/TaskForm/ui/TaskForm";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../shared/types/store.types";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

import style from "./ToDoPage.module.scss";
import { updateTaskStatus } from "../../../entities/Tasks/model/tasksSlice";

const ToDoPage: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.taskForm.isOpen);
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    dispatch(
      updateTaskStatus({
        taskId: draggableId,
        newStatus: destination.droppableId as TaskStatus,
      })
    );
  };

  return (
    <main className={style["todo-page"]}>
      <div style={{ flex: 1 }}>
        <Toolbar />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={style["todo-page__content"]}>
            <TasksColumn type={TaskStatus.ToDo} />
            <TasksColumn type={TaskStatus.InProgress} />
            <TasksColumn type={TaskStatus.Ready} />
          </div>
        </DragDropContext>
      </div>

      {isOpen && <AsideBlock />}
    </main>
  );
};

export default ToDoPage;
