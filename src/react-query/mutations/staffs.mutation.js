import { api } from "../api.js";

export const addStaffToCompanySuperAdminMutationFn = (bootcampId, config) =>
  api(`/companies/${bootcampId}/users/add`, config).then((data) => data);

export const editStaffBySuperAdminMutationFn = (companyId, staffId, config) =>
  api(`/companies/${companyId}/users/${staffId}/edit`, config).then(
    (data) => data
  );

export const deleteStaffBySuperAdminMutation = (companyId, staffId) =>
  api(`/companies/${companyId}/users/${staffId}/delete`, {
    method: "DELETE",
  }).then((data) => data);
