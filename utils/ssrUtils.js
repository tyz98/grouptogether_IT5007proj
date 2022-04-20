import { getAllProjectBasicInfo } from "../model/projectModel"
export async function projectsGetResponse() {
  try {
    const projects = await getAllProjectBasicInfo()
    console.log("projects=",projects)
    if (projects != null) {//success, this user have created his/her basic profile
      return {
        success: true,
        message: projects
      }
    } else {//this user haven't created his/her basic profile yet, but still response with 200
      return {
        success: false,
        message: []
      }
    }
  } catch(e) {//server error
    console.error("get /profile error:", e)
    return {//TODO: if err, return the error reason
      success: false,
      status: 500,
      message: "Server error"
    }
  }
}

export async function singleProjectGetResponse(pid) {
  if (Math.random() >= -1) {//mock success
    return {//TODO: return the project detail obj
      success: true,
      message: {
        _id: 1, 
        school: "National University of Singapore",
        code: "IT5007",
        semester: "AY2021/2022 2",
        projectName: "Final Project",
        userCount: 10,
        teammates: [
          {
            _id: 1,
            basicProfile: {
              school: "National University of Singapore",
              name: "Zhang Tianyi",
              gender: "F",
              nationality: "Chinese",
              email: "tianyi.zhang@u.nus.edu",
              phone: "87654321"
            }
          },
          {
            _id: 2,
            basicProfile: {
              school: "National University of Singapore",
              name: "Yan Zehong",
              gender: "M",
              nationality: "Singaporean",
              email: "abc@gmail.com",
              phone: "12345678"
            }
          },
          {
            _id: 3,
            basicProfile: {
              school: "National University of Singapore",
              name: "Zhang Tianyi",
              gender: "F",
              nationality: "Chinese",
              email: "tianyi.zhang@u.nus.edu",
              phone: "87654321"
            }
          },
          {
            _id: 4,
            basicProfile: {
              school: "National University of Singapore",
              name: "Yan Zehong",
              gender: "M",
              nationality: "Singaporean",
              email: "abc@gmail.com",
              phone: "12345678"
            }
          },
          {
            _id: 5,
            basicProfile: {
              school: "National University of Singapore",
              name: "Zhang Tianyi",
              gender: "F",
              nationality: "Chinese",
              email: "tianyi.zhang@u.nus.edu",
              phone: "87654321"
            }
          },
          {
            _id: 6,
            basicProfile: {
              school: "National University of Singapore",
              name: "Yan Zehong",
              gender: "M",
              nationality: "Singaporean",
              email: "abc@gmail.com",
              phone: "12345678"
            }
          }
        ]
      },
    }
  } else if (Math.random() >= -1) {//mock 404 fail
    return {//TODO: if err, return the error reason
      success: false,
      status: 404,
      message: "not found",
    }
  } else {//mock other fail
    return {
      success: false,
      status: 400,
      message: "error reason",
    }
  }
}