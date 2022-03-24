import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_API_URL

/**
 * Create project using given data
 *
 * @param {object} project e.g. {}
 */
 export const createProject = (project) => {
  return axios.post(`/api/project`, {project})
};