import { Card, CardActions, CardContent, Button, Typography, Grid } from '@mui/material';
import Link from 'next/link'

export default function ProjectCard({_id, school, code, semester, projectName, studentCount}) {
  return (
    <Card sx={{ height: 240, overflow: "auto" }}>
      <Grid container direction="column" justifyContent="space-between" sx = {{ height: "100%" }}>
        <Grid item> 
          <CardContent>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography sx={{ fontSize: 14, whiteSpace: "nowrap" }} color="text.secondary" gutterBottom>
                  {school}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: 14, whiteSpace: "nowrap" }} color="text.secondary" gutterBottom>
                  {semester}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h5" component="div" gutterBottom sx={{ whiteSpace: "nowrap" }}>
              {code}
            </Typography>
            <Typography variant="h5" component="div" gutterBottom sx={{ whiteSpace: "nowrap" }}>
              {projectName}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
              {studentCount} students are looking for teammates
            </Typography>
          </CardContent>
        </Grid>
        <Grid item>
          <CardActions>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button size="small">
                  <Link href={`/project/${_id}`}>Possible Teammates</Link>
                </Button>
              </Grid>
              <Grid item>
                <Button size="small">
                  <Link href={`/profile/${_id}`}>Register</Link>
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
