import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  search: string;
  startDate: string | null;
  endDate: string | null;
}

const initialState: FiltersState = {
  search: "",
  startDate: null,
  endDate: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setSearch, setStartDate, setEndDate, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
