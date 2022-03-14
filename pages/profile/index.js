import { useState, useEffect } from "react"
import { useSession, getSession } from "next-auth/react"
import AccessDenied from "../../components/AccessDenied"

export default function ProfileBasic() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [profile, setProfile] = useState({})

  // Fetch profile from protected route
  useEffect(() => {
    const fetchData = async () => {
      //TODO: fetch basic profile
      console.log("profile useeffect")
      if (!session) {
        return
      }
      const res = await fetch("/api/profile")
      const json = await res.json()
      if (json.profile) {
        setProfile(json.profile)
      }
    }
    fetchData()
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
        <AccessDenied />
    )
  }

  // If session exists, display profile
  // TODO: display profile
  return (
    <>
      <p>Basic Profile Form</p>
      <p>{profile.name ? profile.name : ''}</p>
    </>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/api/auth/signin?callbackUrl=' + encodeURIComponent(context.resolvedUrl),
//         permanent: false,
//       },
//     }
//   }
//   return {
//     props: {
//       session,
//     },
//   }
// }