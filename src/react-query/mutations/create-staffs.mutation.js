import { api } from "../api.js";

export const createUsersStaffMutationFn = (config) =>
  api("/users/create", config);

export const deleteUserStaffMutationFn = (userId) =>
  api(`/users/delete/staff/${userId}`, { method: "DELETE" });

export const deleteCompaniesStaffMutationFn = (companiesId, userId) =>
  api(`/companies/${companiesId}/users/${userId}/delete`, { method: "DELETE" });
export const createCompaniesStaffMutationFn = (config, userId) =>
  api(`/companies/${userId}/users/add`, config);
