import { api } from "../api.js";

export const createUsersStaffMutationFn = (config) =>
  api("/users/create", config);
export const createCompaniesStaffMutationFn = (config, userId) =>
  api(`/companies/${userId}/users/add`, config);
