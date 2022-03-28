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
import { Button, LinearProgress, Container } from '@mui/material';

export default function ProfileProject(props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [profile, setProfile] = useState([
    {desc:"frontend", options:["vue", "react"]}, 
    {desc:"backend", options:["java", "python"]}
  ]);
  const [frontend_state, setStateFrontend] = useState({
    reactt: false, 
    vuejs: false, 
    angular: false, 
    svelte:false
  });

  const [backend_state, setStateBackend] = useState({
    python: false,
    java: false,
    golang: false,
    nodejs: false,
  });

  const [design_state, setStateDesign] = useState({
    familiar: false,
    know: false,
    never: false,
  });


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

  const handleChangeFrontend = (event) => {
    setStateFrontend({
      ...frontend_state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeBackend = (event) => {
    setStateBackend({
      ...backend_state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeDesign = (event) => {
    setStateDesign({
      ...design_state,
      [event.target.name]: event.target.checked,
    });
  };

  const { reactt, vuejs, angular, svelte } = frontend_state;
  const frontend_error = [reactt, vuejs, angular, svelte].filter((v) => v).length < 1;

  const { python, java, golang, nodejs } = backend_state;
  const backend_error = [python, java, golang, nodejs].filter((v) => v).length < 1;

  const { familiar, know, never } = design_state;
  const design_error = [familiar, know, never].filter((v) => v).length !== 1;

  // If session exists, display profile
  //TODO: display profile
  return (
    <>
      <h1>Project {props.pid} - Specific Profile Form Page</h1>
      <p>{profile.projectName ? profile.projectName : ""}</p>
      <Container maxWidth="md" component="main">
        <Box sx={{ display: 'flex' }}>
          <FormControl
            required
            error={frontend_error}
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Frontend Framework</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={reactt} onChange={handleChangeFrontend} name="reactt" />
                }
                label="React"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={vuejs} onChange={handleChangeFrontend} name="vuejs" />
                }
                label="Vue.js"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={angular} onChange={handleChangeFrontend} name="angular" />
                }
                label="Angular"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={svelte} onChange={handleChangeFrontend} name="svelte" />
                }
                label="Svelte"
              />
            </FormGroup>
            <FormHelperText>Select at least one skill</FormHelperText>
          </FormControl>
          <FormControl
            required
            error={backend_error}
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Backend Language</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={python} onChange={handleChangeBackend} name="python" />
                }
                label="Python"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={java} onChange={handleChangeBackend} name="java" />
                }
                label="Java"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={golang} onChange={handleChangeBackend} name="golang" />
                }
                label="Golang"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={nodejs} onChange={handleChangeBackend} name="nodejs" />
                }
                label="Node.js"
              />
            </FormGroup>
            <FormHelperText>Select at least one skill</FormHelperText>
          </FormControl>
          <FormControl
            required
            error={design_error}
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Design Experience</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={familiar} onChange={handleChangeDesign} name="familiar" />
                }
                label="Familiar"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={know} onChange={handleChangeDesign} name="know" />
                }
                label="Know"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={never} onChange={handleChangeDesign} name="never" />
                }
                label="Never"
              />
            </FormGroup>
            <FormHelperText>Choose only one</FormHelperText>
          </FormControl>
        </Box>
      </Container>
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