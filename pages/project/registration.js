import { useSession } from "next-auth/react"
import AccessDenied from "../../components/AccessDenied"

export default function ProjectRegistration() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (typeof window !== "undefined" && loading) return null

  if (!session) {
    return (
        <AccessDenied />
    )
  }

  //TODO: form
  return (
    <h1>Project Registration Page</h1>
  )
}
