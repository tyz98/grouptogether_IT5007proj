import { getSession } from "next-auth/react"
import { errMessages } from "../../../constants"
import { getBasicProfileUsingEmail, createBasicProfile, updateBasicProfile } from "../../../model/userModel"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await postHandler(req, res)
  } else if (req.method === 'GET') {
    await getHandler(req, res)
  } else {
    res.status(400).json({
      success: false,
      message: errMessages.UNSUPPORTED_METHOD,
    })
  }
}

async function getHandler(req, res) {//get /profile params: id or email
  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({
      success: false,
      message: errMessages.MUST_SIGN_IN,
    })
    return
  }
  const email = req.query.email
  //get basic profile where email = req.query.email
  try{
    const profile = await getBasicProfileUsingEmail(email)
    if (profile != null) {//success, this user have created his/her basic profile
      console.log(profile)
      res.json({
        success: true,
        message: profile
      })
    } else {//this user haven't created his/her basic profile yet, but still response with 200
      res.json({
        success: false,
        message: errMessages.NOTEXIST
      })
    }
  } catch(e) {//server error
    console.error("get /profile error:", e)
    res.status(500).json({
      success: false,
      message: errMessages.SERVERERROR
    })
  }
}

async function postHandler(req, res) {//post /profile
  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({
      success: false,
      message: errMessages.MUST_SIGN_IN,
    })
    return
  }
  try {
    let profile = req.body.profile
    if (profile._id) {
      profile = await updateBasicProfile(profile)
    } else {
      profile = await createBasicProfile(profile)
    }
    res.json({//success, response the created/updated profile
      success: true,
      message: { profile: profile },
    })
  } catch(e) {//server error
    console.error("post /profile error:", e)
    res.status(500).json({
      success: false,
      message: errMessages.SERVERERROR,
    })
  }
}