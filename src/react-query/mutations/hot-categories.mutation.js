import { api } from "../api.js";

export const addContactQuery = (config) =>
  api("/contractType/create", config).then((data) => data);

export const deleteContractMutationFn = (contractId) =>
  api(`/contractType/delete/${contractId}`, {
    method: "DELETE",
  });

export const editContractMutationFn = (config, editContractId) =>
  api(`/contractType/update/${editContractId}`, config);
