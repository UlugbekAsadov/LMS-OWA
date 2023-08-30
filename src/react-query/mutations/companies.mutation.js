import { api } from "../api";

export const addCompanyMutationFn = (config) =>
  api("/companies/create", config).then((data) => data);

export const deleteCompanyMutationFn = (companyId) =>
  api(`/companies/delete/${companyId}`, { method: "DELETE" });

export const editCompanyMutationFn = (companyId, config) =>
  api(`/companies/update/${companyId}`, config);
