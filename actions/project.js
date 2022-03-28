import instance from "../utils/customAxios"

/**
 * Create project using given data
 *
 * @param {object} project e.g. 
 * {
 *  school: "National University of Singapore",
 *  code: "IT5007",
 *  semester: "AY2021/2022 2",
 *  projectName: "final project",
 *  questions: [
 *    {desc: "frontend framework", options: ['vue', 'react']},
 *    {desc: "backend language", options: ['java']},
 *  ],
 * }
 */
 export const createProject = (project) => {
  return instance.post(`/api/project`, {project})
};