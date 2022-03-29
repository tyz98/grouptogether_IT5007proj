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
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, LinearProgress, Container } from '@mui/material';

export default function ProfileProject(props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [profile, setProfile] = useState({})

  const skills = [
    {desc:"frontend", options:["vue", "react", "angular", "svelte"]},
    {desc:"backend", options:["java", "python", "golang", "nodejs"]},
    {desc:"design experience", options:["familiar", "know", "never"]}
  ];

  const [skills_state, setStateSkills] = useState({});

  // define a funtion and call it immediately to initialize checkbox object state
  // equal to const [skills_state, setStateSkills] = useState({ vue: false, react: false, ...})
  (function initSkills() {
    for (let skill in skills) {
      for (let option in skill.options){
        setStateSkills({option: false})
      }
    }
  })();

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

  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
        <AccessDenied />
    )
  }

  const handleChange = (event) => {
    setStateSkills({
      ...skills_state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center">
          Project {profile.projectName ? profile.projectName : ""} (ID: {props.pid}) - Specific Profile Form Page
      </Typography>
      <Container maxWidth="sm">
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {skills.map((skill) => (
              <Grid item key={skill.desc} xs={12} md={4}>
              <FormLabel component="legend">{skill.desc}</FormLabel>
              <FormGroup>
                {skill.options.map((option)=> (
                  <FormControlLabel
                  control={
                    <Checkbox checked={skills_state.option} onChange={handleChange} name={option} />
                  }
                  label={option}
                  key={option}
                  />
                ))}
              </FormGroup>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box 
          sx={{
            display: "flex",
            justifyContent: "space-evenly"
          }}
          margin={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const choose_skills = [];
              for (let s in skills_state) {
                choose_skills.push(skills_state[s]);
              }
              if ( choose_skills.filter((v) => v).length < 1) {
                alert('Successfully submit! But it may affect matching result because you you did not choose one.');
              } else {
                alert('Successfully submit!');}
            }}
          >
            Submit
          </Button>
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