import { singleProjectGetResponse } from "../../../../utils/ssrUtils"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await getHandler(req, res)
  } else {
    res.status(400).json({
      success: false,
      message: "Unsupported request method",
    })
  }
}

//get project pid's info: school, code, semester, projectName, teammates....
async function getHandler(req, res) {//get /project/[pid]
  const responsedata = await singleProjectGetResponse(req.params.pid)
  if (responsedata.success) {
    res.json(responsedata)
  } else {
    res.status(responsedata.status).json(responsedata)
  }
}
