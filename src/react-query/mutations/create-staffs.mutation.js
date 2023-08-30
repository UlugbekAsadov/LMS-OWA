import { api } from "../api.js";

export const createUsersStaffMutationFn = (config) =>
  api("/users/create", config);

export const editStaffMutationFn = (config, userId) =>
  api(`/users/update/staff/${userId}`, config);

export const editByCompaniesStaffMutationFn = (config, companyId, userId) =>
  api(`/companies/${companyId}/users/${userId}/edit`, config);

export const deleteUserStaffMutationFn = (userId) =>
  api(`/users/delete/staff/${userId}`, { method: "DELETE" });
export const deleteCompaniesStaffMutationFn = (companiesId, userId) =>
  api(`/companies/${companiesId}/users/${userId}/delete`, { method: "DELETE" });
export const createCompaniesStaffMutationFn = (config, userId) =>
  api(`/companies/${userId}/users/add`, config);
