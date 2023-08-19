import { api } from "../api";

export const getMyBootcampsQueryFn = () =>
  api("/companies/get").then((data) => [data.data]);

export const getAllBootcampsQueryFn = () =>
  api("/companies/get/all").then((data) => data.data);

export const getBootcampStaffs = (bootcampId) =>
  api(`/companies/${bootcampId}/users`).then((data) => data.data);
