import ResetCss from '../templates/reset-css.html';
const pdf = window.require('html-pdf')

const TEMPLATES_DIR_NAME  = 'templates';
const TEMPLATE_PREFIX     = 'invoice';
const PDF_OPTIONS         = {
  format: 'A2',
};

export const getInvoiceTemplate = (template) => require(`../${TEMPLATES_DIR_NAME}/${TEMPLATE_PREFIX}-${template}/${TEMPLATE_PREFIX}-${template}.html`);

export const previewInvoice = (template) => {
  try {
    const templateHtml = getInvoiceTemplate(template);
    return ResetCss + templateHtml;
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