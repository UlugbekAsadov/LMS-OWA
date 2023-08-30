import { api } from "../api.js";

export const createUserByOwnerMutationFn = (config) =>
  api("/users/create", config);

export const editUserByOwnerMutationFn = (config, userId) =>
  api(`/users/update/staff/${userId}`, config);

export const deleteUserByOwnerMutationFn = (userId) =>
  api(`/users/delete/staff/${userId}`, { method: "DELETE" });

export const updatePasswordByOwnerMutationFn = (userId, config) =>
  api(`/users/change_password/staff/${userId}`, config);

export const editUserByAdminMutationFn = (config, companyId, userId) =>
  api(`/companies/${companyId}/users/${userId}/edit`, config);

export const deleteUserByAdminMutationFn = (companiesId, userId) =>
  api(`/companies/${companiesId}/users/${userId}/delete`, { method: "DELETE" });

export const createUserByAdminMutationFn = (config, companyId) =>
  api(`/companies/${companyId}/users/add`, config);

export const updatePasswordByAdminMutationFn = (companyId, userId, config) =>
  api(`/companies/${companyId}/users/${userId}/change_password`, config);
