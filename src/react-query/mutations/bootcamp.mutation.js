import { api } from "../api";

export const addBootcampMutationFn = (config) =>
  api("/companies/create", config).then((data) => data);

export const deleteBootcampMutationFn = (bootcampId) =>
  api(`/companies/delete/${bootcampId}`, { method: "DELETE" });
