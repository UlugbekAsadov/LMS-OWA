import { api } from "../api.js";

export const getAllContractTemplatesQueryFn = () =>
  api("/contract_templates/get/all").then((data) => data.data);

export const getContractTemplateByIdQueryFn = (contractTemplateId) =>
  api(`/contract_templates/get/byId/${contractTemplateId}`).then(
    (data) => data.data
  );
export const getContractWordListsQueryFn = () =>
  api("/contract_templates/values").then((data) => data.data);
