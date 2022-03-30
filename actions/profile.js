import instance from "../utils/customAxios"

const profileApiPrefix = '/api/profile'
/**
 * Create or Update profile using given data
 *
 * @param {object} project e.g. {}
 */
 export const createBasicProfile = (profile) => {
  return instance.post(profileApiPrefix, {profile})
};

/**
 * Get user's basic profile based on the parameter（backend only support id or email）
 *
 * @param {object} profile e.g. {email: "tianyizhang0424"}
 */
 export const getBasicProfile = (profile) => {
  return instance.get(profileApiPrefix, {params: profile})
};

/**
 * Post session.user.email's project answer.pid-specific profile(answers)
 *
 * @param {object} project e.g. 
 * {
 *  pid: "1",
 *  222: [0, 3],
 *  333: [1],
 *  444: [4, 7],
 * }
 * 
 */
export const postProjectProfile = (profile) => {
  return instance.post(`${profileApiPrefix}/${profile.pid}`, profile)
}

/**
 * Get user uid's project pid-specific profile(answers)
 *
 * @param {int} pid e.g. 1
 * @param {int} uid e.g. 1
 * 
 */
export const getProjectProfile = (pid, uid) => {
  return instance.get(`${profileApiPrefix}/${pid}/${uid}`)
}