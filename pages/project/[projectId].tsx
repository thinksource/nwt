import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { getDatabaseConnection } from '../../libs/db';
import { NextPageContext } from 'next';
import _ from "lodash";
import { Project } from '../../src/entity/Project';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function CenteredGrid(props:any) {
  const classes = useStyles();
  console.log(props)
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Project details:</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export const getServerSideProps = async (ctx: NextPageContext) => {
    const id = ctx.query.projectId?ctx.query.projectId:""
    const db = await getDatabaseConnection()
    const prep = db.getRepository<Project>('project')
    // const build = prep.createQueryBuilder().innerJoin("user", "User", "User.id = Project.creatby").where("User.id = :userId", {userId})
    // const build = db.createQueryBuilder('project', 'Project')
    //     .innerJoinAndSelect("user", "User", "User.id = Project.createbyId")
    //     .innerJoinAndSelect('organization', 'Organization', "Project.organization=Organization.id").where("Project.id = :id", {id})
    
    // console.log(build.getSql())
    const result = await prep.findOne({where: {id}})
    console.log(result)
    console.log("================finished=")
    return {'props': {'project' : _.pickBy(result, v => (v !== undefined && typeof v!== "function"))}}
}