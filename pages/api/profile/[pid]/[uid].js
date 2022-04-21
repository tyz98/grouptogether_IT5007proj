import { errMessages } from "../../../../constants"
import { getSession } from "next-auth/react"
import { getBasicProfileById } from "../../../../model/userModel"
import { getProjectQuestions } from "../../../../model/projectModel"
import { getAnswerByPIdUId } from "../../../../model/answerModel"
import { ObjectId } from "mongodb"
import { BSONTypeError } from "bson"

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
  try {
    const { pid, uid } = req.query
    const basicProfile = await getBasicProfileById(ObjectId(uid))
    const questions = await getProjectQuestions(ObjectId(pid))
    const answer = await getAnswerByPIdUId(ObjectId(pid), ObjectId(uid))
    if (!basicProfile|| !questions || !questions.questions || !answer) {
      res.status(404).json(
        {
          sucess: false,
          message: errMessages.NOTEXIST
        }
      )
      return
    }
    const projectProfile = []
    for (let qid in questions.questions) {
      const question = questions.questions[qid]
      projectProfile.push({qid, ...question, chosenIdx: answer[qid]})
    }
    res.json({
      success: true,
      message: {
        pid: pid, //project id
        uid: uid, //user id
        basicProfile,
        projectProfile
      }
    })
  } catch (e) {
    if (e instanceof BSONTypeError) {
      res.status(404).json(
        {
          sucess: false,
          message: errMessages.NOTEXIST
        }
      )
      return
    }
    console.error("get /profile/[pid]/[uid] error",e)
    res.status(400).json(//server error
      {
        sucess: false,
        message: errMessages.SERVERERROR
      }
    )
  }
}