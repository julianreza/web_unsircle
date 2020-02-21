import Head from 'next/head'
import { Container, Card, CardContent, TextField, Grid, Button, Typography } from '@material-ui/core';
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState, useEffect } from 'react';

const Dashboard = () => {

    const [email, setEmail] = useState('')

    const logout = () => {
        localStorage.removeItem("email");
        window.location.href = "/"
    }

    useEffect(() => {
        setEmail(localStorage.getItem("email"))
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
                <Card style={{padding:30}}>
                    <Typography>Selamat Datang {email}</Typography>
                    <Button onClick={logout} variant="contained" color='secondary' style={{alignItems:'center'}}>Logout</Button>
                </Card>
            </Grid>
        </div>
    )
}

export default Dashboard
