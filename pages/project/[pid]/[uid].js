import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import AccessDenied from "../../../components/AccessDenied"
import ReloadPrompt from "../../../components/ReloadPrompt"
import NotFound from "../../../components/NotFound"
import { getProjectProfile } from "../../../actions/profile"
import { Card, CardContent, Typography, Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import TeammateCard from "../../../components/TeammateCard"
import { errMessages } from "../../../constants"

export default function ProjectProfileShow(props) {
  const router = useRouter()
  const { pid, uid } = router.query
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [questions, setQuestions] = useState([])
  const [basicProfile, setBasicProfile] = useState({})
  const [pageError, setPageError] = useState(false)
  const [pageErrorMessage, setPageErrorMessage] = useState("")

  useEffect(() => {
    if (!session) {
      return;
    }

    getProjectProfile(pid, uid).then(res => { // res is exactly the data in response body
      console.log("getProjectProfile res=", res)
      setBasicProfile(res.basicProfile)
      setQuestions(res.projectProfile)
      setPageError(false)
    }).catch(err => { // err is {success: false, message: "error reason"}
      if (err && err.message) {
        setPageError(true)
        setPageErrorMessage(err.message)
      } else {
        setPageError(true)
        setPageErrorMessage("")
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
    if (pageErrorMessage === errMessages.NOTEXIST) {
      return (
        <NotFound />
      )
    } else {
      return (
        <ReloadPrompt />
      )
    }
  }

  return (
    <>
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} sx={{marginBottom: 3}}>
      <TeammateCard forShow={true} pid={pid} uid={uid} school={basicProfile.school} name={basicProfile.name} gender={basicProfile.gender} nationality={basicProfile.country} email={basicProfile.email} phone={basicProfile.phone}/>
    </Grid>
    <Grid container spacing={3}>
      {
        questions.map((question) => (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={question.qid}>
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
    </Grid>
    </>)
}
