// some general purpose javascript functions

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

function initializeMap(divId, latitudes, longitudes, labels, addresses) {
  var count = latitudes.length;
  var i;

  if (GBrowserIsCompatible() && count > 0) {
    var map = new GMap2(document.getElementById(divId));
    var center = new GLatLng(latitudes[0], longitudes[0]);

    if (count == 1) {
      map.setCenter(center, 12);
    } else {
      map.setCenter(center, 1);
    }

    var topRight = new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(5, 5));
    var topLeft = new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(5, 5));

    map.addControl(new GMapTypeControl(), topLeft);
    map.addControl(new GSmallMapControl(), topRight);

    for (i = 0; i < count; i++) {
      var marker = createGMapMarker(map, latitudes[i], longitudes[i], labels[i], addresses[i]);
      map.addOverlay(marker);
    }
  }
}

function createGMapMarker(map, latitude, longitude, label, address) {
  var location = new GLatLng(latitude, longitude);
  var marker = new GMarker(location);

  GEvent.addListener(marker, 'click', function() {
    var info = "";
    if (label != null && label != "") {
      info += "<b>" + label + "</b>";
    }
    if (address != null && address != "") {
      info += "<br/>Address: " + address;
    }

    if (info != "") {
      map.openInfoWindowHtml(location, info);
    }
  });
  return marker;
}
function showWidgetOnClick(elementId){
  $('#widget-div-main-'+elementId).click(function(e){
    if(configWidgetShowingPopupId != null){
      if(configWidgetShowingPopupId != 'widget-div-popup-'+elementId)  {
        $('#'+configWidgetShowingPopupId).fadeOut(1500);
      }
    }
    if(configWidgetSelectedMainDivId != null){
      if(configWidgetSelectedMainDivId != 'widget-div-main-'+elementId)  {
        $('#'+configWidgetSelectedMainDivId).css({background:'darkgray'});
      }
    }

    configWidgetShowingPopupId = 'widget-div-popup-'+elementId;
    configWidgetSelectedMainDivId = 'widget-div-main-'+elementId;
    var height = $('#widget-div-popup-'+elementId).height();
    var width = $('#widget-div-popup-'+elementId).width();
    leftVal=e.pageX+"px";
    topVal=e.pageY+"px";
    $('#widget-div-main-'+elementId).css({background:'cadetblue'});
    $('#widget-div-popup-'+elementId).css({left:leftVal,top:topVal}).show();
  });
}
function hideWidget(wigetId){
  configWidgetShowingPopupId = null;
  configWidgetSelectedMainDivId = null;
  $('#widget-div-popup-'+wigetId).fadeOut(1500);
  $('#widget-div-main-'+wigetId).css({background:'darkgray'});
}
function showPreviousPage(map) {
  map.startIndex -= (2 * map.pageSize);
  if(map.startIndex < 0) {
    map.startIndex = 0;
  }
  return  showNextPage(map);
}
function showNextPage(map) {
  $.ajax({
    url: map.servletUrl,
    data: {q:map.q, rows:map.pageSize, wt:'json', start:map.startIndex},
    cache: true,
    dataType: 'json',
    success: function(data) {
      map.data = data;
      var numOfArticles = map.data.response.docs.length;
      var totalNumberOfResults = map.data.response.numFound;
      var children = $("#"+map.pageId)[0].children;
      for(var i = 0;i < children.length; i++) {
        var innerChildren = children[i].children;
        if(i<numOfArticles) {
          var doc = map.data.response.docs[i];
          $(children[i]).css({"display":"block"});
          var aElement = innerChildren[0].children[0];
          $(aElement).text(doc.title);
          $(aElement).attr('href', map.redirectUrl+doc.objectid);
          $(innerChildren[1]).text(doc.summary);
          var dateString = doc.publishdate.toString();
          if (dateString != null || dateString.length() > 0) {
            if (dateString.charAt(dateString.length - 1) == 'Z') {
              dateString = dateString.substring(0, dateString.length - 1);
            }
            var date = Date.parse(dateString);
            $(innerChildren[2]).text( date.toString("dd MMM yyyy hh:mm tt") + ' GMT');
          }
        }
        else {
          $(children[i]).css({"display":"none"});
        }
      }
      $("#"+map.headerId).css({"display":"block"});
      if(map.startIndex > 0) {
        $("#"+map.prevButtonId).css({"display":"block"});
      }
      else {
        $("#"+map.prevButtonId).css({"display":"none"});
      }
      if(totalNumberOfResults <= (map.startIndex + numOfArticles)) {
        $("#"+map.nextButtonId).css({"display":"none"});
      }
      else {
        $("#"+map.nextButtonId).css({"display":"block"});
      }
      if((totalNumberOfResults <= (map.startIndex + numOfArticles)) && (map.startIndex == 0)) {
        $("#"+map.prevNextDivId).css({"display":"none"});
      }
      else {
        $("#"+map.prevNextDivId).css({"display":"block"});
      }
      map.startIndex += numOfArticles;
    }
  });
  return false;
}
function deleteBlogPosts(formId, elementId) {
  var fromObj = $('#' + formId)[0];
  if (fromObj.articleIds.value.length > 0) {
    fromObj.submit();
  }
  else {
    var element;
    if (document.getElementById) { // DOM3 = IE5, NS6
      element = document.getElementById(elementId);
    }
    else if (document.layers) { // Netscape 4
      element = document.elementId;
    }
    else { // IE 4
      element = document.all.elementId;
    }
    element.style.display = 'block';
  }
  return false;
}
function sortBlogPostListDate() {
  $.tablesorter.addParser({
    id: 'dateSorter',
    is: function(s) {
      return false;
    },
    format: function(s) {
      ret = s;
      if (s.indexOf('class') > 0) {
        str = s.substring(s.indexOf('class'));
        if (str.indexOf('=') > 0) {
          str = str.substring(str.indexOf('='));
          if ((str.indexOf('"') > 0) && (str.indexOf("'") > 0)) {
            if (str.indexOf('"') > str.indexOf("'")) {
              str = str.substring(str.indexOf("'") + 1);
              ret = str.substring(0, str.indexOf("'"));
            }
            else {
              str = str.substring(str.indexOf('"') + 1);
              ret = str.substring(0, str.indexOf('"'));
            }
          }
          else  if (str.indexOf('"') > 0) {
            str = str.substring(str.indexOf('"') + 1);
            ret = str.substring(0, str.indexOf('"'));
          }
          else  if (str.indexOf("'") > 0) {
              str = str.substring(str.indexOf("'") + 1);
              ret = str.substring(0, str.indexOf("'"));
            }
        }
      }
      return ret;
    },
    type: "text"
  });
}
function sortBlogPostListTitle() {
  $.tablesorter.addParser({
    id: 'titleSorter',
    is: function(s) {
      return false;
    },
    format: function(s) {
      ret = '';
      isOn = true;
      for (i = 0; i < s.length; i++) {
        c = s.charAt(i);
        if (c == '<') {
          isOn = false;
        }
        if (isOn) {
          if (c >= '!' && c <= '~')
          {
            ret = ret.concat(c);
          }
        }
        if (c == '>') {
          isOn = true;
        }
      }
      return ret.toLowerCase();
    },
    type: "text"
  });
}
function sortBlogPostListBoth() {
  $("table.itemlist").tablesorter({
    headers: {
      0: {
        sorter: false
      },
      1: {
        sorter: 'titleSorter'
      },
      2: {
        sorter:'dateSorter'
      },
      3: {
        sorter: false
      }
    }
  });
}
function sortBlogPostListDeleteButtonOnly() {
  $("table.itemlist").tablesorter({
    headers: {
      0: {
        sorter: false
      },
      1: {
        sorter: 'titleSorter'
      },
      2: {
        sorter: false
      }
    }
  });
}
function sortBlogPostListDateOnly() {
  $("table.itemlist").tablesorter({
    headers: {
      0: {
        sorter: 'titleSorter'
      },
      1: {
        sorter:'dateSorter'
      },
      2: {
        sorter: false
      }
    }
  });
}
function sortBlogPostListNone() {
  $("table.itemlist").tablesorter({
    headers: {
      0: {
        sorter: 'titleSorter'
      },
      1: {
        sorter: false
      }
    }
  });
}
function sortBlogPosts(map) {
  sortBlogPostListDate();
  sortBlogPostListTitle();
  if(map.showDeleteButton && map.showCreationDate) {
    sortBlogPostListBoth();
  }
  else if(map.showDeleteButton) {
    sortBlogPostListDeleteButtonOnly();
  }
  else if(map.showCreationDate) {
      sortBlogPostListDateOnly();
    }
    else {
      sortBlogPostListNone();
    }
}
function deletePictures(formId, elementId) {
  var fromObj = $('#' + formId)[0];
  if (fromObj.articleIds.value.length > 0) {
    fromObj.submit();
  }
  else {
    var element;
    if (document.getElementById) { // DOM3 = IE5, NS6
      element = document.getElementById(elementId);
    }
    else if (document.layers) { // Netscape 4
      element = document.elementId;
    }
    else { // IE 4
      element = document.all.elementId;
    }
    element.style.display = 'block';
  }
  return false;
}
