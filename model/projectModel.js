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

export { createProject, getAllProjectBasicInfo }