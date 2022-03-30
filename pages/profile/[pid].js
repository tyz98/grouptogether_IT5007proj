import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import AccessDenied from "../../components/AccessDenied"
import { Card, CardContent, Button, Typography, Grid, LinearProgress, FormGroup, FormControlLabel, Box, Checkbox } from '@mui/material';
import ReloadPrompt from "../../components/ReloadPrompt"
import { getProjectQuestions, postProjectQuestionAnswers } from "../../actions/project"


export default function ProfileProject(props) {
  const router = useRouter()
  const { pid } = router.query

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [questions, setQuestions] = useState([])
  const [questionsChecked, setQuestionsChecked] = useState({}) //{1: [false, true, true], 2: [false, false, true]} {qid: [options]}
  const [pageError, setPageError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch profile from protected route
  useEffect(() => {
    if (!session) {
      return;
    }

    getProjectQuestions(pid).then(res => { // res is exactly the data in response body
      console.log("getProjectQuestions res=", res)
      setQuestions(res.questions)
      setPageError(false)
    }).catch(err => { // err is {success: false, message: "error reason"}
      if (err && err.message) {
        alert(err.message)
        setPageError(true)
      } else {
        setPageError(true)
      }
    })
  }, [session, pid])



  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
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

  const handleChange = (e, qid, qIdx, oIdx) => {
    const newQuestionsChecked = {...questionsChecked}
    if (!questionsChecked[qid]) {
      newQuestionsChecked[qid] = new Array(questions[qIdx].options.length).fill(false)
      newQuestionsChecked[qid][oIdx] = e.target.checked
    } else {
      newQuestionsChecked[qid][oIdx] = e.target.checked
    }
    newQuestionsChecked[qid][oIdx] = e.target.checked
    setQuestionsChecked(newQuestionsChecked)
  };

  const submitForm = () => {
    setSubmitting(true)
    const answer = {}
    for (let qid in questionsChecked) {
      const chosedIdx = questionsChecked[qid].map((v, i) => [v, i]).filter(x => x[0]).map(x => x[1])
      if (chosedIdx.length >= 1) {
        answer[qid] = chosedIdx
      }
    }
    console.log("postData=", {pid, answer})
    postProjectQuestionAnswers({pid, answer}).then(res => {
      console.log("postProjectQuestionAnswers res=", res)
      setSubmitting(false)
      alert("Successfully submitted!")
    }).catch(err => {
      setSubmitting(false)
      if (err && err.message) {
        alert(err.message)
      } else {
        alert("Submission failed.")
      }
    })
  }

  return (
    <>
    <Grid container spacing={3}>
      {
        questions.map((question, qIdx) => (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={question._id}>
            <Card sx={{ height: 300, overflow: "auto" }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom sx={{ whiteSpace: "nowrap", }}>
                    {question.desc}
                  </Typography>
                  <FormGroup>
                  {question.options.map((option, oIdx)=> (
                    <FormControlLabel 
                      checked={questionsChecked[question._id] && questionsChecked[question._id][oIdx]} 
                      onChange={(e) => { handleChange(e, question._id, qIdx, oIdx) }} 
                      key={oIdx} 
                      name={oIdx}
                      label={option}
                      control={<Checkbox  />} 
                    />))}
                  </FormGroup>
                </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>
    {submitting && <LinearProgress />}
        <Box 
          sx={{
            display: "flex",
            justifyContent: "space-evenly"
          }}
          margin={1}>
          <Button
            variant="contained"
            color="primary"
            disabled={submitting}
            onClick={() => {
              let hasUnansweredQuestion = false
              for (let q of questions) {
                if (!questionsChecked[q._id] || questionsChecked[q._id].filter(v => v).length < 1) {
                  hasUnansweredQuestion = true
                  break
                }
              }
              let sureToSubmit = true
              if (hasUnansweredQuestion) {
                sureToSubmit = confirm('You have unanswered questions. Answering all questions can help you to be found by other teammates. Are you sure to submit?');
              }
              if (sureToSubmit) {
                submitForm()
              }
            }}
          >
            Submit
          </Button>
        </Box>
    </>
  )
}

// export async function getServerSideProps(context) {
//   const session= await getSession(context)
//   if (!session) {
//     return {
//       props: {}
//     }
//   }
//   const pid = context.params.pid

//   return {
//     props: {
//       pid,
//     }, // will be passed to the page component as props
//   }
// }