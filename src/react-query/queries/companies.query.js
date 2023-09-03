import { api } from "../api";

export const getAllCompaniesQueryFn = () =>
  api("/companies/get/all").then((data) => data.data);

export const getMyCompanyUsersQueryFn = (companyId) =>
  api(`/companies/${companyId}/users`).then((data) => data.data);

export const getMyCompanyQueryFn = () =>
  api("/companies/get-info").then((data) => data.data);
