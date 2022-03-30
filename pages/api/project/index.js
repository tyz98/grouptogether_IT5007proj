import { getSession } from "next-auth/react"
import { projectsGetResponse } from "../../../utils/ssrUtils"

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
    if (Math.random() >= -1) {//mock success
      res.json({//TODO: return the project obj
        success: true,
        message: { project: {_id: 1, ...req.body.project} },
      })
    } else {//mock fail
      res.status(400).json({//TODO: if err, return the error reason
        success: false,
        message: "this is an error reason",
      })
    }
  } else {
    res.status(401).json({
      success: false,
      message: "You must be signed in.",
    })
  }
}