import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })
  const pid = req.query
  //TODO: read this user's project pid - specific profile from database
  console.log("pid=", session)
  if (session) {
    res.send({//TODO: mock data
      profile: {projectName: 'IT5007'},
    })
  } else {
    res.send({
      error: "You must be signed in to view the content on this page.",
    })
  }
}