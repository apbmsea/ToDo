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

  const handleStartChange = (value: string) => {
    if (!endDate || value <= endDate) {
      dispatch(setStartDate(value));
    }
  };

  const handleEndChange = (value: string) => {
    if (!startDate || value >= startDate) {
      dispatch(setEndDate(value));
    }
  };

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
        max={endDate ?? ""}
        onChange={(e) => handleStartChange(e.target.value)}
      />
      <span className={style["filters__dash"]}> - </span>
      <input
        className={style["filters__date-input"]}
        type="datetime-local"
        value={endDate ?? ""}
        min={startDate ?? ""}
        onChange={(e) => handleEndChange(e.target.value)}
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
