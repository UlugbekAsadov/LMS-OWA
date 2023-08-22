import { api } from "../api.js";

export const getEducationalInformationQueryFn = () =>
  api("/companies/get").then((data) => data.data);
