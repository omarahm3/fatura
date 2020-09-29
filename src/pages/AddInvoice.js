import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Select,
} from "@material-ui/core";
import renderHTML from "react-render-html";
import React, { useState, useEffect } from "reactn";
import { invoiceToHtml, previewInvoice } from "../service/invoiceService";
import { removeWhiteSpacesBetweenTags } from "../service/templateParserService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  previewGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  previewHtml: {},
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  previewBox: {
    display: "flex",
    justifyContent: "center",
    fontSize: "1.2rem",
    marginBottom: "1rem",
    marginTop: "1rem",
    backgroundColor: "#d2d2",
    borderRadius: "0.5rem",
    padding: "0.5rem",
  },
}));

function AddInvoice() {
  const classes = useStyles();
  const [invoiceHtml, setInvoiceHtml] = useState("");
  const [templateType, setTemplateType] = useState("sparksuite");

  const generatePriviewHtml = (templateType) => {
    const invoiceHtml = previewInvoice(templateType);
    setInvoiceHtml(removeWhiteSpacesBetweenTags(invoiceHtml));
  };

  useEffect(() => {
    generatePriviewHtml(templateType);
  }, [""]);

  const downloadPdf = () => {
    invoiceToHtml(invoiceHtml, '', (err, res) => {
      console.log(res);
    });
  };

  const handleTemplateTypeChange = (e) => {
    const type = e.target.value;
    setTemplateType(type);
    generatePriviewHtml(type);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              Invoice Template
            </InputLabel>
            <Select
              native
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={templateType}
              onChange={handleTemplateTypeChange}
            >
              <option value="sparksuite">Spark Suite</option>
            </Select>
            <FormHelperText>Select invoice template</FormHelperText>
          </FormControl>

          <Button onClick={downloadPdf}>Download PDF</Button>
        </div>
      </Grid>
      <Grid className={classes.previewGrid} item xs={false} sm={4} md={7}>
        <div className={classes.previewHtml}>{renderHTML(invoiceHtml)}</div>
        <div className={classes.previewBox}>
          <p>Invoice Preview</p>
        </div>
      </Grid>
    </Grid>
  );
}

export default AddInvoice;
