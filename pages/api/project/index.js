import { getSession } from "next-auth/react"
import { errMessages } from "../../../constants"
import { projectsGetResponse } from "../../../utils/ssrUtils"
import { createProject } from "../../../model/projectModel"

//TODO
export default async function handler(req, res) {
  if (req.method === 'POST') {
    await postHandler(req, res)
  } else if (req.method === 'GET') {
    await getHandler(req, res)
  } else {
    res.status(400).json({
      success: false,
      message: "Unsupported request method",
    })
  }
}

async function getHandler(req, res) {//get /project
  const responsedata = await projectsGetResponse()
  if (responsedata.success) {
    res.json(responsedata)
  } else {
    res.status(responsedata.status).json(responsedata)
  }
}

async function postHandler(req, res) {//post /project
  const session = await getSession({ req })
  //TODO: create a project databse
  if (session) {
    //console.log(req.body.project.questions['0'].options)
    try {
      let project = req.body.project
      project.userCount = 0
      const projectId = await createProject(project)
      res.json({//success, response the created project
        success: true,
        message: { projectId },
      })
    } catch(e) {//server error
      console.error("post /project error:", e)
      res.status(500).json({
        success: false,
        message: errMessages.SERVERERROR,
      })
    }
  } else {
    res.status(401).json({
      success: false,
      message: "You must be signed in.",
    })
  }
}