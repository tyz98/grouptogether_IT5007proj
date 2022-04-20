import clientPromise from "./mongodb";
import  { ObjectId } from "mongodb"

const getAllProjectBasicInfo =  async () => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const projects = await db
    .collection("projects")
    .find({}, {projection:{
      _id: 1,
      school: 1,
      code: 1,
      semester: 1,
      projectName: 1,
      userCount: 1
    }})
    .toArray()
  return projects
};

const createProject = async (project) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const projects = await db.collection("projects")
  const result = await projects.insertOne(project)
  return result.insertedId
}

const getProjectQuestions = async (pid) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const project = await db
    .collection("projects")
    .findOne({_id: new ObjectId(pid)}, {projection:{
      questions: 1
    }})
  return project
}

const updateUserCount =  async (pid, delta) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const prevUserCount = (await db.collection("projects")
  .findOne({_id: pid}, {projection:{userCount: 1}})).userCount
  const project = await db
    .collection("projects")
    .updateOne({_id: pid},  { $set: {userCount: prevUserCount + delta} })
  return prevUserCount + delta
}

export { createProject, getAllProjectBasicInfo, getProjectQuestions, updateUserCount }