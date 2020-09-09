import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Dialog, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Axios from 'axios';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface Props{
    title: string,
    personid: string
}
interface IContact{
  job_title:string,
  email:string,
  country:string,
  state: string
}

export default function SimpleModal(props:Props) {
  var rows:IContact[]=[]
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [jobTitle, setJobTitle] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [state, setState] = React.useState("")
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddContact = ()=>{
    setOpen(false);
  }

  useEffect(()=>{
    Axios.get(`/api/contact/${props.personid}`).then(res=>{
      if(res.status===200){
          rows=res.data
      }
    })
  })

  const body = (
    <DialogTitle >{props.title}</DialogTitle>
    <div style={modalStyle} className={classes.paper}>
      <p >
        <label>Job Title:</label>
        <input type="text" value={jobTitle}></input>
      </p>
      <p >
        <label>Email address:</label>
        <input type="text" value={email}></input>
      </p>
      <p >
        <label>country:</label>
        <input type="text" value={country}></input>
      </p>
      <p >
        <label>state:</label>
        <input type="text" value={state}></input>
      </p>
      <button onClick={handleAddContact}>add contact</button>
    </div>
  );

  return (
    <div>

      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
       
        {body}
      </Dialog>


    </div>
  );
}