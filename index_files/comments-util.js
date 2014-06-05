

// Used to log events. By default, outputs to console.
ind.log = function(msg)
{
	if (typeof console!="undefined" && typeof console.log!="undefined")
	{
		console.log(msg);
	}
};

// Used to replace templating placeholder variables.
ind._template = function(html, values)
{
	if (typeof html!="undefined")
	{
		// Sort keys by length (longer first) so keys that contain other keys are processed later.
		var keys = new Array();
		$.each(values, function(key, value) 
			{
				keys.push(key);
			});
		
		var s = function(a, b)
			{
				return b.length - a.length;
			}
		keys.sort(s);
  
		$.each(keys, function(ignore, key) 
			{
				var value = values[key];
				html = html.replace(new RegExp("\\$" + key, "g"), value);
			});
	}
	return html;
};

// Check for dependecies. Return false if not loaded.
ind.gigya._safety = function()
{
	if (typeof gigya=="undefined")
	{
		ind.log("Gigya not loaded.");
		return false;
	}
	if (typeof jQuery=="undefined")
	{
		ind.log("JQuery not loaded.");
		return false;
	}
	return true;
};

//calculate the length of time since the comment was posted
ind.gigya.comments.getCommentTime = function( commentTimestamp ) 
{
	var timestamp	= { "value":0, "unit": "seconds" };
	if (typeof commentTimestamp!="undefined") 
	{
		var today	= new Date().getTime();
		var length	= (today - commentTimestamp) / 1000;
		
		if( length > 60 ) {
			length	/= 60;
			timestamp.unit = "minutes";
			if( length > 60 ) {
				length	/=60;
				timestamp.unit	= "hours";
				if( length > 24 ) {
					length 	/= 24;
					timestamp.unit="days";
				}
			}
		}
		timestamp.value	= Math.round( length );
	}
	return timestamp;
};

ind.gigya.comments.getComments = function(params,callbackMethodToHandleResponse, side) {
	var conf = {};	
	if (typeof side!== 'undefined' && side == 'for') {
		conf = {
		  	categoryID: params.categoryID,
		    streamID: params.forStreamID,
		    includeUID: true,
		    threadLimit: ( ind.gigya.commentChunkSize ) ? ind.gigya.commentChunkSize  : 0,
		    threadDepth: ( ind.gigya.commentReplyLimit )? ind.gigya.commentReplyLimit : 0,
		    start : ( ind.gigya.nextForCommentStart )? ind.gigya.nextForCommentStart : 0,
		    callback: callbackMethodToHandleResponse,
		    context: params,
		    sort : ind.gigya.commentSortOrder,	//IND-ES1024 (Sorting Comments), reading the default sort order from CMS set in global javascript variable
		    includeStreamInfo : true
		};
	} else if (typeof side!== 'undefined' && side == 'against') {
		conf = {
		  	categoryID: params.categoryID,
		    streamID: params.againstStreamID,
		    includeUID: true,
		    threadLimit: ( ind.gigya.commentChunkSize ) ? ind.gigya.commentChunkSize  : 0,
		    threadDepth: ( ind.gigya.commentReplyLimit )? ind.gigya.commentReplyLimit : 0,
		    start : ( ind.gigya.nextAgainstCommentStart )? ind.gigya.nextAgainstCommentStart : 0,
		    callback: callbackMethodToHandleResponse,
		    context: params,
		    sort : ind.gigya.commentSortOrder,	//IND-ES1024 (Sorting Comments), reading the default sort order from CMS set in global javascript variable
		    includeStreamInfo : true
		};
	} else {
		conf = {
		  	categoryID: params.categoryID,
		    streamID: params.streamID,
		    includeUID: true,
		    threadLimit: ( ind.gigya.commentChunkSize ) ? ind.gigya.commentChunkSize  : 0,
		    threadDepth: ( ind.gigya.commentReplyLimit )? ind.gigya.commentReplyLimit : 0,
		    start : ( ind.gigya.nextCommentStart )? ind.gigya.nextCommentStart : 0,
		    callback: callbackMethodToHandleResponse,
		    context: params,
		    sort : ind.gigya.commentSortOrder,	//IND-ES1024 (Sorting Comments), reading the default sort order from CMS set in global javascript variable
		    includeStreamInfo : true
		};
	}
	gigya.comments.getComments(conf);
};


ind.gigya.comments.verifyMandatoryParams = function(params){
	if (typeof params.categoryID=="undefined")
    {
      ind.log("showSingleCommentsUI failed: categoryID not set.");
      return false;
    }
    if (typeof params.containerID=="undefined")
    {
      ind.log("showSingleCommentsUI failed: containerID not set.");
      return false;
    }
    if (typeof params.streamID=="undefined")
    {
      ind.log("showSingleCommentsUI failed: streamID not set.");
      return false;
    }
    return true;
};

ind.gigya.comments.initiateLoginProcessIfLoggedout = function(params){
	if (!ind.gigya.comments.isUserLoggedIn()) {
		params.onSiteLoginClicked();
	}
};

ind.gigya.comments.isUserLoggedIn = function(){
	if (document.cookie.indexOf('gigya.userID') == -1) {
		return false;
	}
	return true;
};

ind.gigya.comments.facebookShare = function (url) {
	var title=document.title;
	window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(url)+'&t='+encodeURIComponent(title),'sharer','toolbar=0,status=0,width=626,height=436');
	return false;
};

ind.gigya.comments.twitterShare = function (url,accountName) {
	var title=document.title;
	window.open('https://twitter.com/intent/tweet?source=tweetbutton&via='+accountName+'&original_referer='+encodeURIComponent(url)+'&text='+encodeURIComponent(title)+'&url='+encodeURIComponent(url),'sharer','toolbar=0,status=0,width=626,height=436');
	return false;
};

ind.gigya.comments.deleteGigyaComment = function(params,commentIdToDelete, side) {
	var conf = {};
	if (typeof side!== 'undefined' && side == 'for') {
		conf = {
		  	categoryID: params.categoryID,
		    streamID: params.forStreamID,
		    callback: ind.gigya.comments.deleteCallbackMethod,
		    UID : ind.gigya.comments.getUIDValue(),
		    commentID : commentIdToDelete,
		    context: commentIdToDelete
		};
	} else if (typeof side!== 'undefined' && side == 'against') {
		conf = {
		  	categoryID: params.categoryID,
		    streamID: params.againstStreamID,
		    callback: ind.gigya.comments.deleteCallbackMethod,
		    UID : ind.gigya.comments.getUIDValue(),
		    commentID : commentIdToDelete,
		    context: commentIdToDelete
		};
	} else {
		conf = {
		  	categoryID: params.categoryID,
		    streamID: params.streamID,
		    callback: ind.gigya.comments.deleteCallbackMethod,
		    UID : ind.gigya.comments.getUIDValue(),
		    commentID : commentIdToDelete,
		    context: commentIdToDelete
		};
	}
	
	gigya.comments.deleteComment(conf);
};

ind.gigya.comments.getUIDValue = function getCookie(){
    var cName = "gigya.userID";
	cValue = "";
	pCOOKIES = new Array();
	pCOOKIES = document.cookie.split('; ');
	for(bb = 0; bb < pCOOKIES.length; bb++){
		NmeVal  = new Array();
		NmeVal  = pCOOKIES[bb].split('=');
		if(NmeVal[0] == cName){
			cValue = unescape(NmeVal[1]);
		}
	}
	return cValue;
};

ind.gigya.comments.deleteCallbackMethod = function(response){
	if (response.errorCode == 0) {
		$('#'+response.context).remove();
	}
};

ind.gigya.comments.commentsFlatTemplate = '\
	<div class="flag">\
		<a href="#" title="flag" data-commentID="$commentID" data-side="$side"></a>\
	</div>';

ind.gigya.comments.commentShareTemplate = '\
	<div class="share" id="$commentID_shareDiv">\
		<a href="#" onclick="return ind.gigya.comments.twitterShare(\'$shareUrl\',\'$tweeterViaUserDetails\')" class="custom-twitter-share-button"></a>\
		<a href="http://www.facebook.com/share.php?u=$shareUrl" onclick="return ind.gigya.comments.facebookShare(\'$shareUrl\')" target="_blank" class="facebook-share-button"></a>\
	</div>';

ind.gigya.comments.commentVoteTemplate = '\
	<div class="vote vote-$vote">\
		<a href="#" data-commentID="$commentID" data-side="$side" data-userVote="$vote">$voteText</a>\
	</div>';

ind.gigya.comments.deleteCommentTemplate = '\
	<div class="deleteComment">\
		<a href="#" title="delete" data-commentID="$commentID" data-side="$side" class="deleteCommentIcon"></a>\
	</div>';

ind.gigya.comments.setUrlBeforeLogin = function (){
	var url = window.location.href;
	EVS.replyCommentUrl = url;
};

ind.gigya.comments.flagClick = function(){
		$("#gigya-flag-confirmation-message-box").dialog("open");
};

ind.gigya.comments.checkIfCommentAllowedToDelete = function(comment, params, commentSide) {
	var htmlMarkup = "";
	if (comment.sender.isSelf == true) {
		htmlMarkup = ind._template(params._deleteCommentTemplate, {
		        commentID: comment.ID,
		        side : commentSide
			});
	}
	return htmlMarkup;
};
