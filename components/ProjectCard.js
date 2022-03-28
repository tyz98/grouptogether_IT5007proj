import { Card, CardActions, CardContent, Button, Typography, Grid } from '@mui/material';
import Link from 'next/link'

export default function ProjectCard({_id, school, code, semester, projectName, studentCount}) {
  return (
    <Card sx={{ height: 200 }}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {school}
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, float: "right" }} color="text.secondary" gutterBottom>
              {semester}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" component="div" gutterBottom>
          {code}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {projectName}
        </Typography>
        <Typography variant="body2">
          {studentCount} students are looking for teammates...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link href={`/project/${_id}`}>Check Possible Teammates</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
