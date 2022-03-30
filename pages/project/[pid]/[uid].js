import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import AccessDenied from "../../../components/AccessDenied"
import ReloadPrompt from "../../../components/ReloadPrompt"
import { getProjectProfile } from "../../../actions/profile"
import { Card, CardContent, Typography, Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material';


export default function ProjectProfileShow(props) {
  const router = useRouter()
  const { pid, uid } = router.query
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [questions, setQuestions] = useState([])
  const [pageError, setPageError] = useState(false)

  useEffect(() => {
    if (!session) {
      return;
    }

    getProjectProfile(pid, uid).then(res => { // res is exactly the data in response body
      console.log("getProjectProfile res=", res)
      setQuestions(res.projectProfile)
      setPageError(false)
    }).catch(err => { // err is {success: false, message: "error reason"}
      if (err && err.message) {
        alert(err.message)
        setPageError(true)
      } else {
        setPageError(true)
      }
    })
  }, [session, pid, uid])

  if (typeof window !== "undefined" && loading) return null

  if (!session) {
    return (
        <AccessDenied />
    )
  }

  if (pageError) {
    return (
      <ReloadPrompt />
    )
  }

  return (
    <Grid container spacing={3}>
      {
        questions.map((question) => (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={question._id}>
            <Card sx={{ height: 300, overflow: "auto" }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {question.desc}
                  </Typography>
                  <FormGroup>
                  {question.chosenIdx.map((i)=> (
                    <FormControlLabel 
                      checked={true} 
                      key={i} 
                      name={i}
                      label={question.options[i]}
                      control={<Checkbox  />} 
                    />))}
                  {question.options.map((option, i)=> {
                    if (question.chosenIdx.indexOf(i) !== -1) {
                      return null
                    }
                    return(
                    <FormControlLabel 
                      checked={false} 
                      disabled
                      key={i} 
                      name={i}
                      label={option}
                      control={<Checkbox  />} 
                    />)})}
                  </FormGroup>
                </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>)
}
