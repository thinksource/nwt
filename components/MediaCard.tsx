import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Contact } from '../src/entity/Contact';

interface Props {
    title: string,
    // contact: Contact,
    
}

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(p:Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>

        <CardContent>
          <span>{p.title}</span>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
