import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })
  //TODO: read profile from databse
  console.log("session=", session)
  if (session) {
    res.send({//TODO: mock data
      profile: {name: 'zty'},
    })
  } else {
    res.send({
      error: "You must be signed in to view the content on this page.",
    })
  }
}