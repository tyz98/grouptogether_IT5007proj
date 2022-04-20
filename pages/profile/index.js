import { useState, useEffect, useRef } from "react"
import { useSession, getSession } from "next-auth/react"
import { Formik, Form, Field } from "formik"
import { TextField } from 'formik-mui';
import { Box, MenuItem, Button, LinearProgress, Container } from '@mui/material';
import { makeStyles } from "@mui/styles"
import AccessDenied from "../../components/AccessDenied"
import ReloadPrompt from "../../components/ReloadPrompt"
import { defaultSchool, countries, errMessages } from '../../constants'
import { getBasicProfile, createOrUpdateBasicProfile} from '../../actions/profile'

export default function ProfileBasic() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [pageError, setPageError] = useState(false)
  const [uid, setUid] = useState()
  const formikRef = useRef()
  const useStyles = makeStyles(() => ({
    full: {
      width: "100%",
    }
  }));
  const classes = useStyles();

  // Fetch profile from protected route
  useEffect(() => {
    if (!session) {
      return
    }
    getBasicProfile({email: session.user.email}).then(res => { // res is exactly the data in response body
      console.log("res=", res)
      console.log("formikRef", formikRef)
      for (let field in res) {
        if (field === "_id") {
          setUid(res[field])
          console.log(res[field])
        } else {
          formikRef.current.setFieldValue(field, res[field])
        }
      }
    }).catch(err => { // err is {success: false, message: "error reason"}
      if (err && err.message == errMessages.NOTEXIST) {
        setPageError(false)
      } else if (err && err.message) {
        alert(err.message)
        setPageError(true)
      } else {
        setPageError(true)
      }
    })
  }, [session])

  // When rendering client side don't display anything until loading is complete
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

  const genderRanges = [
    {value: 'Female', label: 'Female'},
    {value: 'Male', label: 'Male'}
  ]
  // If session exists, display profile
  // TODO: display profile
  return (
    <>
      <Container maxWidth="sm" styles={{marginTop: "30px"}}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            school: defaultSchool,
            email: session.user.email,
            name: "",
            gender: "",
            country: "",
            phone: "",
          }}
          validate = {(values) => {
            const errors = {};
            values.name = values.name.replace(/(^\s*)|(\s*$)/g, "")
            //values.email = values.email.replace(/(^\s*)|(\s*$)/g, "")
            values.phone = values.phone.replace(/(^\s*)|(\s*$)/g, "")
            if (!values.name) {
              errors.name = 'Required';
            } else if (/\d/.test(values.name)) {
              errors.name = 'Name cannot contain numbers';
            }
            if (!values.gender) {
              errors.gender = 'Required';
            }
            if (!values.country) {
              errors.country = 'Required';
            }
            // if (!values.email) {
            //   errors.email= 'Required';
            // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            //   errors.email = 'Invalid email address';
            // }
            if (!values.phone) {
              errors.phone = 'Required';
            } else if (/[a-zA-Z]/i.test(values.phone)) {
              errors.phone = 'Invalid phone number';
            }
            return errors;
          }}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            if (uid) {
              values._id = uid
            }
            createOrUpdateBasicProfile(values).then( res => { // success response：data in response body
              setSubmitting(false)
              if (uid) {
                alert("Successfully updated!")
              } else {
                alert("Successfully created!")
              }
              setUid(res.profileId)
            }).catch(err => { // error response：{success: false, message: error reason}
              setSubmitting(false)
              if (err && err.message) {
                alert(err.message)
              } else {
                if (uid) {
                  alert("Update failed.")
                } else {
                  alert("Creation failed.")
                }
              }
            })
          }}
          render={({ submitForm, resetForm, isSubmitting, touched, errors }) => (
            <Form>
              <Box margin={2}>
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
              <Box margin={2}>
                <Field
                  component={TextField}
                  name="email"
                  type="text"
                  label="Email"
                  helperText="This is your log in email"
                  InputProps={{
                    readOnly: true,
                    shrink: true,
                  }}
                  className={classes.full}
                />
              </Box>
              <Box margin={2}>
                <Field
                  component={TextField}
                  name="name"
                  type="text"
                  label="Name"
                  helperText="Please enter your real name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.full}
                />
              </Box>
              <Box margin={2}>
                <Field
                  component={TextField}
                  name="gender"
                  type="text"
                  label="Gender"
                  select
                  helperText="Please select your gender"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.full}
                >
                  {genderRanges.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </Field>
              </Box>
              <Box margin={2}>
                <Field
                  component={TextField}
                  name="country"
                  type="text"
                  label="Nationality"
                  select
                  helperText="Please select your nationality"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.full}
                >
                  {countries.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    ({option.code}) {option.label} 
                  </MenuItem>
                ))}
                </Field>
              </Box>
              {/* <Box margin={2}>
              <Autocomplete 
                id="country-select"
                sx={{ width: 1 }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr:2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <Field
                    component={TextField}
                    name="country"
                    type="text"
                    label="Country"
                    helperText="Please enter your country"
                    {...params}
                    InputProps={{
                      shrink: true,
                      ...params.InputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              </Box> */}
              <Box margin={2}>
                <Field
                  component={TextField}
                  name="phone"
                  type="text"
                  label="Phone"
                  helperText="Please enter your phone number"
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
                  {uid ? "UPDATE" : "SUBMIT"}
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

    </>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/api/auth/signin?callbackUrl=' + encodeURIComponent(context.resolvedUrl),
//         permanent: false,
//       },
//     }
//   }
//   return {
//     props: {
//       session,
//     },
//   }
// }
