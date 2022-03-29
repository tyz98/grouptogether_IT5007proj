import { useSession } from "next-auth/react"
import AccessDenied from "../../../components/AccessDenied"
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ProjectProfileShow(props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (typeof window !== "undefined" && loading) return null

  if (!session) {
    return (
        <AccessDenied />
    )
  }
  const receivedInfo = {
    basic: {
      school:"National University of Singapore", 
      email:"123@gmail.com",
      name:"Ryan",
      gender:"Male",
      country:"China",
      phone:"80391111",
      image: 'https://source.unsplash.com/random',
      imageLabel: 'Image Text',
    }, 
    specific: [
      {desc:"frontend framewaork", options:["vue", "react"]}, 
      {desc:"backend language", options:["java", "python"]},
      {desc:"design experience", options:["familiar", "know", "never"]},
    ]
  };


  const theme = createTheme();
  const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
  }
  
  //TODO
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <h1>User{props.uid}'s Project{props.pid}-Specific Profile Page</h1>
        <Grid container spacing={4}>
          <Grid item key={receivedInfo.basic.name} xs={6} md={6}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                  component="img"
                  sx={{ width: 150, display: { xs: 'none', sm: 'block' } }}
                  image={receivedInfo.basic.image}
                  alt={receivedInfo.basic.imageLabel}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  {receivedInfo.basic.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {receivedInfo.basic.gender}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {receivedInfo.basic.school}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {receivedInfo.basic.country}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {receivedInfo.basic.phone}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {receivedInfo.basic.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {receivedInfo.specific.map((skill) => (
            <Grid item key={generateKey(skill.desc)} xs={2} md={2}>
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">
                    {skill.desc}
                  </Typography>
                  {skill.options.map((option) => (
                    <Typography key={option} variant="subtitle1" paragraph>
                      {option}
                  </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {// will be passed to the page component as props
      pid: context.params.pid,
      uid: context.params.uid
    }, 
  }
}