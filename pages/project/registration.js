import { useSession } from "next-auth/react"
import { useState } from "react"
import { Formik, Form, Field } from "formik"
import { TextField } from 'formik-mui';
import { Box, MenuItem, Button, LinearProgress, Container } from '@mui/material';
import { makeStyles } from "@mui/styles"
import AccessDenied from "../../components/AccessDenied"
import { defaultSchool } from '../../constants'
import { createProject } from '../../actions/project'
import { QuestionEditorContainer } from "../../components/QuestionEditor";
import { QuestionContext, Question, Option } from '../../context/QuestionContext'

export default function ProjectRegistration() {
  const useStyles = makeStyles(() => ({
    full: {
      width: "100%",
    }
  }));
  const classes = useStyles();

  const [questions, setQuestions] = useState([])
  const [questionOnsubmitValidateSuccess, setQuestionOnsubmitValidateSuccess] = useState(false)
  
  const questionContextValue = {
    questions: questions, 
    generateEmptyQuestion: () => {
      const newQuestions = [...questions]
      newQuestions.push(new Question(questions.length))
      setQuestions(newQuestions)
    },
    updateQuestion:  (question) => {
      const qidx = question.idx
      const newQuestions = [...questions]
      newQuestions[qidx] = question
      if (question.desc.length == 0) {
        question.error = "Cannot be empty"
      } else {
        question.error = ""
      }
      setQuestions(newQuestions)
    },
    generateEmptyOption:  (qIdx) => {
      const newQuestions = [...questions]
      const question  = newQuestions[qIdx]
      const newOptions = [...question.options]
      newOptions.push(new Option(newOptions.length))
      question.options = newOptions
      //eliminate "You need to specify at least 1 option" error
      if (question.desc.length == 0) {
        question.error = "Cannot be empty"
      } else {
        question.error = ""
      }
      setQuestions(newQuestions)
    },
    updateOption: (qIdx, option) => {
      const newQuestions = [...questions]
      const question  = newQuestions[qIdx]
      const newOptions = [...question.options]
      newOptions[option.idx] = option
      if (option.desc.length == 0) {
        option.error = "Cannot be empty"
      } else {
        option.error = ""
      }
      question.options = newOptions
      setQuestions(newQuestions)
    },
    validateQuestion: (qIdx) => {
      const newQuestions = [...questions]
      const question = newQuestions[qIdx]
      if (question.desc.length == 0) {
        question.error = "Cannot be empty"
      }
      setQuestions(newQuestions)
    },
    validateOption: (qIdx, oIdx) => {
      const newQuestions = [...questions]
      const question  = newQuestions[qIdx]
      const newOptions = [...question.options]
      const option = newOptions[oIdx]
      if (option.desc.length == 0) {
        option.error = "Cannot be empty"
      }
      question.options = newOptions
      setQuestions(newQuestions)
    },
    validateAllOnSubmit: () => {
      let success = true;
      let newQuestions = [...questions];
      const undeletedQuestions = newQuestions.filter(q => !q.deleted)
      if (undeletedQuestions.length == 0) {
        alert("You need to specify at least 1 question to match your teammates")
        return false
      }
      undeletedQuestions.forEach(question => {
        if (question.desc.length == 0) {
          question.error = "Cannot be empty"
          success = false
        } else if (question.options.filter(op => !op.deleted).length == 0) {
          question.error = "You need to specify at least 1 option"
          success = false
        }
        const newOptions = [...question.options]
        newOptions.forEach(option => {
          if (option.deleted) {
            return
          }
          if (option.desc.length == 0) {
            option.error = "Cannot be empty"
            success = false
          }
        })
        question.options = newOptions
      });
      if (success) {
        return true;
      }
      setQuestions(newQuestions)
      return false
    },
  }

  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
        <AccessDenied />
    )
  }

  const currentYear = new Date().getFullYear();
  const semesterRanges = [
    {value: `AY${currentYear-1}/${currentYear} 1`, label: `AY${currentYear-1}/${currentYear} 1`},
    {value: `AY${currentYear-1}/${currentYear} 2`, label: `AY${currentYear-1}/${currentYear} 2`},
    {value: `AY${currentYear}/${currentYear + 1} 1`, label: `AY${currentYear}/${currentYear + 1} 1`},
    {value: `AY${currentYear}/${currentYear + 1} 2`, label: `AY${currentYear}/${currentYear + 1} 2`}
  ];

  return (
    <Container maxWidth="sm" styles={{marginTop: "30px"}}>
      <Formik
        initialValues={{
          school: defaultSchool,
          code: "",
          semester: "",
          projectName: "",
        }}
        validate={(values) => {
          const errors = {};
          values.school = values.school.replace(/(^\s*)|(\s*$)/g, "")
          values.code = values.code.replace(/(^\s*)|(\s*$)/g, "").toUpperCase()
          values.projectName = values.projectName.replace(/(^\s*)|(\s*$)/g, "")
          if (!values.school) {
            errors.school = 'Required';
          }
          if (!values.code) {
            errors.code = 'Required';
          }
          if (!values.projectName) {
            errors.projectName= 'Required';
          }
          if (!values.semester) {
            errors.semester = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          if (!questionOnsubmitValidateSuccess) {
            setSubmitting(false)
            return
          }
          createProject({...values, questions}).then(_ => {
            setSubmitting(false)
            alert("Successfully created!")
            resetForm()
            setQuestions([])
          }).catch(err => {
            setSubmitting(false)
            if (err && err.message) {
              alert(err.message)
            } else {
              alert("Creation failed.")
            }
          })
        }}
      >
        {({ submitForm, resetForm, isSubmitting }) => (
          <Form>
            <Box margin={1}>
              <Field
                component={TextField}
                name="school"
                type="text"
                label="School"
                helperText="You can't change school for now"
                InputProps={{
                  readOnly: true,
                  shrink: true,
                }}
                className={classes.full}
              />
            </Box>
            <Box margin={1}>
              <Field
                component={TextField}
                name="code"
                type="text"
                label="Module Code"
                helperText="Please enter module code"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.full}
              />
            </Box>
            <Box margin={1}>
              <Field
                component={TextField}
                name="semester"
                type="text"
                label="Semester"
                select
                helperText="Please select a semester"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.full}
              >
                {semesterRanges.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </Box>
            <Box margin={1}>
              <Field
                component={TextField}
                name="projectName"
                type="text"
                label="Project Name"
                helperText="Please enter project name"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.full}
              />
            </Box>
            {isSubmitting && <LinearProgress />}
            <Box margin={1}>            
              <QuestionContext.Provider value={questionContextValue}>
                <QuestionEditorContainer />
              </QuestionContext.Provider>
            </Box>
            <Box 
              sx={{
                display: "flex",
                justifyContent: "space-evenly"
              }}
              margin={1}>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={() => {
                  setQuestionOnsubmitValidateSuccess(questionContextValue.validateAllOnSubmit())
                  submitForm()
                }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                onClick={() => { 
                  setQuestions([])
                  resetForm() 
                }}
              >
                Reset
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
