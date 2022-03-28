import instance from "../utils/customAxios"

/**
 * Create project using given data
 *
 * @param {object} project e.g. {}
 */
 export const createProfile = (profile) => {
  return instance.post(`/api/profile`, {profile})
};
