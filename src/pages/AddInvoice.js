import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'reactn';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function AddInvoice() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Add Invoice
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddInvoice
