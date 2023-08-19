import { api } from "../api.js";

export const addStaffToCompanySuperAdminMutationFn = (bootcampId, config) =>
  api(`/companies/${bootcampId}/users/add`, config).then((data) => data);
