import {api} from "../api.js";

export const getHotCategoriesQuery = () => api('/contractType/get/all').then(data => data.data)