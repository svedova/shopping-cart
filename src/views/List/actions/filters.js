import { FILTER_RESET, FILTER_SET } from "@/redux/types";

export const setFilter = (name, value) => {
  return { type: FILTER_SET, name, value };
};

export const resetFilters = () => {
  return { type: FILTER_RESET };
};
