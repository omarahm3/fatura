export const showError = (err, title = '') => {
  console.group(`------ ERROR (${title}) ------`);
  console.log(err);
  console.groupEnd();
}