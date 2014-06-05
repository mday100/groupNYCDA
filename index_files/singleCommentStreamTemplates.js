//Templates for Comments Rendering
ind.gigya.comments.singleCommentsFormTemplate = '\
	<div class="postComment">\
		<div class="commentCount">\
			<span class="commentHeader">\
				<span class="$commentCountClass commentNumber" id="initialCommentCount">$commentCount</span>\
				<span> $commentTextLabel</span>\
			</span>\
			<img class="commentsLogo" src="/skins/ind/voices/gfx/comments-logo.png" alt="img" />\
		</div>\
		$submitForm\
		<div class="error"></div>\
	</div>';

/*IND-ES1023 (Formatting Comments)*/
/*Commenting out the old single-stream comment form template and adding the formatting buttons to it*/
/*
ind.gigya.comments.submitForm = '\
	<div class="formContainer">\
		$loginHeader\
		<form>\
			<div class="postCommentWrapper">\
				<div class="for">\
					<textarea id="$containerID_postCommentFor"></textarea>\
				</div>\
			</div>\
			<span class="separator"></span>\
			<div class="submit">\
				<input type="button" value="Post" id="singleCommentSubmit" />\
			</div>\
		</form>\
	</div>';
*/
ind.gigya.comments.submitForm = '\
	<div class="formContainer">\
		$loginHeader\
		<form>\
			<ul class="comment-formatting-btns"> \
	   			<li data-btn="bold" class="formatting-btn" title="Bold">Bold</li> \
	   			<li data-btn="italic" class="formatting-btn" title="Italic">Italic</li> \
			</ul> \
			<div class="postCommentWrapper">\
				<div class="for">\
					<textarea id="$containerID_postCommentFor"></textarea>\
				</div>\
			</div>\
			<span class="separator"></span>\
			<div class="submit">\
				<input type="button" value="Post" id="singleCommentSubmit" />\
			</div>\
		</form>\
	</div>';

ind.gigya.comments.singleCommentLoggoutHeader = '\
	<img src="$avatarImage" height="50" width="50" alt="img" class="avatar">\
	<div class="title">Post a Comment</div>\
	$loginContainer';

ind.gigya.comments.loginButtonContainer = '\
	<div id="loginButtonContainer" class="login">\
		<input type="button" value="Login" class="singleCommentLogin">\
	</div>';

ind.gigya.comments.logoutButtonContainer = '\
	<div id="logoutButtonContainer" class="login">\
		<input type="button" value="Logout" class="singleCommentLogout">\
	</div>';

ind.gigya.comments.singleCommentStreamTemplate = '\
	<ul class="sorting-controls hide">\
		<li class="top-voted"><a href="javascript:void(0);" data-sortOrder="votesDesc"><span>Top</span></a></li>\
		<li class="newest"><a href="javascript:void(0);" data-sortOrder="dateDesc"><span>New</span></a></li>\
		<li class="oldest"><a href="javascript:void(0);" data-sortOrder="dateAsc"><span>Old</span></a></li>\
	</ul>\
	<div class="comments">\
		<div class="stream $commentStreamClass">$comments</div>\
		<div class="readMore">\
			<a href="#">Read more</a>\
		<div>\
	</div>';

ind.gigya.comments.singleCommentTemplate = '\
	<div id="$commentID" class="commentBlock">\
		<div class="commentImage">\
			$commenterImgHtml\
		</div>\
		<div class="commentAside">\
			<div class="single-commentData-header">\
    			<div class="senderNameAndTime">\
					$commenterNameHtml\
					<span class="senderTime">$timestamp.value $timestamp.unit ago</span>\
				</div>\
				$shareTemplate\
				$flagTemplate\
				$deleteTemplate\
    		</div>\
    		<div class="commentBody">$commentText</div>\
	 		$replyTemplate\
    		<div class="vote-buttons $commentUserVoteClass">\
      			$posVoteTemplate\
      			<span class="vote-score $commentVoteScoreClass">$voteScore</span>\
      			$negVoteTemplate\
    		</div>\
    	</div>\
		<div id="$commentID-reply" class="reply-form"></div>\
		<div class="replies">\
		</div>\
	</div>';

ind.gigya.comments.singleCommentsReplyTemplate = '\
	<div class="reply">\
		<a href="javascript:void(0)" data-commentID="$commentID" data-side="$side">Reply</a>\
	</div>';

/*IND-ES1023 (Formatting Comments)*/
/*Commenting out the old single-stream comment form template and adding the formatting buttons to it*/
/*
ind.gigya.comments.singleCommentsReplyFormTemplate = '\
	<div id="commentReply" class="postComment" >\
		<div class="close-replyform"></div>\
    	<div class="postCommentWrapper">\
    		<div class="for">\
				<textarea id="replyText"></textarea>\
			</div>\
    	</div>\
    	<span class="separator"></span>\
	  	<div class="submit">\
	  		<input type="hidden" value="" id="parentId" />\
	  		<input type="button" value="Post Reply" id="commentReplySubmit" />\
	  	</div>\
    	<div class="errorReply"></div>\
	</div>';
*/
ind.gigya.comments.singleCommentsReplyFormTemplate = '\
	<div id="commentReply" class="postComment" >\
		<div class="close-replyform"></div>\
			<ul class="comment-formatting-btns">\
	   			<li data-btn="bold" class="formatting-btn" title="Bold">Bold</li>\
	   			<li data-btn="italic" class="formatting-btn" title="Italic">Italic</li>\
			</ul>\
    	<div class="postCommentWrapper">\
    		<div class="for">\
				<textarea id="replyText"></textarea>\
			</div>\
    	</div>\
    	<span class="separator"></span>\
	  	<div class="submit">\
	  		<input type="hidden" value="" id="parentId" />\
	  		<input type="button" value="Post Reply" id="commentReplySubmit" />\
	  	</div>\
    	<div class="errorReply"></div>\
	</div>';

