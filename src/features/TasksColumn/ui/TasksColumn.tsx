import { useSelector } from "react-redux";
import type { RootState } from "../../../shared/types/store.types";
import type { Task } from "../../../shared/types/task.types";
import { TaskCard } from "../../TaskCard";
import style from "./TasksColumn.module.scss";
import type { TaskStatus } from "../../../shared/types/tasksStatus.types";

import { Droppable, Draggable } from "@hello-pangea/dnd";


const TasksColumn: React.FC<{ type: TaskStatus }> = ({ type }) => {
  const tasks = useSelector((state: RootState) => state.tasks[type]);
  const { search, startDate, endDate } = useSelector(
    (state: RootState) => state.filters
  );

  const trimmedSearch = search.trim().toLowerCase();

  const startDateTimestamp = startDate ? new Date(startDate).getTime() : null;

  const endDateTimestamp = endDate ? new Date(endDate).getTime() : null;

  const filteredTasks = tasks.filter((task: Task) => {
    const taskStart = task.startDate
      ? new Date(task.startDate).getTime()
      : null;
    const taskEnd = task.endDate ? new Date(task.endDate).getTime() : null;

    const hasTitle = task.title.trim() !== "";

    const matchesSearch =
      !trimmedSearch || task.title.toLowerCase().includes(trimmedSearch);

    const matchesStartDate =
      !startDateTimestamp ||
      (taskStart !== null && taskStart >= startDateTimestamp);

    const matchesEndDate =
      !endDateTimestamp || taskEnd === null || taskEnd >= endDateTimestamp;

    return hasTitle && matchesSearch && matchesStartDate && matchesEndDate;
  });

  return (
    <section className={style["tasks-column"]}>
      <h2>{type}</h2>

      <Droppable droppableId={type}>
        {(provided, snapshot) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={style["tasks-list"]}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#f0f0f0" : "white",
              minHeight: "100px",
              padding: "8px",
              borderRadius: "4px",
              transition: "background-color 0.2s ease",
            }}
          >
            {filteredTasks.map((task, index) => (
              <Draggable key={task.uuid} draggableId={task.uuid} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: "none",
                      marginBottom: 8,
                      backgroundColor: snapshot.isDragging
                        ? "#e0ffe0"
                        : "white",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <TaskCard task={task} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {filteredTasks.length === 0 && "Ничего не найдено"}
          </ul>
        )}
      </Droppable>
    </section>
  );
};

export default TasksColumn;
