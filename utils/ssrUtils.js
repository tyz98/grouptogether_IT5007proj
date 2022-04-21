import { getAllProjectBasicInfo, getProjectById } from "../model/projectModel"
import { getUserInfosForIds } from "../model/userModel"
import { getUidsForProject } from "../model/answerModel"
import { ObjectId } from "mongodb"
import { errMessages } from "../constants"

export async function projectsGetResponse() {
  try {
    const projects = await getAllProjectBasicInfo()
    if (projects != null) {//success, this user have created his/her basic profile
      return {
        success: true,
        message: projects
      }
    } else {//this user haven't created his/her basic profile yet, but still response with 200
      return {
        success: false,
        message: []
      }
    }
  } catch(e) {//server error
    console.error("get /profile error:", e)
    return {//TODO: if err, return the error reason
      success: false,
      status: 500,
      message: errMessages.SERVERERROR,
    }
  }
}

export async function singleProjectGetResponse(pid) {
  try {
    pid = ObjectId(pid)
    const proj = await getProjectById(pid)
    if (proj == null) {
      return {
        success: false,
        status: 404,
        message: "not found",
      }
    }
    const userids = (await getUidsForProject(pid)).map(u => u.uid)
    const userInfos = await getUserInfosForIds(userids)
    return {// return the project's all registered users
      success: true,
      message: {
        _id: pid,
        teammates: userInfos,
      }
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      status: 500,
      message: errMessages.SERVERERROR,
    }
  }
}