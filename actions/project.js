import instance from "../utils/customAxios"

/**
 * Create project using given data
 *
 * @param {object} project e.g. {}
 */
 export const createProject = (project) => {
  return instance.post(`/api/project`, {project})
};