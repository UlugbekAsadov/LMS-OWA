import { api } from "../api";

export const addBootcampMutationFn = (config) =>
  api("/companies/create", config).then((data) => data);
