import clientPromise from "./mongodb";
import  { ObjectId } from "mongodb"

const getBasicProfileUsingEmail = async (email) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const profile = await db
    .collection("users")
    .findOne({email: email}, {projection: {
      country: 1,
      email: 1,
      gender: 1,
      name: 1,
      phone: 1,
      school: 1,
    }})
  return profile
};

const createBasicProfile = async (profile) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const users = await db.collection("users")
  const result = await users.insertOne(profile)
  const insertedProfile = await users.findOne({_id: result.insertedId}, {
    projection: {
      country: 1,
      email: 1,
      gender: 1,
      name: 1,
      phone: 1,
      school: 1,
    }})
  //console.log("inserted profile=", insertedProfile)
  return insertedProfile
}

const updateBasicProfile = async (profile) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const users = await db.collection("users")
  profile._id = new ObjectId(profile._id) 
  const filter = { _id: profile._id };
  const updateDoc = {
    $set: profile,
  };
  const result = await users.updateOne(filter, updateDoc)
  //console.log("result=", result)
  const updatedProfile = await users.findOne({_id: profile._id}, {
    projection: {
      country: 1,
      email: 1,
      gender: 1,
      name: 1,
      phone: 1,
      school: 1,
    }})
  //console.log("updated profile=", updatedProfile)
  return updatedProfile
}

export { getBasicProfileUsingEmail, createBasicProfile, updateBasicProfile }