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
import Link from 'next/link';

import { Person } from '../../src/entity/Person';
import { flaten } from '../../libs/utils';

import {Like} from "typeorm";
import { ParsedUrlQuery } from 'querystring';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    width: 800,
  },
});


interface Props{
  person: Person[]
}

export default function ProjectTable(props:Props) {
  const classes = useStyles();
  const rows = props.person
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [first_name, setFirstname] = React.useState('')
  const [last_name, setLastname] = React.useState('')
  const router = useRouter()
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = ()=>{
    const queryjson={first_name, last_name}
    const query= Object.entries(queryjson).map(entries=>`${entries[0]}=${entries[1]}`).join('&')
    router.push('/person/search?'+query)
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h4" gutterBottom>
          People List
    </Typography>
    <InputLabel>Search:</InputLabel>
    <TextField label="first name input" value={first_name} onChange={e=>{setFirstname(e.target.value)}}></TextField>
    <TextField label="first name input" value={last_name} onChange={e=>{setLastname(e.target.value)}}></TextField>
    <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">FirstNameS</TableCell>
            <TableCell align="right">SecondName</TableCell>
            <TableCell align="right">COVID 19</TableCell>
            <TableCell align="right">Expertise</TableCell>
            <TableCell align="right">Linked User email</TableCell>
            <TableCell align="right">Organization</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                  {row.title}
              </TableCell>
              <TableCell align="right">
                <Link href={`/person/${row.id}`}>
                  <a>{row.first_name}</a></Link></TableCell>
              <TableCell align="right">{row.last_name}</TableCell>
              <TableCell align="right">{row.COVID_19?"Yes": "No"}</TableCell>
              <TableCell align="right">{row.expertise?row.expertise:""}</TableCell>
              <TableCell align="right">{row.user.email}</TableCell>
              <TableCell align="right">{row.belong_organization.name}</TableCell> 
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
    const prep = db.getRepository<Person>('person')
    const result = await prep.find({relations: ['user','belong_organization']})
    //     const fetchbuild = fetcher('post')
    // const result = await fetchbuild('/api/person/list')
    // const build = prep.createQueryBuilder().innerJoin("user", "User", "User.id = Project.createbyId").where("User.id = :userId", {userId})
    // const build = db.createQueryBuilder().select('project').from(Project, 'project').innerJoinAndSelect("user", "User", "User.id = Project.createbyId").where("User.id = :userId", {userId}).addSelect('User.email')
    // console.log(build.getSql())
    // const result = await build.getMany()
    console.log(result)
    console.log("================finished=")
    for(let r of result){
      console.log(flaten(r))
    }
    return {'props': {'person' : result.map(r=>flaten(r))}}
    
}