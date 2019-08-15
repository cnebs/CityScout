import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    minWidth: '100%',
    boxShadow: '0px 3px 7px'
  },
  media: {
    height: '130px',
  },
  content: {
    height: '40px',
  }
});

export default function MicroCardMaker({ event, handleMicroCardClick }) {
  const classes = useStyles();
  const eventStart = Date(event.time_start)
  

  return (
    <ListItem alignItems='flex-start' onClick={()=>(handleMicroCardClick(event))}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={event.img || 'Event Image'}
            title={event.name || 'Hello, there!'}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant='h5' component='h4'>
              {
                event.name.length < 45 ?
                event.name :
                ((event.name).substring(0, 45)+'...')
              }
            </Typography>
            {/* <Typography variant='body2' color='textSecondary' component='p'>
              Starting at {eventStart.split('GMT')[0].split(' ')[4].split(':').slice(0, 2).join(':') || 'starting time'}
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  )
}
