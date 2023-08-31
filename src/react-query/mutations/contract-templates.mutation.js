import { api } from "../api.js";

export const addContactTemplateQueryFn = (config) =>
  api("/contract_templates/create", config).then((data) => data);

export const deleteContractTemplateMutationFn = (contractId) =>
  api(`/contract_templates/delete/${contractId}`, {
    method: "DELETE",
  });
export const editContractTemplateMutationFn = (config, contractTemplateId) =>
  api(`/contract_templates/update/${contractTemplateId}`, config);
