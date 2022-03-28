import { useState, useEffect } from "react"
import { getSession, useSession } from "next-auth/react"
import AccessDenied from "../../components/AccessDenied"
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function ProfileProject(props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [profile, setProfile] = useState({});

  // Fetch profile from protected route
  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchData = async () => {
      const res = await fetch(`/api/profile/${props.pid}`)
      const json = await res.json()
      if (json.profile) {
        setProfile(json.profile)
      }
    }
    fetchData()
  }, [session, props.pid])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
        <AccessDenied />
    )
  }

  // If session exists, display profile
  //TODO: display profile
  return (
    <>
      <h1>Project {props.pid} - Specific Profile Form Page</h1>
      <p>{profile.projectName ? profile.projectName : ""}</p>
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
  const pid = context.params.pid
  
  return {
    props: {
      pid,
    }, // will be passed to the page component as props
  }
}