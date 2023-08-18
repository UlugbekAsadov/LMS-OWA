import { api } from "../api.js";

export const createCourseMutationFn = (config) =>
  api("/courses/create", config);
export const deleteCourseMutationFn = (courseId) =>
  api(`/courses/delete/${courseId}`, { method: "DELETE" });
export const editCourseMutationFn = (courseId, config) =>
  api(`/courses/update/${courseId}`, config);
