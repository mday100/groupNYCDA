/*
 * File           : $Header: //depot/escenic/widget-framework/branches/1.8/widget-framework-core/src/main/webapp/resources/js/searchFormHandler.js#3 $
 * Last edited by : $Author: shah $ $Date: 2011/05/18 $
 * Version        : $Revision: #3 $
 *
 */

function getElementById(elementId) {
  if (document.getElementById) { // DOM3 = IE5, NS6
    return document.getElementById(elementId);
  }
  else if (document.layers) { // Netscape 4
    return document.elementId;
  }
  else { // IE 4
    return document.all.elementId;
  }
}

function isEmpty(form, fieldName) {
  var value = form[fieldName].value;
  return value == null || value == "";
}

function validateSimpleSearchForm(form, errorParaId) {
  var validationFailed = isEmpty(form, 'searchString');

  if (validationFailed) {
    form['searchString'].style.border = '1px solid red';
    form['searchString'].focus();
    getElementById(errorParaId).style.display = 'block';
  }

  return !validationFailed;
}

function validateSearchForm(form, errorParaId) {
  var validationFailed = isEmpty(form, 'all') && isEmpty(form, 'exactPhrase') && isEmpty(form, 'atLeastOne') && isEmpty(form, 'without');
  if (validationFailed == true) {
    form['all'].style.border = '1px solid red';
    form['exactPhrase'].style.border = '1px solid red';
    form['atLeastOne'].style.border = '1px solid red';
    form['without'].style.border = '1px solid red';
    form['all'].focus();
    getElementById(errorParaId).style.display = 'block';
  }
  else {
    form['all'].style.border = '1px solid #A9A9A9';
    form['exactPhrase'].style.border = '1px solid #A9A9A9';
    form['atLeastOne'].style.border = '1px solid #A9A9A9';
    form['without'].style.border = '1px solid #A9A9A9';
    getElementById(errorParaId).style.display = 'none';
  }
  return !validationFailed;
}
function parseDateAndFormSubmit(advancedSearchForm, searchExprErrorParaId) {
  var currentDate = new Date();
  var currentDay = currentDate.getDate();
  var currentMonth = currentDate.getMonth() + 1;

  var currentYear = currentDate.getFullYear();

  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth;
  }
  if (currentDay < 10) {
    currentDay = "0" + currentDay;
  }
  var fromDate = getElementById("searchFromDate").value;
  if (fromDate == null || fromDate == "") {
    fromDate = "1970-01-01";
  }
  else {
    var stFromDate = fromDate.split("-");
    //minus 1 month so that it compensates plus 1 of search action
    var fMonth = parseInt(stFromDate[1], 10) - 1;
    if (fMonth < 10)
      fMonth = "0" + fMonth;
    fromDate = stFromDate[0] + "-" + fMonth + "-" + stFromDate[2];
  }

  var toDate = getElementById("searchToDate").value;
  if (toDate == null || toDate == "") {
    toDate = currentYear + "-" + currentMonth + "-" + currentDay;
  }
  else {
    var stToDate = toDate.split("-");
    //minus 1 month so that it compensates plus 1 of search action
    var tMonth = parseInt(stToDate[1], 10) - 1;
    if (tMonth < 10)
      tMonth = "0" + tMonth;
    toDate = stToDate[0] + "-" + tMonth + "-" + stToDate[2];
  }
  fromDate = fromDate.replace("-", ",");
  fromDate = fromDate.replace("-", ",");
  toDate = toDate.replace("-", ",");
  toDate = toDate.replace("-", ",");
  
  var compareDateOne = new Date(fromDate);
  var compareDateTwo = new Date(toDate);
  // to make sure start date is before the end date
  if (compareDateOne > compareDateTwo) {
    var temp = toDate;
    toDate = fromDate;
    fromDate = temp;
  }

  var startDay = fromDate.substring(8, 10);
  var startMonth = fromDate.substring(5, 7);
  var startYear = fromDate.substring(0, 4);
  var toDay = toDate.substring(8, 10);
  var toMonth = toDate.substring(5, 7);
  var toYear = toDate.substring(0, 4);

  getElementById("searchStartDay").value = startDay;
  getElementById("searchStartMonth").value = startMonth;
  getElementById("searchStartYear").value = startYear;
  getElementById("searchToDay").value = toDay;
  getElementById("searchToMonth").value = toMonth;
  getElementById("searchToYear").value = toYear;

  if (validateSearchForm(advancedSearchForm, searchExprErrorParaId)) {
    // when we're initiating a search, the page number should be reset to 1
    advancedSearchForm['pageNumber'].value = '1';
    advancedSearchForm.submit();
  }
}

