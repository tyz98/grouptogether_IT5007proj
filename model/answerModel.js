import clientPromise from "./mongodb";
import { updateUserCount } from "./projectModel"

const createOrUpdateAnswer = async (answer) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const answers = await db.collection("answers")
  //const filter = { pid: answer.pid, uid: answer.uid };
  const prevanswer = await answers.findOne( { pid: answer.pid, uid: answer.uid })
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

const getAnswerByPIdUId = async (pid, uid) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const answer = await db.collection("answers").findOne({pid, uid}, {projection: {answer: 1}})
  if (answer && answer.answer) {
    return answer.answer
  } else {
    return null
  }
}

export { createOrUpdateAnswer, getUidsForProject, getAnswerByPIdUId }