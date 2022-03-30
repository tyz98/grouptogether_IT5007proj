import { getSession } from "next-auth/react"
import { errMessages } from "../../../constants"


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
  }
  const email = req.query.email
  //TODO get basic profile where email = req.query.email
  if (Math.random() >= 2) {//success, this user have created his/her basic profile
    res.json({
      success: true,
      message: {
        country: "CN",
        email: email,
        gender: "Male",
        name: "Tianyi Zhang",
        phone: "12345678",
        school: "National University of Singapore",
      }
    })
  } else if (Math.random() >= -1) {//this user haven't created his/her basic profile yet, but still response with 200
    res.json({
      success: false,
      message: errMessages.NOTEXIST
    })
  } else {//other error TODO: if err, return the error reason
    res.json({
      success: false,
      message: "this is an error reason"
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
  }

  //TODO: create a basic profile
  if (Math.random() >= -1) {//mock success
    res.json({//TODO: return the project obj
      success: true,
      message: { profile: {_id: 1, ...req.body.profile} },
    })
  } else {//mock fail
    res.status(400).json({//TODO: if err, return the error reason
      success: false,
      message: "this is an error reason",
    })
  }
}