/*************************************************************************************************************
* Author: Melwyn Furtado
* Description: holds all utility methods so that they can be reused in any module as requireJS module load 
**************************************************************************************************************/

define(function() {
	return {
		getPageKeywords: function () {
			var keywordsArr = ($('meta[property="article:tag"]').length > 0) ? $('meta[property="article:tag"]') : $('meta[name="keywords"]'),
				keywords = "";
			keywordsArr.each(function(i, elm) {
				keywords += $(this).attr('content') + ",";
			});
			return keywords;
		},

		getCookie: function(c_name) {
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++) {
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
				if (x==c_name) {
					return unescape(y);
				}
			}
		  	return "";
		},

		getURLParameter: function(name, hashbang) {
			var str = ( hashbang ) ? location.hash || location.search : location.search;
			return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(str)||[,null])[1]);			
		},

		getVideoID: function() {
			var videoID = decodeURI((RegExp(/^.*-(\d+)\/$/g).exec(location.pathname)||[,null])[1]);
			return ( videoID === "null" ) ?  this.getURLParameter('videoid') : videoID ;
		},

		time2HHMMSS: function (duration) {
		    var sec_num = parseInt(duration, 10); // don't forget the second parm
		    var hours   = Math.floor(sec_num / 3600);
		    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		    var seconds = sec_num - (hours * 3600) - (minutes * 60);

		    if (hours   < 10) {hours   = "0"+hours;}
		    if (minutes < 10) {minutes = "0"+minutes;}
		    if (seconds < 10) {seconds = "0"+seconds;}
		    var time    = hours+':'+minutes+':'+seconds;
		    return time;
		},

		getPosDifference: function(elm1, elm2, type) {
			var elm1Offset, elm2Offset;
			type = type || 'y';
			elm1Offset = $(elm1).offset();
			elm2Offset = $(elm2).offset();

			if(type === 'y') {
				return parseInt( elm2Offset.top - (elm1Offset.top + $(elm1).height()) );
			} else {
				return parseInt(elm2Offset.left - elm1Offset.left);
			}
		},

		matrixToArray: function(matrix) {
    		return matrix.substr(7, matrix.length - 8).split(', ');
		},

		getArticleID: function () {
			var articleID = decodeURI((RegExp(/^.*-(\d+).html$/g).exec(location.pathname)||[,null])[1]);
			return ( articleID === "null" ) ? undefined : articleID ;
		}	
	};
});