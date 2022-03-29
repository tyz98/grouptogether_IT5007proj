import instance from "../utils/customAxios"

/**
 * Create or Update profile using given data
 *
 * @param {object} project e.g. {}
 */
 export const createBasicProfile = (profile) => {
  return instance.post(`/api/profile`, {profile})
};

/**
 * Get user's basic profile based on the parameter（backend only support id or email）
 *
 * @param {object} profile e.g. {email: "tianyizhang0424"}
 */
 export const getBasicProfile = (profile) => {
  return instance.get(`/api/profile`, {params: profile})
};
