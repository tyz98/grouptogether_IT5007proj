import { useSession } from "next-auth/react"
import AccessDenied from "../../../components/AccessDenied"
import { singleProjectGetResponse } from "../../../utils/ssrUtils"
import { getSession } from "next-auth/react"
import { Grid } from '@mui/material';
import TeammateCard from "../../../components/TeammateCard"

export default function ProjectTeammates({pid, project}) {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (typeof window !== "undefined" && loading) return null

  if (!session) {
    return (
        <AccessDenied />
    )
  }
  project = JSON.parse(project)

  return (
    <>
      <Grid container spacing={3}>
        {
          project.teammates.map(t => {
            return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={t._id}>
              <TeammateCard pid={project._id} uid={t._id} school={t.school} name={t.name} gender={t.gender} nationality={t.country} email={t.email} phone={t.phone} />
            </Grid>
          )})
        }
      </Grid>
    </>
  )
}

export async function getServerSideProps(context) {
  const session= await getSession(context)
  if (!session) {
    return {
      props: {}
    }
  }

  const responsedata = await singleProjectGetResponse(context.params.pid)
  if (responsedata && responsedata.success) {
    return {
      props: {
        pid: context.params.pid,
        project: JSON.stringify(responsedata.message)
      }, // will be passed to the page component as props
    }
  } else if (responsedata && responsedata.status === 404) {
    return {
      notFound: true,
    }
  } else {// TODO error page
    return {
      notFound: true,
    }
  }
}