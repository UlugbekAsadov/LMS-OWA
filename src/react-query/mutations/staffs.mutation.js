import { api } from "../api.js";

export const addStaffToCompanySuperAdminMutationFn = (bootcampId, config) =>
  api(`/companies/${bootcampId}/users/add`, config).then((data) => data);

export const editStaffMutationFn = (staffId, config) =>
  api(`/users/update/staff/${staffId}`, config).then((data) => data);

export const deleteStaffMutation = (staffId) => api(``);
