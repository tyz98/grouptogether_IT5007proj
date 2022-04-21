import clientPromise from "./mongodb";
import { updateUserCount } from "./projectModel"

const createOrUpdateAnswer = async (answer) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const answers = await db.collection("answers")
  //const filter = { pid: answer.pid, uid: answer.uid };
  const prevanswer = await answers.findOne( { pid: answer.pid, uid: answer.uid })
  console.log("prevanswer=", prevanswer)
  if (prevanswer == null) {
    const result = await answers.insertOne(answer)
    await updateUserCount(answer.pid, 1)
    return result.insertedId
  } else {
    await answers.updateOne({ pid: answer.pid, uid: answer.uid }, { $set: answer })
    return prevanswer._id
  }
}

const getUidsForProject = async (pid) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const answers = await db.collection("answers")
  const uids = (await answers.find({pid: pid}, {projection: {_id: 0, uid: 1}})).toArray()
  return uids
}

export { createOrUpdateAnswer, getUidsForProject }