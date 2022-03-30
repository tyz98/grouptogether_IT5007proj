import { errMessages } from "../../../../constants"
import { getSession } from "next-auth/react"

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

//get all questions of project req.params.pid
async function getHandler(req, res) {//get /project/[pid]/question
  const { pid } = req.query
  if (Math.random() > 0.1) {
    res.json({
      success: true,
      message: {
        _id: pid, //project id
        questions: [
          { _id: 111, desc:"frontend", options:["vue", "react", "angular", "svelte"] },
          { _id: 222, desc:"backend", options:["java", "python", "golang", "nodejs"] },
          { _id: 333, desc:"design experience", options:["familiar", "know", "never"] },
          { _id: 444, 
            desc:"long desc long desc long desc long desc long desc long desc long desc",
            options:["many option1", "many option2", "many option3", "many option4", "many option5", "many option6", "many option7", "many option8", "many option9"]
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

//Post session.user.email's all answers to the questions of project answer.pid
async function postHandler(req, res) {//post /project/[pid]/question
  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({
      success: false,
      message: errMessages.MUST_SIGN_IN,
    })
  }

  //TODO: create an answer object in db
  if (Math.random() >= 0.1) {//mock success
    res.json({//TODO: return the answer obj
      success: true,
      message: { answer: {_id: 1, userEmail: session.user.email, ...req.body} },
    })
  } else {//mock fail
    res.status(400).json({//TODO: if err, return the error reason
      success: false,
      message: "this is an error reason",
    })
  }
}