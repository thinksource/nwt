import { Container, Grid } from "@material-ui/core";
import React from "react";
import MediaCard from "../components/MediaCard";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);
export default function List() {
    const classes = useStyles();
    return (
    <>
    <h1>List Title</h1>
    <Grid container className={classes.root} spacing={3}>
      
        <MediaCard title="test1"></MediaCard>
        <MediaCard title="test2"></MediaCard>
        <MediaCard title="test2"></MediaCard>
        <MediaCard title="test2"></MediaCard>
        
    </Grid>
    </>
    )
}