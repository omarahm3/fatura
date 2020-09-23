import ResetCss from '../templates/reset-css.html';
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
    const templateHtml = getInvoiceHtmlTemplate(template);
    return ResetCss + templateCss + templateHtml;
  } catch(err) {
    console.group('------ ERROR ------');
    console.log(err);
    console.groupEnd();
  }
}

export const invoiceToHtml = (htmlInvoice, saveLocation, pdfOptions = PDF_OPTIONS, cb = null) => {
  try {
    pdf.create(htmlInvoice, {
      format: 'A2',
    }).toFile(saveLocation, cb);
  } catch (err) {
    console.group('------ ERROR ------');
    console.log(err);
    console.groupEnd();
  }
}