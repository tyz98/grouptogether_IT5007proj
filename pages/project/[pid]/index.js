import { useSession } from "next-auth/react"
import AccessDenied from "../../../components/AccessDenied"

export default function ProjectTeammates(props) {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (typeof window !== "undefined" && loading) return null

  if (!session) {
    return (
        <AccessDenied />
    )
  }

  //TODO
  return (
    <h1>Project {props.pid} Teammates List Page</h1>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {// will be passed to the page component as props
      pid: context.params.pid
    }, 
  }
}