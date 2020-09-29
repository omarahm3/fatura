import moment from 'moment';
import { FATURA_DEFAULTS, FATURA_SELECTORS } from '../constants';

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

const editFaturaInvoiceCompanyAndUserDatails = (htmlTemplate, opts = {}) => {
  if (opts.company) {
    const companyDetails = opts.company;

    if (companyDetails.name) {
      htmlTemplate(FATURA_SELECTORS.INVOICE_COMPANY_NAME).text(companyDetails.name);
    }

    if (companyDetails.address) {
      htmlTemplate(FATURA_SELECTORS.INVOICE_COMPANY_ADDRESS).text(companyDetails.address);
    }

    if (companyDetails.extend) {
      htmlTemplate(FATURA_SELECTORS.INVOICE_COMPANY_EXTEND).text(companyDetails.extend);
    }
  }

  if (opts.user) {
    const userDetails = opts.user;

    if (userDetails.name) {
      htmlTemplate(FATURA_SELECTORS.INVOICE_USER_NAME).text(userDetails.name);
    }

    if (userDetails.email) {
      htmlTemplate(FATURA_SELECTORS.INVOICE_USER_EMAIL).text(userDetails.email);
    }

    if (userDetails.extend) {
      htmlTemplate(FATURA_SELECTORS.INVOICE_USER_EXTEND).text(userDetails.extend);
    }

    if (userDetails.bank) {
      const bankDetails = userDetails.bank;

      if (bankDetails.name) {
        htmlTemplate(FATURA_SELECTORS.INVOICE_USER_BANK_NAME).text(bankDetails.name);
      }

      if (bankDetails.swiftCode) {
        htmlTemplate(FATURA_SELECTORS.INVOICE_USER_BANK_SWIFT_CODE).text(bankDetails.swiftCode);
      }

      if (bankDetails.accountNumber) {
        htmlTemplate(FATURA_SELECTORS.INVOICE_USER_BANK_ACCOUNT_NUMBER).text(bankDetails.accountNumber);
      }
    }
  }

  return htmlTemplate;
}

const initialParsing = (htmlTemplate) => {
  const dateToday = moment().format(FATURA_DEFAULTS.DEFAULT_DATE_FORMAT);
  const dueDate   = moment().add(1, 'month').endOf('month').subtract(6, 'days').format(FATURA_DEFAULTS.DEFAULT_DATE_FORMAT);

  

  return htmlTemplate;
}

/**
 * This will do html parsing to fill it with initial data
 * @param {String} htmlTemplate 
 */
const parse = (htmlTemplate) => {
  htmlTemplate = cheerio.load(htmlTemplate);
  initialParsing(htmlTemplate);
  return htmlTemplate.html();
}

export default parse;