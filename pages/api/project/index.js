import { getSession } from "next-auth/react"

//TODO
export default async function handler(req, res) {
  const session = await getSession({ req })
  //TODO: create a project databse
  if (session) {
    console.log("req.body=", req.body)
    if (Math.random() >= 0.5) {//mock success
      res.json({//TODO: return the project obj
        success: true,
        project: {_id: 1, ...req.body.project},
      })
    } else {//mock fail
      res.status(400).json({//TODO: if err, return the error reason
        success: false,
        message: "this is an error reason",
      })
    }
  } else {
    res.status(401).json({
      message: "You must be signed in.",
    })
  }
}