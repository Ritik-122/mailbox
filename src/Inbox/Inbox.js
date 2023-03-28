import { CssBaseline, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Inbox() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  let email_id = localStorage.getItem("Email");
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    async function fetchingMail() {
      email_id = email_id.replace("@", "");
      email_id = email_id.replace(".", "");
     
      try{
      const res = await axios.get(
        `https://mailbox-b9a09-default-rtdb.firebaseio.com/receiver/${email_id}.json`
      );
      if(res.status===200){
      
        setApiData(Object.values(res.data))
       

      }
      }catch(error){
        alert(error.response.data.error.message);
      }
    }
    fetchingMail();
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Typography variant="h4" style={{ marginTop: "10px" }} align='center' gutterBottom>
        Inbox
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: "50px" }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell> 
              <StyledTableCell>From:&nbsp;</StyledTableCell>
              <StyledTableCell>Subject&nbsp;</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((row,index) => (
              <StyledTableRow>
              <StyledTableCell>{index+1}</StyledTableCell>
                <StyledTableCell>{row.from}</StyledTableCell>
                <StyledTableCell >{row.subject}</StyledTableCell>
                <StyledTableCell >{row.message}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
    </>
  );
}
