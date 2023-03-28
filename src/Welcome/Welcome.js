import React, { useRef} from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from '@material-ui/core/Container';
import axios from "axios";

export default function Welcome() {

  let content;
  const onEditorStateChange = (event) => {
    content = event.getCurrentContent().getPlainText();
  };
  const email=useRef('')
  const subject=useRef('')
  const handleSubmit = async(e) => {
    e.preventDefault();
    const mailData={
      email:email.current.value,
      subject:subject.current.value,
      message:content
    }
    let email_id=email.current.value
    email_id=email_id.replace('@','')
    email_id=email_id.replace('.','')
    try{
    const res=await axios.post(`https://mailbox-b9a09-default-rtdb.firebaseio.com/${email_id}.json`,mailData)
    if(res.status===200){
     console.log('sent successfully')
      email.current.value=''
      subject.current.value=''
     


    }
  }catch(error){
    alert(error.response.data.error.message);
  }

    

  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" style={{marginBottom:'100px'}}>
        
          <Typography variant="h4" align="center">
            {" "}
           MailBox Client
          </Typography>
        
      </AppBar>
      <Container component="main" maxWidth="md">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="To:"
          id="fullWidth"
          type="email"
          style={{ marginBottom: "2px" }}
          inputRef={email}
        />

        <TextField
          fullWidth
          label="Subject:"
          id="fullWidth"
          style={{ marginBottom: "2px" }}
          inputRef={subject}
        />

        <Editor
          placeholder="Type your message here"
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />

        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
      </Container>
    </>
  );
}
