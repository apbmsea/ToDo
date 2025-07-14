import React from "react";
import { useDispatch } from "react-redux";
import { openTaskForm } from "../../TaskForm/model/taskFormSlice";
import style from "./Toolbar.module.scss";
import { Filters } from "../../Filters";

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <section className={style["toolbar"]}>
      <Filters />
      <button className={style["toolbar__create-task-button"]} onClick={() => dispatch(openTaskForm())}>Создать задачу</button>
    </section>
  );
};

export default Toolbar;
