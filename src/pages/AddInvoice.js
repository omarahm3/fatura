import { Button, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'reactn';
import renderHTML from 'react-render-html';
import InvoiceTemplate from '../templates/invoice-sparksuite.html';

const pdf = window.require('html-pdf')

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh'
  }
}));

function AddInvoice() {
  const classes = useStyles();
  const prepareHtml = () => {
    try {
      return renderHTML(InvoiceTemplate)
    } catch(e) {
      console.log(e);
    }
  }
  const downloadPdf = () => {
    pdf.create(InvoiceTemplate).toFile('/home/mrgeek/Desktop/invoic.pdf', (err, res) => {
      console.log(res.filename);
    });
  }
  
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Button onClick={downloadPdf}>
          Download PDF
        </Button>
      </Grid>
      <Grid item xs={false} sm={4} md={7}>
        {prepareHtml()}
      </Grid>
    </Grid>
  )
}

export default AddInvoice
