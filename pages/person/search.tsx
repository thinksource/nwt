import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, TablePagination, Typography } from '@material-ui/core';
import { NextPageContext } from 'next';
import { getDatabaseConnection } from '../../libs/db';

import Link from 'next/link';

import { Person } from '../../src/entity/Person';
import { flaten } from '../../libs/utils';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h4" gutterBottom>
          People List
    </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>FirstName</TableCell>
            <TableCell align="right">SecondName</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">COVID 19</TableCell>
            <TableCell align="right">Linked User email</TableCell>
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
              <TableCell align="right">{row.user.email}</TableCell>  
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

export const getServerSideProps = async (_ctx: NextPageContext) => {
    const db = await getDatabaseConnection()
    const prep = db.getRepository<Person>('person')
    const result = await prep.find({relations: ['user']})
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