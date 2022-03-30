import { errMessages } from "../../../../constants"
import { getSession } from "next-auth/react"

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

  //TODO: create an answer object in db
  if (Math.random() >= 0.1) {//mock success
    res.json({//TODO: return the profile obj
      success: true,
      message: { profile: {_id: 1, userEmail: session.user.email, ...req.body} },
    })
  } else {//mock fail
    res.status(400).json({//TODO: if err, return the error reason
      success: false,
      message: "this is an error reason",
    })
  }
}