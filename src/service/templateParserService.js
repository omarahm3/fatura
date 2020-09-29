import { FATURA_SELECTORS } from '../constants';

const cheerio = require('cheerio');

/**
 * This to determine if object is instance of Cheerio
 * @param {Object} obj 
 */
const isCheerioObject = (obj) => obj && {}.toString.call(obj) === '[object Function]' && obj().cheerio;

/**
 * This should make sure that object passed to edit functions is cheerio object
 * @param {String|cheerio} obj 
 * @returns {cheerio.Cheerio}
 */
const handlePassedObject = (obj) => !isCheerioObject(obj) ? cheerio.load(obj) : obj;

/**
 * This will remove any whitespaces between HTML tags
 * it acts as HTML minifier
 * @param {String} html 
 * @return {String}
 */
export const removeWhiteSpacesBetweenTags = (html) => {
  return html.replace(/>\s+|\s+</g, (m) => m.trim());
}

/**
 * This to edit the logo section in templates
 * @param {String|cheerio} htmlTemplate 
 * @param {ObjectConstructor} opts 
 * @return {cheerio}
 */
const editFaturaLogo = (htmlTemplate, opts = {}) => {
  htmlTemplate  = handlePassedObject(htmlTemplate);
  let html      = '';

  if (opts.imgUrl) {
    html = `<img src="${opts.imgUrl}" style="width:100%; max-width:300px;" />`;
  } else if (opts.titleText) {
    html = `<p>${opts.titleText}</p>`;
  }

  if (opts.url) {
    html = `<a href="${opts.url}" target="_blank">${html}</a>`
  }

  htmlTemplate(FATURA_SELECTORS.INVOICE_LOGO).html(html);
  return htmlTemplate;
}

/**
 * This edit the heading level of the invoice such as invoice number, dates ..etc
 * @param {String|cheerio} htmlTemplate 
 * @param {ObjectConstructor} opts 
 * @return {cheerio}
 */
const editFaturaInvoiceHeading = (htmlTemplate, opts = {}) => {
  htmlTemplate  = handlePassedObject(htmlTemplate);

  if (opts.invoiceNumber) {
    htmlTemplate(FATURA_SELECTORS.INVOICE_HEADING_NUMBER).text(opts.invoiceNumber);
  }

  if (opts.invoiceCreatedAt) {
    htmlTemplate(FATURA_SELECTORS.INVOICE_HEADING_CREATED_DATE).text(opts.invoiceCreatedAt);
  }

  if (opts.invoiceDueDate) {
    htmlTemplate(FATURA_SELECTORS.INVOICE_HEADING_DUE_DATE).text(opts.invoiceDueDate);
  }

  return htmlTemplate;
}

const parse = (htmlTemplate) => {
  let  $ = cheerio.load(htmlTemplate);

  editFaturaLogo($, {
    url: 'https://mrg.sh',
    imgUrl: 'https://www.sparksuite.com/images/logo.png'
  });

  editFaturaInvoiceHeading($, {
    invoiceNumber: 1,
    invoiceCreatedAt: new Date().toString(),
    invoiceDueDate: new Date().toString(),
  });

  return $.html();
}

export default parse;