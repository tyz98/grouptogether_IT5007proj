import { Grid } from "@mui/material"
import ProjectCard from "../../components/ProjectCard"
import { projectsGetResponse } from "../../utils/ssrUtils"

export default function ProjectList({ projects }) {
  return (
    <Grid container spacing={3}>
      {
        projects.map(project => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={project._id}>
            <ProjectCard _id={project._id} school={project.school} code={project.code} semester={project.semester} projectName={project.projectName} studentCount={project.studentCount}/>
          </Grid>
        ))
      }
    </Grid>
  )
}

export async function getServerSideProps(context) {
  const responsedata = await projectsGetResponse(context.req)
  if (responsedata && responsedata.success) {
    return {
      props: {
        projects: responsedata.message
      }, // will be passed to the page component as props
    }
  } else {
    return {
      notFound: true,
    }
  }
}
