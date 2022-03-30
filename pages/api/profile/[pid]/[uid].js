import { errMessages } from "../../../../constants"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {//only support get.
  if (req.method === 'GET') {
    await getHandler(req, res)
  } else {
    res.status(400).json({
      success: false,
      message: "Unsupported request method",
    })
  }
}

//get user uid's of project pid - specific profile (TODO: not sure if add basicProfile)
async function getHandler(req, res) {//get /profile/[pid]/[uid]
  const { pid, uid } = req.query
  if (Math.random() > 0.1) {
    res.json({
      success: true,
      message: {
        pid: pid, //project id
        uid: uid, //user id
        projectProfile: [
          { _id: 111, desc:"frontend", options:["vue", "react", "angular", "svelte"], chosenIdx: [0, 1, 3] },
          { _id: 222, desc:"backend", options:["java", "python", "golang", "nodejs"], chosenIdx: [] },
          { _id: 333, desc:"design experience", options:["familiar", "know", "never"], chosenIdx: [1] },
          { _id: 444, 
            desc:"long desc long desc long desc long desc long desc long desc long desc",
            options:["many option1", "many option2", "many option3", "many option4", "many option5", "many option6", "many option7", "many option8", "many option9"],
            chosenIdx: [1,7]
          }
      ]}
    })
  } else if (Math.random() > 0.5) {//no such project 404
    res.status(404).json(
      {
        sucess: false,
        message: errMessages.NOTEXIST
      }
    )
  } else {
    res.status(400).json(//other error reason
      {
        sucess: false,
        message: "this is an error reason"
      }
    )
  }
}