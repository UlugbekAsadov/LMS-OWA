import { api } from "../api.js";

export const getMyStaffsQueryFn = () =>
  api("/companies/get").then((data) => data.data);
