import { Card, CardActions, CardContent, Button, Typography, Grid } from '@mui/material';
import Link from 'next/link'

export default function TeammateCard({pid, uid, school, name, gender, nationality, email, phone}) {
  return (
    <Card sx={{ height: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {school}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2">
          {nationality}
        </Typography>
        <Typography variant="body2">
          {email}
        </Typography>
        <Typography variant="body2">
          {phone}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link href={`/project/${pid}/${uid}`}>See Profile Details</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
