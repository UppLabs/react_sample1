export const exportCSV = (csvContent, name) => {
   var link = window.document.createElement('a');
   link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
   link.setAttribute('download', `${name}.csv`);
   link.click();
};