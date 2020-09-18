import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Container, InputLabel, TablePagination, TextField, Typography } from '@material-ui/core';
import { NextPageContext } from 'next';
import { getDatabaseConnection } from '../../libs/db';
import { useRouter } from 'next/router'

import { flaten } from '../../libs/utils';

import {Like} from "typeorm";
import { ParsedUrlQuery } from 'querystring';
import { Project } from '../../src/entity/Project';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    width: 800,
  },
});


interface Props{
  project: Project[]
}

export default function ProjectTable(props:Props) {
  const classes = useStyles();
  const rows = props.project
  console.log(rows)
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [projectname, setProjectname] = React.useState('')
  const router = useRouter()
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = ()=>{
    const queryjson={name: projectname}
    const query= Object.entries(queryjson).map(entries=>`${entries[0]}=${entries[1]}`).join('&')
    router.push('/person/search?'+query)
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h4" gutterBottom>
          Project List
    </Typography>
    <InputLabel>Search:</InputLabel>
    <TextField label="Project Name Input" value={projectname} onChange={e=>{setProjectname(e.target.value)}}></TextField>
    {/* <TextField label="first name input" value={last_name} onChange={e=>{setLastname(e.target.value)}}></TextField> */}
    <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="right">Expertise Requirement</TableCell>
            <TableCell align="right">Organization</TableCell>
            <TableCell align="right">COVID 19</TableCell>
            <TableCell align="right">createby email</TableCell>
            <TableCell align="right">Contact with</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                  {row.name}
              </TableCell>
              <TableCell align="right">
              {row.expertise?row.expertise.toString():""}
              </TableCell>
              <TableCell align="right">{row.organization?row.organization.name:""}</TableCell>
              <TableCell align="right">{row.COVID_19?"Yes": "No"}</TableCell>
              <TableCell align="right">{row.createby.email}</TableCell>
              <TableCell align="right">{`${row.contact.first_name} ${row.contact.last_name} ${row.contact.email}`}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Container>
  );
}


function getdbquery(query: ParsedUrlQuery){
  const re:NodeJS.Dict<any>={}
  for(let i in query){
    if(i =="first_name" || i == "last_name"){
      re[i]=Like(`%${String(query[i])}%`)
    }
  }
  return re
}

export const getServerSideProps = async (ctx: NextPageContext) => {
    const dbquery= getdbquery(ctx.query)
    console.log(dbquery)
    const db = await getDatabaseConnection()
    const prep = db.getRepository<Project>('project')
    const result = await prep.find({relations: ['createby','organization','contact']})
    console.log(result)
    console.log("================finished=")
    return {'props': {'project' : result.map(r=>flaten(r))}}
    
}