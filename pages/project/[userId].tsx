import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination, Typography } from '@material-ui/core';
import { NextPageContext } from 'next';
import { getDatabaseConnection } from '../../libs/db';
import { Project } from '../../src/entity/Project';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('text', 690, 16.0, 49, 3.9)
// ];

interface Props{
  projects: Project[]
}

export default function ProjectTable(props:Props) {
  const classes = useStyles();
  const rows = props.projects
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
      <>
      <Typography variant="h4" component="h4" gutterBottom>
          Project List
    </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="right">creatby</TableCell>
            
            <TableCell align="right">COVID 19</TableCell>
            <TableCell align="right">expertise require</TableCell>
            <TableCell align="right">start</TableCell>
            <TableCell align="right">end</TableCell>
            <TableCell align="right">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.creatby}</TableCell>
              <TableCell align="right">{row.COVID_19}</TableCell>
              <TableCell align="right">{row.clinical_expertise?.join(",")}</TableCell>
              <TableCell align="right">{row.start}</TableCell>
              <TableCell align="right">{row.end}</TableCell>
              <TableCell align="right"><button>delete</button></TableCell>
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
    </>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
    const userId = ctx.query.userId?ctx.query.userId:""
    const db = await getDatabaseConnection()
    const prep = db.getRepository<Project>('project')
    const result = await prep.createQueryBuilder().where("createby = :userId", {userId}).getMany()
    return {'props': {'projects' : result}}
}