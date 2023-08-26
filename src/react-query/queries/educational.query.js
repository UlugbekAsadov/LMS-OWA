import { api } from "../api.js";

export const getMyStsffsQueryFn = () =>
  api("/companies/get").then((data) => data.data);
