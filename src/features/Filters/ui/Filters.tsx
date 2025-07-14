import React from "react";
import type { RootState } from "../../../shared/types/store.types";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setEndDate,
  setSearch,
  setStartDate,
} from "../model/filtersSlice";
import style from "./Filters.module.scss";

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { search, startDate, endDate } = useSelector(
    (state: RootState) => state.filters
  );

  return (
    <section className={style["filters"]}>
      <input
        className={style["filters__search"]}
        type="text"
        placeholder="Поиск по названию..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <input
        className={style["filters__date-input"]}
        type="datetime-local"
        value={startDate ?? ""}
        onChange={(e) => dispatch(setStartDate(e.target.value))}
      />
      <span className={style["filters__dash"]}> - </span>
      <input
        className={style["filters__date-input"]}
        type="datetime-local"
        value={endDate ?? ""}
        onChange={(e) => dispatch(setEndDate(e.target.value))}
      />

      <button
        className={style["filters__reset-button"]}
        onClick={() => dispatch(resetFilters())}
      >
        Сбросить фильтры
      </button>
    </section>
  );
};

export default Filters;
