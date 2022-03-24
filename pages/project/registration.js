import { useSession } from "next-auth/react"
import { Formik, Form, Field } from "formik"
import { TextField } from 'formik-mui';
import { Box, MenuItem, Button, LinearProgress, Container } from '@mui/material';
import { makeStyles } from "@mui/styles"
import AccessDenied from "../../components/AccessDenied"
import { defaultSchool } from '../../constants'
import { createProject } from '../../actions/project'

export default function ProjectRegistration() {
  const useStyles = makeStyles(() => ({
    full: {
      width: "100%",
    }
  }));
  const classes = useStyles();

  const { data: session, status } = useSession()
  const loading = status === "loading"
  if (typeof window !== "undefined" && loading) return null

  if (!session) {
    return (
        <AccessDenied />
    )
  }

  const currentYear = new Date().getFullYear()
  const semesterRanges = [
    {value: `AY${currentYear-1}/${currentYear} 1`, label: `AY${currentYear-1}/${currentYear} 1`},
    {value: `AY${currentYear-1}/${currentYear} 2`, label: `AY${currentYear-1}/${currentYear} 2`},
    {value: `AY${currentYear}/${currentYear + 1} 1`, label: `AY${currentYear}/${currentYear + 1} 1`},
    {value: `AY${currentYear}/${currentYear + 1} 2`, label: `AY${currentYear}/${currentYear + 1} 2`}
  ]

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
          createProject(values).then(_ => {
            setSubmitting(false)
            alert("Successfully created!")
            resetForm()
          }).catch(err => {
            setSubmitting(false)
            //TODO
            if (err && err.response  && err.response.data && err.response.data.message) {
              alert(err.response.data.message)
            } else {
              alert("Creation failed.")
            }
          })
        }}
        render={({ submitForm, resetForm, isSubmitting }) => (
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
                onClick={submitForm}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                onClick={() => { resetForm() }}
              >
                Reset
              </Button>
            </Box>
          </Form>
        )}
      >
      </Formik>
    </Container>
  )
}
