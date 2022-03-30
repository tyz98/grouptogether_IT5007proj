import instance from "../utils/customAxios"

const projectApiPrefix = '/api/project'
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
  return instance.post(`${projectApiPrefix}`, {project})
};

/**
 * Get project projectId's questions 
 *
 * @param {object} projectId e.g. 10
 * 
 */
export const getProjectQuestions = (projectId) => {
  return instance.get(`${projectApiPrefix}/${projectId}/question`)
}
