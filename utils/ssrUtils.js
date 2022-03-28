export async function projectsGetResponse(req) {
  if (Math.random() >= 0.1) {//mock success
    return {//TODO: return the projects array
      success: true,
      message: [
        {_id: 1, school: "National University of Singapore", code: "IT5007", semester: "AY2021/2022 2", projectName: "Final Project",  studentCount: 10}, 
        {_id: 2, school: "National University of Singapore", code: "CS2100", semester: "AY2021/2022 1", projectName: "Data Analysis Project",  studentCount: 3},
        {_id: 3, school: "National University of Singapore", code: "IT5007", semester: "AY2021/2022 2", projectName: "Final Project",  studentCount: 10}, 
        {_id: 4, school: "National University of Singapore", code: "CS2100", semester: "AY2021/2022 1", projectName: "Data Analysis Project",  studentCount: 3},
        {_id: 5, school: "National University of Singapore", code: "IT5007", semester: "AY2021/2022 2", projectName: "Final Project",  studentCount: 10}, 
        {_id: 6, school: "National University of Singapore", code: "CS2100", semester: "AY2021/2022 1", projectName: "Data Analysis Project",  studentCount: 3},
        {_id: 7, school: "National University of Singapore", code: "IT5007", semester: "AY2021/2022 2", projectName: "Final Project",  studentCount: 10}, 
        {_id: 8, school: "National University of Singapore", code: "CS2100", semester: "AY2021/2022 1", projectName: "Data Analysis Project",  studentCount: 3},  
      ],
    }
  } else {//mock fail
    return {//TODO: if err, return the error reason
      success: false,
      message: "Please retry.",
    }
  }
}