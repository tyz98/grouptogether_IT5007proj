import { Card, CardContent, Typography, Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

export default function AnswerList({questions, questionsChecked, handleChange=()=>{}}) {
  return (
    <Grid container spacing={3}>
    {
      questions.map((question, qIdx) => (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={question._id}>
          <Card sx={{ height: 300, overflow: "auto" }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {question.desc}
                </Typography>
                <FormGroup>
                {question.options.map((option, oIdx)=> {
                  return (
                  <FormControlLabel 
                    checked={questionsChecked[question._id] && questionsChecked[question._id][oIdx]}
                    onChange={(e) => { handleChange(e, question._id, qIdx, oIdx) }} 
                    key={oIdx} 
                    name={oIdx}
                    label={option}
                    control={<Checkbox />} 
                  />)})}
                </FormGroup>
              </CardContent>
          </Card>
        </Grid>
      ))
    }
  </Grid>
  )
}
