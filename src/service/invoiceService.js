import ResetCss from '../templates/reset-css.html';
import parse from './templateParserService';
import { showError } from './utilService';
const pdf = window.require('html-pdf')

const TEMPLATES_DIR_NAME  = 'templates';
const TEMPLATE_PREFIX     = 'invoice';
const PDF_OPTIONS         = {
  format: 'A2',
};

const generateCssStyle = (templateCss) => 
  `<style>${templateCss}</style>`;

export const getInvoiceHtmlTemplate = (template) => 
  require(`../${TEMPLATES_DIR_NAME}/${TEMPLATE_PREFIX}-${template}/${TEMPLATE_PREFIX}-${template}.html`).toString();

export const getInvoiceCssTemplate = (template) => 
  require(`../${TEMPLATES_DIR_NAME}/${TEMPLATE_PREFIX}-${template}/${TEMPLATE_PREFIX}-${template}.css`).toString();

export const previewInvoice = (template) => {
  try {
    const templateCss  = generateCssStyle(getInvoiceCssTemplate(template));
    const templateHtml = parse(getInvoiceHtmlTemplate(template));
    return ResetCss + templateCss + templateHtml;
  } catch(err) {
    showError(err, 'invoiceService.previewInvoice');
  }
}

export const invoiceToHtml = (htmlInvoice, saveLocation, cb = null, pdfOptions = PDF_OPTIONS) => {
  try {
    pdf.create(htmlInvoice, pdfOptions).toFile(saveLocation, cb);
  } catch (err) {
    showError(err, 'invoiceService.invoiceToHtml');
  }
}