import Head from 'next/head'
import { Container, Card, CardContent, TextField, Grid, Button } from '@material-ui/core';
import { useFormik } from "formik"
import * as Yup from "yup"
import { useEffect } from 'react';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required()
    .test("same", " Wrong Email", data => {
      if (data !== 'test@unsircle.com') {
        return false
      }
      return true
    }),
  password: Yup.string()
    .min(2)
    .max(50)
    .required()
    .test("same", " Wrong Password", data => {
      if (data !== 'test@unsircle.com') {
        return false
      }
      return true
    }),
})

const Login = () => {

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: values => {
      localStorage.setItem("email", values.email);
      window.location.href = "/dashboard"
    }
  })

  const showError = field => {
    return <div style={{ color: 'red' }}>{(formik.errors[field] && formik.touched[field] && formik.errors[field]) || " "}</div>
  }

  useEffect(() =>{
    const email = localStorage.getItem("email");
    if(email !== null){
      window.location.href = "/dashboard"
    }
  })

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Card>
          <CardContent>
            <form noValidate autoComplete="off">
              <div style={{ paddingBottom: 10 }}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  variant="outlined"
                />
                {showError('email')}
              </div>
              <div style={{ paddingBottom: 10 }}>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  variant="outlined"
                />
                {showError('password')}
              </div>
              <Button variant="contained" color='primary' onClick={formik.handleSubmit}>Login</Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  )
}

export default Login
