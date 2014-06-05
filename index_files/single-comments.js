ind.gigya.comments.response = {};
ind.gigya.comments.eventHandlers = {};

//showSingleCommentsUI
ind.gigya.comments.showSingleCommentsUI	= function(params)
{
	try {
		if(!ind.gigya._safety()) {
			ind.log("Could not initialize showSingleCommentsUI.");
			return false;
		}
		var $ = jQuery;
		
		// Verify required parameters are set.
	    if (!ind.gigya.comments.verifyMandatoryParams(params))
	    {
	      ind.log("Exiting without rendering comments stream.");
	      return;
	    }

		// Merge params with global configuration and defaults.
		var defaultParams = {
				streamID: "",
				onLoad: function(event){},
				onError: function(event){},
				onBeforeCommentSubmitted: function(event){},
				onCommentSubmitted: function(response){},
				onCommentVoted: function(response){},
				onCommentFlagged: function(response){},
				formTemplate: ind.gigya.comments.singleCommentsFormTemplate,
				_commentCountClass: "$containerID_$side_commentCount",
				_commentStreamClass: "$containerID_$side_commentStream",
				commentStreamTemplate: ind.gigya.comments.singleCommentStreamTemplate,
				_commentUserVoteClass: "$commentID-userVote userVote-$userVote", // Not public. NOTE: $commentID-userVote hardcoded, does not autoadjust.
				_commentVoteScoreClass: "$commentID-voteScore",
				commentTemplate: ind.gigya.comments.singleCommentTemplate,
				_replyTemplate: ind.gigya.comments.singleCommentsReplyTemplate,
				_replyFormTemplate: ind.gigya.comments.singleCommentsReplyFormTemplate,
				_flagTemplate: ind.gigya.comments.commentsFlatTemplate, // Not public. Do not override.
				_shareTemplate:ind.gigya.comments.commentShareTemplate, // Not public. Do not override.
				_voteTemplate: ind.gigya.comments.commentVoteTemplate, // Not public. Do not override.
				_deleteCommentTemplate : ind.gigya.comments.deleteCommentTemplate,
				loginHeaderTemplate: ind.gigya.comments.singleCommentLoggoutHeader,
				submitForm :ind.gigya.comments.submitForm
		};
		params = $.extend({}, defaultParams, gigya.thisScript.globalConf, params);

		//Fetch Comment Data
		ind.gigya.comments.initializeCommentsProcess(params,ind.gigya.comments.getComments, ind.gigya.comments.response.handleResponseFromGigya);
		/*IND-ES1023 (Formatting Comments)*/
		//Add the formatting btns click handlers after the comments plugin is initialized properly.
		ind.gigya.comments.addFormattingControls();
		/*IND-ES1023 (Formatting Comments)*/	
	}
	catch(e) {
		ind.log(e);
		return;
	}
};

ind.gigya.comments.initializeCommentsProcess = function (params,callbackMethodToGetCommentsChunk, callbackMethodToHandlerCommentsChunkResponse){
	var localparams = {
		categoryID: params.categoryID,
		streamIDs: [params.streamID,params.streamID+"_for",params.streamID+"_against"],
		callback:function (response) {
			var responseStreamInfo = response.streamInfo;
			var totalCommentCount = 0;
			if (typeof responseStreamInfo != 'undefined') {
				for(var i=0; i<responseStreamInfo.length; i++){
					var responseObjItem = responseStreamInfo[i];
					totalCommentCount = totalCommentCount + responseObjItem.commentCount;
				}
			}
			params.initialCommentCount = totalCommentCount;
			callbackMethodToGetCommentsChunk(params,callbackMethodToHandlerCommentsChunkResponse);
		}
	};
	gigya.comments.getStreamInfo(localparams);
};

ind.gigya.comments.response.handleResponseFromGigya = function(response) {
	var $ = jQuery;
	
	if (typeof response!="undefined") {
		if(response.errorCode != 0) {
			ind.log("Could not fetch comments.");
			return;
		}

		// Call setStreamInfo API for comment reply notification email
		if(!(response.streamInfo.streamURL && response.streamInfo.streamTitle)) {
			gigya.comments.setStreamInfo({
			    categoryID: params.categoryID, 
			    streamID: params.streamID,
			    streamTitle: ind.gigya.comments.userActionObj.title,
			    streamURL: ind.gigya.comments.userActionObj.linkBack
			});			
		}

		if(ind.gigya.comments.isUserLoggedIn()) {
			gigya.socialize.getUserInfo({context:$.extend({}, response.context, { commentsResponse: response}),callback:ind.gigya.comments.response.handleUserDetailsResponse});
		} else {
			// Enter rendering thread.
			ind.gigya.comments._renderSingleCommentsUI($.extend({}, response.context, { commentsResponse: response}));
		}
	}
	
};

ind.gigya.comments.response.handleUserDetailsResponse = function(response) {
	var responseContext = response.context;
	responseContext.userPhotoUrl = response.user.photoURL;
	responseContext.userNickName = response.user.nickname;
	responseContext.userUID = response.user.UID;
	responseContext.userEmail = response.user.email;
	ind.gigya.comments._renderSingleCommentsUI(responseContext);
};

ind.gigya.comments.getSubmitFormTemplate = function (params) {
	var htmlMarkUp = "";
	if (ind.gigya.autoclose != "readable") {
	
		htmlMarkUp = ind._template(params.submitForm, {
			loginHeader : ind._template(params.loginHeaderTemplate,{
				avatarImage:(ind.gigya.comments.isUserLoggedIn()?((typeof params.userPhotoUrl!='undefined' && params.userPhotoUrl!='')?params.userPhotoUrl:'/skins/ind/voices/gfx/defaultAvatar.png'):'/skins/ind/voices/gfx/defaultAvatar.png'),
				loginContainer: (ind.gigya.comments.isUserLoggedIn()?ind.gigya.comments.logoutButtonContainer:ind.gigya.comments.loginButtonContainer)
			}),
			containerID: params.containerID
		});
	}
	return htmlMarkUp;
}

// Render Single Comments UI
ind.gigya.comments._renderSingleCommentsUI = function(params)
{
	try {
		// Internal method. We assume all parameters are passed and libs are loaded.
		var $ = jQuery;
		
		var commentPluralText = 'Comments';
		var commentSingularText = 'Comment';
		
    
	    // Generate HTML markup for posting a comment
		var html = ind._template(params.formTemplate, {
	    		categoryID: params.categoryID,
	    		streamID: params.streamID,
	    		commentCountClass: ind._template(params._commentCountClass, {
		          containerID: params.containerID,
		          side: 'for'
		        }),
		        commentCount: params.initialCommentCount,
		        submitForm : ind.gigya.comments.getSubmitFormTemplate(params),
		        commentTextLabel: params.initialCommentCount>1?commentPluralText:commentSingularText
	    });
    
	    // Generate HTML markup for comment streams
		var comments = ind.gigya.comments.generateCommentStremMarkup('for',params); 
	    html += comments;
	    	    
	    // Render
	    if( typeof ind.gigya.nextCommentStart == "undefined" ) {
	    	$("#" + params.containerID).html(html);	
	    	//set the pointer to the nextChunk
	    	//ind.gigya.comments.getComments(params,ind.gigya.comments.handleNextReadMoreResponse);
	    	ind.gigya.comments.handleNextReadMoreResponse(params.commentsResponse.hasMore);
	    	ind.gigya.nextCommentStart = params.commentsResponse.next;
	    	ind.gigya.comments.eventHandlers.postCommentOps(params);
	    } else {
	    	$(".stream").append( comments );
	    	ind.gigya.comments.handleNextReadMoreResponse(params.commentsResponse.hasMore);
	    	//ind.gigya.comments.getComments(params,ind.gigya.comments.handleNextReadMoreResponse);
	    	ind.gigya.comments.eventHandlers.postCommentOps(params);
	    	return true;
	    }
	    
		/*IND-ES1024 (Sorting Comments)*/
		//Add the sorting option click handlers after the comments html is injected into DOM.
		ind.gigya.comments.bindSortingEvents();
		if( params.commentsResponse.commentCount > 0 ) {
			ind.gigya.comments.displaySortingTabs();
		}
		/*IND-ES1024 (Sorting Comments)*/		    

	    $(".singleCommentLogin").click(function() {
	    	ind.gigya.comments.initiateLoginProcessIfLoggedout(params);
	    	ind.gigya.comments.setUrlBeforeLogin();
	    });
	    
	    $(".singleCommentLogout").click(function() {
	    	$("#logout-link").trigger('click');
	    });
	    
	    //checks if the user is loged after they click on the textbox
	    $('.postCommentWrapper .for textarea').focus(function(){
	    	ind.gigya.comments.initiateLoginProcessIfLoggedout(params);
	    	ind.gigya.comments.setUrlBeforeLogin();
	    });

	    // Form submit
	    $("#singleCommentSubmit").click(function() {
	    	// Post comment.
	    	var commentFor = $("#" + params.containerID + "_postCommentFor").val();
      
      		//Convert newline to html break tag
      		commentFor = commentFor.replace(/\n/g, "<br />");

	    	// Check to see which side the user has taken.
	    	var side, commentText;
	    	if(commentFor) {
	    		commentText = commentFor;
	    		side = "for";
	    	} else {
	    		ind.gigya.comments.eventHandlers.onError({
	    			errorMessage: "Comment empty.",
	    			errorCode: "COMMENT_EMPTY",
	    			errorContainerClass : "error"	
	    		}, params);
	    		return false;
	    	}
      
	    	// Create event.
	    	var event = {
	    		commentText: commentText,
	    		side: side,
	    		errorContainerClass : "error"
	    	};
      
	    	// Before submit event.
	    	ind.gigya.comments.eventHandlers.onBeforeSubmit(params, "error");
      
	    	// Submit.
	    	ind.gigya.comments.eventHandlers.submit(event, params);
      
	    	return false; // Cancel for submittal.
	    });
	    
	    //Show more comments
	    $( ".readMore > a" ).bind( "click", function(e){
	    	ind.gigya.comments.getComments(params,ind.gigya.comments.handleReadMoreResponse);
	    	return false;
	    }); 
	    
	    var urlOfCurrentPage = location.href;
	    if (urlOfCurrentPage.indexOf("loadcomments")!=-1) {
	    	window.location = urlOfCurrentPage; 
	    }
    
  }
  catch(e)
  {
    ind.log(e);
    return;
  }
};


ind.gigya.comments.handleReadMoreResponse = function(response) {
	var params = response.context;
	ind.gigya.nextCommentStart = response.next;
	ind.gigya.comments._renderSingleCommentsUI($.extend({}, params, {
		commentsResponse: response
	}));
	
	if( response.comments.length == 0 && !response.hasMore ) {
		$('.readMore').remove();
	}
};

ind.gigya.comments.handleNextReadMoreResponse = function(hasMore) {
	if( hasMore === false ) {
		$('.readMore').remove();
	}
};

ind.gigya.comments.eventHandlers.onBeforeSubmit = function(params, errorContainerClass) {
	if (typeof errorContainerClass != "undefined"){
		$("#" + params.containerID + " ."+errorContainerClass).html("").hide();
	}
	ind.gigya.comments.initiateLoginProcessIfLoggedout(params);
};

ind.gigya.comments.eventHandlers.submit = function(event, params) {
	gigya.comments.postComment({
		categoryID: params.categoryID,
		streamID: params.streamID,
		commentText: event.commentText,
		parentID: event.parentID,
		callback: function(response) {
			if(response.errorCode == 0) {
				response.side = event.side;
				if( typeof event.parentID != "undefined" ) {
					ind.gigya.comments.eventHandlers.onReplySubmit(response, params);
				} else {
					ind.gigya.comments.eventHandlers.onSubmit(response, params);
				}
			} else {
				// Override bad error message when not logged in.
				if(response.errorCode == 403007) {
					response.errorMessage = "Not logged in";
				}
  
				ind.gigya.comments.eventHandlers.onError({
					errorCode: response.errorCode,
					errorMessage: response.errorMessage,
					errorContainerClass : event.errorContainerClass
				}, params);
			}
		}
	});
};

ind.gigya.comments.eventHandlers.onReplySubmit = function (response, params) {
	// Clear forms.
	$("#commentReply").parent().remove();
	//TEMP FIX - reset comment timestamp to local machine's & not post thread's
	var time	= new Date().getTime();
	response.comment.timestamp = time;
	response.comment.threadTimestamp= time;

	// Check/flag set for recent comment reply posted by logged in user in _renderComment function
	response.comment.submitted = true;

	// Append comment to said reply.
	$("#" + response.comment.parentID + " > .replies").append(ind.gigya.comments._renderComment(response.comment, params, response.side));
	ind.gigya.comments.eventHandlers.postSubmit( response, params );
};

ind.gigya.comments.eventHandlers.postSubmit = function(response, params) {
	// Increment comment count.
	var countContainer = $("#" + params.containerID + " ." + ind._template(params._commentCountClass, {
		containerID: params.containerID,
		side: response.side
	}));
	var count = countContainer.html();
	count = (count * 1) + 1;
	countContainer.html(count);
	
	// Fire callback.
	params.onCommentSubmitted(response);
	ind.gigya.comments.eventHandlers.postCommentOps(params);
};

ind.gigya.comments.eventHandlers.postCommentOps = function (params) {
	
	// Vote
	$("#" + params.containerID + " .vote a").bind("click", function(e) {
		var userVote = $(this).attr("data-userVote");
		var commentID = $(this).attr("data-commentID");
		var side = $(this).attr("data-side");
	  
		// Check to see if the user changed their previous vote.
		var userVoteContainer = $("#" + params.containerID + " ." + commentID + "-userVote");
		if(userVoteContainer.hasClass("userVote-" + userVote)) {
			return false;
		}
		
		ind.gigya.comments.eventHandlers.onBeforeSubmit(params);
		ind.gigya.comments.setUrlBeforeLogin();
	  
		gigya.comments.vote({
			vote: userVote,
			commentID: commentID,
			categoryID: params.categoryID,
			streamID: params.streamID,
			callback: function(response) {
				if(response.errorCode == 0) {
					// Increment/decrement locally.
					var commentVoteContainer = $("#" + params.containerID + " ." + ind._template(params._commentVoteScoreClass, {
						commentID: commentID
					}));
					var votes = (commentVoteContainer.html() * 1);
					if(userVote == "pos") {
						votes++;
					} else {
						votes--;
					}
					commentVoteContainer.html(votes);
	        
					// Change indicator of current vote.
					userVoteContainer.removeClass("userVote-" + (userVote == "pos" ? "neg" : "pos")).addClass("userVote-" + userVote);
				}
	    
				params.onCommentVoted(response);
	    	}
		});
	  
		return false;
	});
	
	//Delete button
	$("#" + params.containerID + " .deleteComment a").bind("click", function(e) {
		var commentID = $(this).attr("data-commentID");
		ind.gigya.comments.deleteGigyaComment(params, commentID);
		ind.gigya.comments.displaySortingTabs();	
		return false;
	});

	// Flag button
	$("#" + params.containerID + " .flag a").bind("click", function(e) {
		if(ind.gigya.comments.isUserLoggedIn()){
			ind.gigya.comments.flagClick();
			$(this).hide();
		} else{
			ind.gigya.comments.eventHandlers.onBeforeSubmit(params);
			ind.gigya.comments.setUrlBeforeLogin();
		}
		var commentID = $(this).attr("data-commentID");
		var side = $(this).attr("data-side");
		gigya.comments.flagComment({
			commentID: commentID,
			categoryID: params.categoryID,
			streamID: params.streamID,
			callback: params.onCommentFlagged
		});
		return false;
	});
	
	// Reply form & Replies
	$(".reply a").bind("click", function() {
		if(ind.gigya.comments.isUserLoggedIn()){
			var replyForm = "";
			if (ind.gigya.autoclose != "readable") {
				replyForm = ind._template(params._replyFormTemplate, {
			    		categoryID: params.categoryID,
			    		streamID: params.streamID,
			    		containerID: params.containerID
			    });
				replyForm = "<form>" + replyForm+ "</form>";
			}
		    
			var id =$(this).attr("data-commentID");
			
			$("#commentReply").parent().remove();
			$("#" + id + "-reply").prepend( replyForm );
			$("#parentId").val( id );
			
			$(".close-replyform").click(function(e) {
				$("#" + id + "-reply").html('');
			});
			
			//Reply
		    $("#commentReplySubmit").click( function(e) {
		    	
		    	var comment = $("#replyText").val();
		    	var parentId= $('#parentId').val();
		      
      			//Convert newline to html break tag
      			comment = comment.replace(/\n/g, "<br />");

		    	// Check to see which side the user has taken.
		    	var side, commentText, parentID;
		    	if(comment) {
		    		commentText = comment;
		    		side = "for";
		    		parentID = parentId;
		    	} else {
		    		ind.gigya.comments.eventHandlers.onError({
		    			errorMessage: "Reply empty.",
		    			errorCode: "COMMENT_EMPTY",
		    			errorContainerClass : "errorReply"
			        }, params);
		    		return false;
		    	}
		      
		    	// Create event.
		    	var event = {
		    			commentText: commentText,
		    			side: side,
		    			parentID: parentId,
		    			errorContainerClass : "errorReply"
		    	};
		      
		    	// Before submit event.
		    	ind.gigya.comments.eventHandlers.onBeforeSubmit(params, "errorReply");
		      
		    	// Submit.
		    	ind.gigya.comments.eventHandlers.submit(event, params);
		      
		    	return false; // Cancel for submittal. */
		    });
					
			return false;
	    }
		else{
			var atr = $(this).attr('data-commentid');
	    	ind.gigya.comments.initiateLoginProcessIfLoggedout(params);
	    	ind.gigya.comments.eventHandlers.replyId(params, atr);
	    }
	});
};

ind.gigya.comments.eventHandlers.replyId = function (params, currentReplyId) {
	//EVS.gigyaLoginFormCaller = "replyButtonHit";
	var url = window.location.href.replace(/\?.*$/,'');
	url = url.replace(/#.*$/,'');
	var urlParams = url.split("?");
	$('#gigya-login-form #login').click(function(){
		url += '?loadcomments=true#'+currentReplyId;
		  EVS.replyCommentUrl = url;
	});
};

ind.gigya.comments.eventHandlers.onSubmit = function (response, params) {
	// Clear forms.
	$("#" + params.containerID + " textarea").val("");
	//TEMP FIX - reset comment timestamp to local machine's & not post thread's
	var time = new Date().getTime();
	response.comment.timestamp = time;
	response.comment.threadTimestamp = time;

	// Check/flag for recent comment posted by logged in user in _renderComment function
	response.comment.submitted = true;
	// Add comment to stream (fake).
	$("#" + params.containerID + " ." + ind._template(params._commentStreamClass, {
		containerID: params.containerID,
		side: response.side
		})).prepend(ind.gigya.comments._renderComment(response.comment, params, response.side));

	ind.gigya.comments.eventHandlers.postSubmit( response, params );
	ind.gigya.comments.displaySortingTabs();		
};

ind.gigya.comments.eventHandlers.onError = function (event, params) {
	// Show error.
	$("#" + params.containerID + " ."+event.errorContainerClass).html(event.errorMessage).show();
	// Callback
	params.onError(event);
};

ind.gigya.comments.generateCommentStremMarkup = function(side, params) {
	var comments = "";
    
	if( typeof params.commentsResponse.comments == "undefined" || params.commentsResponse.length <= 0 ) {
		return false;
	}
	
	$.each(params.commentsResponse.comments, function(i, comment) {
		if(typeof ind.gigya.commentChunkSize == "undefined" && i >= ind.gigya.commentChunkSize && ind.gigya.commentChunkSize > 0 ) { 
			return false;
		}
		comments += ind.gigya.comments._checkReply(side, comment,params);
	});
	
	//run this block only on first call
	if( typeof ind.gigya.nextCommentStart == "undefined" ) {
	
		comments = ind._template(params.commentStreamTemplate, {
			streamID: params.streamID,
			comments: comments,
			side: side,
			commentCount: params.initialCommentCount,
			commentChunkSize: (typeof ind.gigya.commentChunkSize != "undefined" && ind.gigya.commentChunkSize > 0 )? ind.gigya.commentChunkSize : params.commentsResponse.commentCount,
			commentCountClass: ind._template(params._commentCountClass, {
						containerID: params.containerID,
						side: side
				}),
			commentStreamClass: ind._template(params._commentStreamClass, {
				containerID: params.containerID,
				side: side
			})
		});
	}
	
	return comments;
};

ind.gigya.comments._checkReply = function(side, comment, params) {
	var commentMarkup = ind.gigya.comments._renderComment(comment, params, side);
	//check if the comment has a thread, if it does, render it as well
	if( (typeof comment.replies!="undefined") && comment.replies.length > 0 ) {
		$.each(comment.replies, function(i, reply) {
			if(i >= params.commentsResponse.requestParams.threadDepth) return false;
			commentMarkup = $( commentMarkup ).children('.replies').append( ind.gigya.comments._checkReply(side, reply, params) ).end();
			commentMarkup = $('<div>').append( $(commentMarkup).clone() ).html();
		});
	}
	return commentMarkup;
}


ind.gigya.comments._renderComment = function(comment, templates, side)
{
  var time = ind.gigya.comments.getCommentTime( comment.timestamp );
  if(!comment.posVotes) {
	  comment.posVotes = 0;
  }
  if(!comment.negVotes) {
	  comment.negVotes = 0;
  }

  //Construct commenterNameHtml and commenterImgHtml based on user account being deleted or for currently submitted comment
  if(!comment.sender.photoURL) {
	comment.sender.photoURL = "/skins/ind/voices/gfx/defaultAvatar.png"; 
  }

  var commenterNameHtml, commenterImgHtml;
  if(comment.sender.UID) {
  	commenterNameHtml = '<a class="senderName" href="/users/' + comment.sender.UID + '">' + comment.sender.name + '</a>';
  	commenterImgHtml = '<a href="/users/' + comment.sender.UID + '">';
  	commenterImgHtml += '<img src="' + comment.sender.photoURL + '" height="50" width="50" alt="' + comment.sender.name + '" />';
  	commenterImgHtml += '</a>';
  } else if(comment.submitted) {
  	commenterNameHtml = '<a class="senderName" href="/users/' + ind.gigya.comments.getUIDValue() + '">' + comment.sender.name + '</a>';
   	commenterImgHtml = '<a href="/users/' + ind.gigya.comments.getUIDValue() + '">';
  	commenterImgHtml += '<img src="' + comment.sender.photoURL + '" height="50" width="50" alt="' + comment.sender.name + '" />';
  	commenterImgHtml += '</a>'; 	
  }else {
  	commenterNameHtml = '<span class="senderName">anonymous user</span';
  	commenterImgHtml = '<img src="/skins/ind/voices/gfx/defaultAvatar.png" height="50" width="50" alt="anonymous user" />';
  }
  
  //Reset comment submitted flag to false
  comment.submitted = false;

  var html = ind._template(templates.commentTemplate, {
    commentID: comment.ID,
    commentText: comment.commentText,
    flagCount: comment.flagCount,
    commenterImgHtml: commenterImgHtml,
    commenterNameHtml: commenterNameHtml,
    status: comment.status,
    "timestamp.value": time.value,
    "timestamp.unit": time.unit,
    userVote: comment.vote,
    voteScore: comment.posVotes - comment.negVotes,
    posVotes: comment.posVotes,
    negVotes: comment.negVotes,
    side: side,
    replyTemplate: (ind.gigya.autoclose != "readable")?ind._template(templates._replyTemplate, {
      commentID: comment.ID,
      side: side
    }):"",
    flagTemplate: ind._template(templates._flagTemplate, {
      commentID: comment.ID,
      side: side
    }),
    shareTemplate: ind._template(templates._shareTemplate, {
        commentID: comment.ID,
    	tweeterViaUserDetails: ind.gigya.indyVoicesTwitterAccount,
        shareUrl: function() {
  			  var url = location.href;
  			  var urlParams	= url.split("?");
  			  if( urlParams.length > 1 && urlParams.length < 3 ) {
  				  var domainUrl = urlParams[0]; 
  				  if (domainUrl.indexOf('#')!=-1) {
  					  domainUrl = domainUrl.split("#")[0]; 
  				  }
  				  url = domainUrl + '?loadcomments=true#'+comment.ID; 
  			  } else {
				  if (url.indexOf('#')!=-1) {
					  url = url.split("#")[0]; 
				  }
  				  url += '?loadcomments=true#'+comment.ID; 
  			  }
  		  return url;
  	  }
  	}),
    deleteTemplate : ind.gigya.comments.checkIfCommentAllowedToDelete(comment, templates, side) ,
    posVoteTemplate: ind._template(templates._voteTemplate, {
      vote: "pos",
      commentID: comment.ID,
      side: side,
      voteText: "+"
    }),
    negVoteTemplate: ind._template(templates._voteTemplate, {
      vote: "neg",
      commentID: comment.ID,
      side: side,
      voteText: "&#8211;"
    }),
    commentVoteScoreClass: ind._template(templates._commentVoteScoreClass, {
      commentID: comment.ID
    }),
    commentUserVoteClass: ind._template(templates._commentUserVoteClass, {
      commentID: comment.ID,
      userVote: comment.vote
    })
  });
  return html;
};

/*IND-ES1023 (Formatting Comments)*/
ind.gigya.comments.addFormattingControls = function() {
	var control, controlForm;
	$(document).delegate('#singleCommentHeader .comment-formatting-btns .formatting-btn', 'click', function(e) {
		control = $(this).attr('data-btn');
		controlForm = $(this).parents('form').find('textarea');
		if(controlForm.selection().trim() === "") return false;
		switch(control) {
			case "bold":
				 controlForm.selection('insert', {text: '<b>', mode: 'before'})
								.selection('insert', {text: '</b>', mode: 'after'});						
				break;
			case "italic":
				 controlForm.selection('insert', {text: '<i>', mode: 'before'})
								.selection('insert', {text: '</i>', mode: 'after'});						
				break;
			case "blockquote":
				 controlForm.selection('insert', {text: '<blockquote>', mode: 'before'})
								.selection('insert', {text: '</blockquote>', mode: 'after'});						
				break;
			case "anchor":
				if( $(this).attr('data-commentType') === "comment" ) {
					$( "#anchor-href-comment" ).dialog("open");		
				} else {				
					$( "#anchor-href-reply" ).dialog("open");
				}						
				break;																							
		}
	});

	$( "#anchor-href-comment" ).dialog({
		autoOpen: false,
		height: 30,
		width: 325,
		modal: true,
		dialogClass: "formatting-btn-link-overlay",
		buttons: {
			"Ok": function() {
				$('#singleCommentHeader_postCommentFor').selection('insert', {text: '<a href="' + $(this).children("input").val() + '" target="_blank" rel="nofollow">', mode: 'before'})
									.selection('insert', {text: '</a>', mode: 'after'});
				$(this).dialog("close");										
			},
			Cancel: function() {
				$(this).dialog( "close" );
			}
		}
	});

	$( "#anchor-href-reply" ).dialog({
		autoOpen: false,
		height: 30,
		width: 325,
		modal: true,
		dialogClass: "formatting-btn-link-overlay",
		buttons: {
			"Ok": function() {
				$('#commentReply #replyText').selection('insert', {text: '<a href="' + $(this).children("input").val() + '" target="_blank" rel="nofollow">', mode: 'before'})
									.selection('insert', {text: '</a>', mode: 'after'});
				$(this).dialog("close");										
			},
			Cancel: function() {
				$(this).dialog( "close" );
			}
		}
	});	
};
/*IND-ES1023 (Formatting Comments)*/

/*IND-ES1024 (Sorting Comments)*/
ind.gigya.comments.bindSortingEvents = function() {
	var anchorObjArr = $("#singleCommentHeader .sorting-controls li a");

	anchorObjArr.each(function (i, elm) {
		if ($(elm).attr('data-sortOrder').trim() === ind.gigya.commentSortOrder) {
			$(elm).addClass('active');
		}
	});	
	anchorObjArr.bind("click", function(e) {
		ind.gigya.comments.addLoader();
		anchorObjArr.each(function (i, elm) {
			if ($(elm).hasClass('active')) {
				$(elm).removeClass('active');
			}
		});
		ind.gigya.commentSortOrder = $(this).attr("data-sortOrder").trim();		
		$(this).addClass('active');
		//Reset the index for comment stream based on clicked sorting order
		delete ind.gigya.nextCommentStart;
		ind.gigya.comments.showSingleCommentsUI(params);
	});
};

ind.gigya.comments.displaySortingTabs = function() {
	//Display sorting tabs if there are any comments
	var tabsCtrObj = $("#singleCommentHeader .sorting-controls");
	if(tabsCtrObj.hasClass('show') === false) {
		tabsCtrObj.removeClass("hide").addClass("show");
	}
};

ind.gigya.comments.addLoader = function() {
	$("#" + params.containerID + " .comments").html("<img src='/images/loading.gif' class='loading' border='0' />");
};
/*IND-ES1024 (Sorting Comments)*/
