import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Fab, Modal, Hidden } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import CloseIcon from '@material-ui/icons/Close';
import ShowMoreText from 'react-show-more-text';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(7, 5),
    height: '90vh'
  },
  pad: {
    padding: "11px",
  }, 
  fab: {
    margin: theme.spacing(1),
  },
  media: {
    minHeight: '30vh',
    maxHeight: '50vh',
    objectFit: 'cover',
    maxWidth: '100%',
    margin: 'auto'
  },
}));

export default function Details({ event, openModal, closeModal }) {
  const classes = useStyles();

  return (<>
    <Hidden only="xs">
    <Grid item sm={8} xs={false} style={{ height: '90vh'}} >
      <div>
        <Paper className={classes.root} style={{maxHeight: '100vh', overflow: 'auto'}} >


            <Grid container justify="center">

              <Grid item xs={12} align="center">
                <Typography variant='h4' component='h2' className={classes.pad}>
                 {event[0].name}
                </Typography>
              </Grid>

              <Grid item xs={12} align="center">
                <img src={event[0].img} className={classes.media}/>
              </Grid>


            </Grid>
          
           <Typography variant='h5' component='h5' className={classes.pad}>
              {moment(event[0].time_start).format('ddd, MMM DD, h:mm a')}
              <Fab className={classes.fab} 
                color="primary"
                aria-label="add"
                onClick={() => { addToCalendar(event) }}> 
                  <CalendarIcon />
                </Fab>
           </Typography>

           <Typography variant='h5' component='h5' className={classes.pad} >
             @ {event[0].venue}  {event[0].location}
           </Typography>

          <Typography variant='h6' component='h5' className={classes.pad}>
          <ShowMoreText
                lines={4}
                more='Show more'
                less='Show less'
                anchorClass=''
                expanded={false}
            >
                {event[0].description}
            </ShowMoreText>

           </Typography>

              <Button href={event[0].url} variant='outlined' className={classes.pad} target="_blank">Visit partner site</Button>

        </Paper>
      </div>
    </Grid>
    </Hidden>

<Hidden smUp="true">
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        open={openModal}
        onClose={closeModal}
      >
        <div>

        <Grid item sm={8} xs={false} style={{ height: '90vh'}} >
      <div>
        <Paper className={classes.pad} style={{maxHeight: '100vh', overflow: 'auto'}} >
          <Typography variant='h6' component='h6' className={classes.pad}>
            {event[0].name}
          </Typography>

            <img src={event[0].img} className={classes.media}/>
          
           <Typography variant='subtitle1'  className={classes.pad}>
              {moment(event[0].time_start).format('ddd, MMM DD, h:mm a')}

              <Fab className={classes.fab} 
                color="primary"
                aria-label="add"
                onClick={() => { addToCalendar(event) }}> 
                  <CalendarIcon />
                </Fab>

                <Fab
                  color="secondary"
                  aria-label="add"
                  onClick={closeModal}
                 >
              <CloseIcon />
            </Fab>
           </Typography>

           <Typography variant='h6' component='h6' className={classes.pad} >
             @ {event[0].venue}  {event[0].location}
           </Typography>

          <Typography variant='subtitle2'  className={classes.pad}>
          <ShowMoreText
                lines={4}
                more='Show more'
                less='Show less'
                anchorClass=''
                expanded={false}
            >
                {event[0].description}
            </ShowMoreText>

           </Typography>

              <Button href={event[0].url} variant='outlined' className={classes.pad} target="_blank">Visit partner site</Button>

        </Paper>
      </div>
    </Grid>

</div>
      </Modal>
      </Hidden>
</>
  )

}
