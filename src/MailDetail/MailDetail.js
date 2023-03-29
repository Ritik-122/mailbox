import { Box, Container, CssBaseline, Typography } from '@mui/material'
import React from 'react'
import Header from '../Header/Header'


export default function MailDetail() {
  return (
    <>
    <CssBaseline/>
    <Header/>

    <Container component="main"  maxWidth="md" style={{ marginTop:'100px' , backgroundColor:'#B9E9FC' }}>
    
    <Typography variant='h4' gutterBottom align='center'>Mail</Typography>

    <Typography variant='h6'>To:</Typography>
    <Typography variant='h6'>Subject:</Typography>
    <Typography variant='h6'>Message:</Typography>
    
    </Container>
    </>
   
  )
}
