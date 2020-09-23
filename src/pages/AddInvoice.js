import { Button, FormControl, Grid, InputLabel, makeStyles, Paper, Select } from '@material-ui/core';
import renderHTML from 'react-render-html';
import React, { useState, useEffect } from 'reactn';
import { invoiceToHtml, previewInvoice } from '../service/invoiceService';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  previewGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  previewHtml: {
  },
  previewBox: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1.2rem',
    marginBottom: '1rem',
    marginTop: '1rem',
    backgroundColor: '#d2d2',
    borderRadius: '0.5rem',
    padding: '0.5rem'
  },
}));

function AddInvoice() {
  const classes = useStyles();
  const [invoiceHtml, setInvoiceHtml] = useState('');
  const [templateType, setTemplateType] = useState('sparksuite');

  const generatePriviewHtml = (templateType) => {
    const invoiceHtml = previewInvoice(templateType);
    setInvoiceHtml(invoiceHtml);
  }
  
  useEffect(() => {
    generatePriviewHtml(templateType);
  }, [''])
  
  const downloadPdf = () => {
    invoiceToHtml(invoiceHtml, '', null, (err, res) => {
      console.log(res);
    })
  }

  const handleTemplateTypeChange = (e) => {
    const type = e.target.value;
    setTemplateType(type);
    generatePriviewHtml(type);
  }
  
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Invoice Template</InputLabel>
          <Select
            native
            value={templateType}
            onChange={handleTemplateTypeChange}
            inputProps={{
              name: 'templateType',
              id: 'template-type',
            }}
          >
            <option value="sparksuite">Spark Suite</option>
          </Select>
        </FormControl>

        <Button onClick={downloadPdf}>
          Download PDF
        </Button>
      </Grid>
      <Grid className={classes.previewGrid} item xs={false} sm={4} md={7}>
        <div className={classes.previewHtml}>
          {renderHTML(invoiceHtml)}
        </div>
        <div className={classes.previewBox}>
          <p>Invoice Preview</p>
        </div>
      </Grid>
    </Grid>
  )
}

export default AddInvoice
