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

const getBasicProfileById = async (uid) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const profile = await db
    .collection("users")
    .findOne({_id: uid}, {projection: {
      country: 1,
      email: 1,
      gender: 1,
      name: 1,
      phone: 1,
      school: 1,
    }})
  return profile
};

const getUserIdUsingEmail = async (email) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const user = await db
    .collection("users")
    .findOne({email: email}, {projection: {
      _id: 1
    }})
  return user._id
}

const createBasicProfile = async (profile) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const users = await db.collection("users")
  const result = await users.insertOne(profile)
  return result.insertedId
  // const insertedProfile = await users.findOne({_id: result.insertedId}, {
  //   projection: {
  //     country: 1,
  //     email: 1,
  //     gender: 1,
  //     name: 1,
  //     phone: 1,
  //     school: 1,
  //   }})
  // //console.log("inserted profile=", insertedProfile)
  // return insertedProfile
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
  return profile._id
  // const updatedProfile = await users.findOne({_id: profile._id}, {
  //   projection: {
  //     country: 1,
  //     email: 1,
  //     gender: 1,
  //     name: 1,
  //     phone: 1,
  //     school: 1,
  //   }})
  // //console.log("updated profile=", updatedProfile)
  // return updatedProfile
}

const getUserInfosForIds = async (uids) => {
  const client = await clientPromise
  const db = client.db("grouptogether")
  const userinfos = await db
    .collection("users")
    .find({_id: { $in: uids}}, {projection:{
      _id: 1,
      country: 1,
      email: 1,
      gender: 1,
      name: 1,
      phone: 1,
      school: 1,
    }})
    .toArray()
  console.log("userinfos", userinfos)
  return userinfos
}

export { 
  getBasicProfileUsingEmail,
  getBasicProfileById,
  createBasicProfile,
  updateBasicProfile, 
  getUserIdUsingEmail, 
  getUserInfosForIds 
}