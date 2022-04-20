import { errMessages } from "../../../../constants"
import { getSession } from "next-auth/react"
import { getUserIdUsingEmail } from "../../../../model/userModel"
import { createOrUpdateAnswer } from "../../../../model/answerModel"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {//only support post. we don't support user get himself project-specific profile for now
  if (req.method === 'POST') {
    await postHandler(req, res)
  } else {
    res.status(400).json({
      success: false,
      message: "Unsupported request method",
    })
  }
}

//Post session.user.email's project pid - specific profile(answers)
async function postHandler(req, res) {//post /project/[pid]
  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({
      success: false,
      message: errMessages.MUST_SIGN_IN,
    })
  }
  //create an answer object in db
  try {
    const uid = await getUserIdUsingEmail(session.user.email)
    const answer = req.body
    answer.uid = uid
    answer.pid = ObjectId(answer.pid)
    const answerId = await createOrUpdateAnswer(answer)
    res.json({//return the answer id
      success: true,
      message: { answerId },
    })
  } catch (e) {
    console.error("post /profile/pid error:", e)
    res.status(500).json({
      success: false,
      message: errMessages.SERVERERROR
    })
  }
}
