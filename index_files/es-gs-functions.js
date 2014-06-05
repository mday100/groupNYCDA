var EVS = {};  
EVS.pubUrl = ind.pubUrl;

EVS.gigyaLinksToggle = function (loggedInContainer, notLoggedInContainer) {
    if (document.cookie.indexOf('gigya.userID') !== -1) {
        $(loggedInContainer).show();
        if (loggedInContainer === "#myaccountLoggedIn") {
            EVS.myaccountPopulate();
        }
        if (loggedInContainer === "#newsletterLoggedIn") {
            EVS.newsLetterPopulate();
        }
    } else {
        $(notLoggedInContainer).show();
    }
};

EVS.validateEmail = function (inputText) {
	var atpos = inputText.indexOf("@");
	var dotpos = inputText.lastIndexOf(".");
	if (atpos < 1 || dotpos < atpos+2 || dotpos+2 >= inputText.length) {
        return false;
    } else {
        return true;
    }
};

EVS.updateResponseMessage = function (field, message, isSuccess) {
	if (!isSuccess) {
		$('#'+field).empty();
		//$('#'+field).append('<div class="field-error error ui-state-highlight">' + message + '</div>');
	} else {
		$('#'+field).empty();
		$('#'+field).append('<div class="field-error error ui-state-highlight">' + message + '</div>');
	}
	setTimeout(function() {
		$(".ui-state-highlight").removeClass("ui-state-highlight");
	}, 1500 );
};

EVS.reactionClickEventResponse = function (reactionResponse){
	EVS.updateGameMechanics(reactionResponse.reaction.gameMechanicsAction);
	EVS.submitOpenGraphRequest(reactionResponse.reaction.openGraphAction, reactionResponse.context.articleUrl, reactionResponse.context.fbAppNameSpace, reactionResponse.context.openGraphStatusMessage );
	return true;
}

EVS.updateGameMechanics = function (actionId) {
	gigya.gm.notifyAction({ action: actionId });
};

EVS.updateErrorMessage = function (field, message) {
	if (field !== '#reg-message' || field !=='#petition-registration-error-message' || field !=='#petition-already-a-member-error-message' || field !== '#login-message' || field !== '#complete-reg-message' || field !== '#update-message' || field !== '#serverside-update-message') {
		$(field).parent().prepend('<div class="field-error error ui-state-highlight">' + message + '</div>');
	} else {
		$(field).text(message).addClass("ui-state-highlight");
	}
	setTimeout(function() {
		$(".ui-state-highlight").removeClass("ui-state-highlight");
	}, 1500 );
};

EVS.myaccountPopulate = function () {
	$.ajax({
		type: "GET",
		url: "/gigya/getAccountDetails.gigya",
		dataType: "json",
		success: function(response) {
			switch(response.responseCode) {
				case 0: //success
					var user = response.user;
					if (user !== null) {
						$("#myaccount-form .email").val(user.email);
						$("#myaccount-form .firstname").val(user.firstname);
						$("#myaccount-form .lastname").val(user.lastname);
						$("#myaccount-form .gender").val(user.gender);
						$("#myaccount-form .yearofbirth").val(user.yearofbirth);
						$("#myaccount-form .mobile").val(user.mobile);
						$("#myaccount-form .postcode").val(user.postcode);
						$("#myaccount-form .username").val(user.username);
						if (user.receiveReplyEmailNotifications !== null && user.receiveReplyEmailNotifications == "immediate") {
							$("#myaccount-form .receiveReplyEmailNotifications").attr("checked","checked");
						} else {
							$("#myaccount-form .receiveReplyEmailNotifications").removeAttr("checked");
						}
					}
					break;
				case -2: //User not in session
					EVS.updateErrorMessage("#update-message", "User is not in session.");
					break;
				default:
					EVS.updateErrorMessage("#update-message", "Unable to get user details");
			}
		}
	});
};

EVS.checkEmailVerificationResponse = function (successContainer, failureContainer) {
	$("div.gigya-box input[type='hidden']").parent().append("<img class='loading-progress-image' src='/images/loading.gif'/>");
	var form_data = {
		signatureToken: $.trim($("#gigya-verifyEmailBox .signatureToken").val()),
		UID: $.trim($("#gigya-verifyEmailBox .gigyaUIDValue").val()
	)};
	$.ajax({
		type: "GET",
		url: "/gigya/verifyEmailAddress.gigya",
		data: form_data,
		dataType: "json",
		async:true,
		statusCode: {
			404: function () {
				return false;
			},
			500: function () {
				return false;
			}
		},
		success: function(response) {		
			$(".loading-progress-image").remove();
			var responseCode = response.responseCode;
			if (responseCode === 0) {
			    $(successContainer).show();
			} else {
				$(failureContainer).show();
			}				
		}
	});
};

EVS.submitOpenGraphRequest = function (actionName, articleURL, appNameSpace, openGraphStatusMessageDivId, responseMessage1, responseMessage2, objectTypeName, MODE) {
	
	if (typeof(MODE)==='undefined'){
		FB.api('/me/'+appNameSpace+':'+actionName,'post',{ article: articleURL },function(response){
			if (!response || response.error) {
				EVS.updateResponseMessage(openGraphStatusMessageDivId,'Your reaction is not added to your timeline.',false);
		     } else {
	    		 EVS.updateResponseMessage(openGraphStatusMessageDivId,'Your reaction is added to your timeline.',true); 
		     }
		});		
	} else if (MODE === 'petition') {
		if (typeof(objectTypeName)==='undefined'){
			objectTypeName = 'petition';
		}
		var facebookObjectParams = {};
		facebookObjectParams[objectTypeName]=articleURL;
		FB.api('/me/'+appNameSpace+':'+actionName,'post',facebookObjectParams,function(response){
			if (!response || response.error) {
				EVS.updateResponseMessage(openGraphStatusMessageDivId,responseMessage1,false);
		     } else {
		    	EVS.updateResponseMessage(openGraphStatusMessageDivId,responseMessage2,true);
		     }
		});
	} else {
		var facebookObjectParams = {};
		facebookObjectParams[objectTypeName]=articleURL;
		FB.api('/me/'+appNameSpace+':'+actionName,'post',facebookObjectParams,function(response){
			if (!response || response.error) {
				EVS.updateResponseMessage(openGraphStatusMessageDivId,responseMessage1,false);
		     } else {
		    	EVS.updateResponseMessage(openGraphStatusMessageDivId,responseMessage2,true);
		     }
		});
	}
};

EVS.newsLetterPopulate = function () {
	$.ajax({
		type: "GET",
		url: "/gigya/getAccountDetails.gigya",
		dataType: "json",
		success: function(response) {			
			var user = response.user;
			console.log("user: " + user);
			if (user !== null) {
				/*
				if (user.receiveESOffers !== null && user.receiveESOffers == "Y") {
					$("#newsLetter-form .receiveESOffers").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveESOffers").removeAttr("checked");
				}
				if (user.receiveThirdPartyOffers !== null && user.receiveThirdPartyOffers == "Y") {
					$("#newsLetter-form .receiveThirdPartyOffers").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveThirdPartyOffers").removeAttr("checked");
				}*/
				if (user.receiveIndyOffers !== null && user.receiveIndyOffers == "Y") {
					$("#newsLetter-form .receiveIndyOffers").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveIndyOffers").removeAttr("checked");
				}
				if (user.receiveIndyThirdPartyOffers !== null && user.receiveIndyThirdPartyOffers == "Y") {
					$("#newsLetter-form .receiveIndyThirdPartyOffers").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveIndyThirdPartyOffers").removeAttr("checked");
				}
				if (user.receiveTheWeekender !== null && user.receiveTheWeekender == "Y") {
					$("#newsLetter-form .receiveTheWeekender").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveTheWeekender").removeAttr("checked");
				}
				/*
				if (user.receivePropertyNews !== null && user.receivePropertyNews == "Y") {
					$("#newsLetter-form .receivePropertyNews").attr("checked","checked");
				} else {
					$("#newsLetter-form .receivePropertyNews").removeAttr("checked");
				}
				*/
				if (user.receiveIndyVoicesNews !== null && user.receiveIndyVoicesNews == "Y") {
					$("#newsLetter-form .receiveIndyVoicesNews").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveIndyVoicesNews").removeAttr("checked");
				}
				if (user.receiveIndyHeadlinesNews !== null && user.receiveIndyHeadlinesNews == "Y") {
					$("#newsLetter-form .receiveIndyHeadlinesNews").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveIndyHeadlinesNews").removeAttr("checked");
				}
				if (user.receiveIndyFootballNews !== null && user.receiveIndyFootballNews == "Y") {
					$("#newsLetter-form .receiveIndyFootballNews").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveIndyFootballNews").removeAttr("checked");
				}
				if (user.receiveIndyTravelNews !== null && user.receiveIndyTravelNews == "Y") {
					$("#newsLetter-form .receiveIndyTravelNews").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveIndyTravelNews").removeAttr("checked");
				}
				if (user.receiveIndyCompetitionNews !== null && user.receiveIndyCompetitionNews == "Y") {
					$("#newsLetter-form .receiveIndyCompetitionNews").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveIndyCompetitionNews").removeAttr("checked");
				}
				if (user.receiveIndyArtsAndEntertainmentNews !== null && user.receiveIndyArtsAndEntertainmentNews == "Y") {
					$("#newsLetter-form .receiveIndyArtsAndEntertainmentNews").attr("checked","checked");
				} else {
					$("#newsLetter-form .receiveIndyArtsAndEntertainmentNews").removeAttr("checked");
				}
			} else {
				EVS.updateErrorMessage("#serverside-update-message", "unable to get user details");
			}				
		}
	});
};


$(function () {

	var allLoginFields = $( [] ).add( "#gigya-login-form .email" ).add( "#gigya-login-form .password" ).add( "#gigya-login-form .password2" );
	var allRegFields = $( [] ).add( "#gigyaRegForm .email" ).add( "#gigyaRegForm .password" ).add( "#gigyaRegForm .password2" );
	var allMyaccountFields = $( [] ).add("#myaccount-form .email").add("#myaccount-form .firstname").add("#myaccount-form .lastname").
									add("#myaccount-form .gender").add("#myaccount-form .yearofbirth").add("#myaccount-form .mobile").
									add("#myaccount-form .postcode").add("#myaccount-form .country").add("#myaccount-form .username").add("#myaccount-form .receiveReplyEmailNotifications");
	var allNewsLetterFields = $( [] )/*.add("#newsLetter-form .receiveESOffers").add("#newsLetter-form .receiveThirdPartyOffers").*/
									.add("#newsLetter-form .receiveIndyOffers").add("#newsLetter-form .receiveIndyThirdPartyOffers").
									add("#newsLetter-form .receiveTheWeekender")
									/*.add("#newsLetter-form .receivePropertyNews");*/
									.add("#newsLetter-form .receiveIndyVoicesNews").add("#newsLetter-form .receiveIndyHeadlinesNews")
									.add("#newsLetter-form .receiveIndyFootballNews").add("#newsLetter-form .receiveIndyTravelNews")
									.add("#newsLetter-form .receiveIndyCompetitionNews").add("#newsLetter-form .receiveIndyArtsAndEntertainmentNews");
	var allCompletRegistrationFields = $( [] ).add("#completeregistration-form .email").add("#completeregistration-form .firstname").
									add("#completeregistration-form .lastname").add("#completeregistration-form .username").
									add("#completeregistration-form .gender").add("#completeregistration-form .agreetnc").
									add("#completeregistration-form .yearofbirth").add("#completeregistration-form .mobile").
									add("#completeregistration-form .postcode").add("#completeregistration-form .country").
									/*add("#completeregistration-form .receiveESOffers").add("#completeregistration-form .receiveThirdPartyOffers").*/
									add("#completeregistration-form .receiveIndyOffers").add("#completeregistration-form .receiveIndyThirdPartyOffers").
									add("#completeregistration-form .receiveTheWeekender")
									/*.add("#completeregistration-form .receivePropertyNews");*/
									.add("#completeregistration-form .receiveIndyVoicesNews").add("#completeregistration-form .receiveIndyHeadlinesNews")
									.add("#completeregistration-form .receiveIndyFootballNews").add("#completeregistration-form .receiveIndyTravelNews")
									.add("#completeregistration-form .receiveIndyCompetitionNews").add("#completeregistration-form .receiveIndyArtsAndEntertainmentNews")
									.add("#completeregistration-form .receiveReplyEmailNotifications");
									
	var allLightRegistrationFields = $( [] ).add("#lightregistration-form .email").add("#lightregistration-form .firstname").
									add("#lightregistration-form .lastname").add("#lightregistration-form .username").
									add("#lightregistration-form .agreetnc");
									
	//var allCompleteEmailFields = $( [] ).add("#gigyaRegEmail-Form .email");
	
	var allCompleteForgotPasswordEmailFields = $( [] ).add("#gigyaForgotPassword-Form .email");
		
	// Login Form submit
	//-------------------------------
	$("#gigya-login-form #login").click(function() {
		
		$("#login-message").empty();
		$('.field-error').remove();
		
		var action = $("#gigya-login-form").attr('action');
		
		if(!EVS.validateEmail( $("#gigya-login-form .email").val())) {
			EVS.updateErrorMessage("#gigya-login-form .email", "Please enter a valid e-mail address");
			return false;
		} 
		else if ($("#gigya-login-form .password").val() === null || $("#gigya-login-form .password").val() === ""){
			EVS.updateErrorMessage("#gigya-login-form .password", "Please enter a password");
			return false;
		}
		
		// show 'loading' image
		$("div.gigya-box input[type='submit']").attr("disabled","disabled");
		$("div.gigya-box input[type='submit']").parent().append("<img class='loading-progress-image' src='/images/loading.gif'/>");
		
		var form_data = {
			email: $.trim($("#gigya-login-form .email").val()),
			password: $.trim($("#gigya-login-form .password").val()),
			is_ajax: 1
		};
		
		$.ajax({
			type: "POST",
			url: action,
			data: form_data,
			dataType: "json",
			statusCode: {
				404: function () {
					EVS.updateErrorMessage("#login-message", "Login failed. unable to connect to the server");
					$(".loading-progress-image").remove();
				},
				500: function () {
					EVS.updateErrorMessage("#login-message", "Login failed due to a server error");
					$(".loading-progress-image").remove();
				}
			},
			success: function(response){
				switch(response.responseCode) {
					case 0: //success
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
                        if (EVS.gigyaLoginFormCaller === 'external-newsletter-login-link' ) {
                            window.location.pathname = '/newsLetterPreferences/';
                        } else if(EVS.gigyaLoginFormCaller === 'petition-login-required') {
                        	$( "#gigya-loginbox").dialog( "close" );
                        	$("#GigyaShowLoggedOut").hide();
                        	$("#GigyaShowLoggedIn").hide();
                        	EVS.gigyaLinksToggle('#GigyaShowLoggedIn', '#GigyaShowLoggedOut');
                        	$("#petitionForm #petition-submission").trigger('click');
                        } else if(EVS.gigyaLoginFormCaller === 'commentLogin' && typeof(EVS.replyCommentUrl) != 'undefined' && EVS.replyCommentUrl != ''){
                        	window.location = EVS.replyCommentUrl;
                        	if (EVS.replyCommentUrl.indexOf('#') !=-1) {
                        		window.location.reload();
                        	}
                        } else {
                        	if ( window.location.href.search("accountConfirmation") !== -1) {
            					window.location = EVS.pubUrl;
            				} else {
            					window.location.reload();
            				}
                        }
                        break;
					case 1: //MissingParameter
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#login-message", "Login failed due to missing parameters, errorcode: " + response.responseCode);
						break;
					case 2: //EmailExist
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#login-message", "Email already exist!");
						break;
					case 3: //NotifyLoginFail
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#login-message", "Login failed with errorcode:" + response.responseCode);
						break;
					case 4: //GCSsetFail
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#login-message", "Login failed with errorcode: " + response.responseCode);
						break;
					case 5: //GCSsetFail
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#login-message", "The username/password combination could not be found.");
						break;
					case 10: //Incomplete Registration
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						$("#gigya-loginbox").dialog("close");
						
		                if (EVS.gigyaLoginFormCaller !== 'commentLogin') {
                            $("#completeregistration-form .email").val(response.email);
                            $("#gigya-completeregistrationbox").dialog("open");
                        } else {
                            $("#lightregistration-form .email").val(response.email);
                            $("#gigya-lightregistrationbox").dialog("open");
                        }
						break;
					case 13: //Email is not verified
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#login-message", "Your Email is not verified. Please check your Email and confirm your registration.");
						break;
					default:
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#login-message", "Regsitration Fail, errorcode: " + response.responseCode);
				}
			}
		});

		return false;
	});
	
	// Registration Form submit
	//-------------------------------
	$("#gigyaRegForm #register").click(function() {
		
		$("#reg-message").empty();
		$('.field-error').remove();
		
		var action = $("#gigyaRegForm").attr('action');
		
		if(!EVS.validateEmail( $("#gigyaRegForm .email").val())){
			EVS.updateErrorMessage("#gigyaRegForm .email", "Please enter a valid e-mail address");
			return false;
		}
		if ($("#gigyaRegForm .password").val() === null || $("#gigyaRegForm .password").val() === "" || $("#gigyaRegForm .password2").val() === null || $("#gigyaRegForm .password2").val() === "") {
			 EVS.updateErrorMessage("#gigyaRegForm .password", "Please enter a password");
			 return false;
		}
		if ($("#gigyaRegForm .password").val() !== $("#gigyaRegForm .password2").val()){
			EVS.updateErrorMessage("#gigyaRegForm .password", "The password and verified password do not match!");
			 return false;
		}
		
		// show 'loading' image
		$("div.gigya-box input[type='submit']").attr("disabled","disabled");
		$("div.gigya-box input[type='submit']").parent().append("<img class='loading-progress-image' src='/images/loading.gif'/>");					
		
		var form_data = {
			email: $.trim($("#gigyaRegForm .email").val()),
			password: $.trim($("#gigyaRegForm .password").val())
		};

		$.ajax({
			type: "POST",
			url: action,
			data: form_data,
			dataType: "json",
			statusCode: {
				404: function () {
					EVS.updateErrorMessage("#reg-message", "Registration failed. unable to connect to the server");
					$(".loading-progress-image").remove();
				},
				500: function () {
					EVS.updateErrorMessage("#reg-message", "Registration failed due to a server error");
					$(".loading-progress-image").remove();
				}
			},
			success: function(response) {
				switch(response.responseCode) {
					case 0: //success
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						$("#gigya-regbox").dialog("close");
						
		                if (EVS.gigyaLoginFormCaller !== 'commentLogin') {
                            $("#completeregistration-form .email").val(response.email);
                            $("#completeregistration-form .email").attr('readonly',true);
                            $("#completeregistration-form .password").val(form_data.password);
                            $("#completeregistration-form .password2").val(form_data.password);
                            $("#completeregistrationbox-password").css( "display","none" );
                            $("#completeregistrationbox-password2").css( "display","none" );
                            $("#completeregistration-form .password").attr('readonly',true);
                            $("#completeregistration-form .password2").attr('readonly',true);
                            $("#gigya-completeregistrationbox").dialog("open");
                        } else {
                            $("#lightregistration-form .email").val(response.email);
                            $("#lightregistration-form .email").attr('readonly',true);
                            $("#lightregistration-form .password").val(form_data.password);
                            $("#lightregistration-form .password2").val(form_data.password);
                            $("#lightregistrationform-password").css( "display","none" );
                            $("#lightregistrationform-password2").css( "display","none" );
                            $("#lightregistration-form .password").attr('readonly',true);
                            $("#lightregistration-form .password2").attr('readonly',true);
                            $("#gigya-lightregistrationbox").dialog("open");
                        }
						break;
					case 1: //MissingParameter
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#reg-message", "Please enter all the required fields");
						break;
					case 2: //EmailExist
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#reg-message", "The provided email already exists.  Please log in instead");
						break;
					case 3: //NotifyLoginFail
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#reg-message", "Sorry but the registration failed with error code: " + response.responseCode);
						break;
					case 4: //GCSsetFail
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#reg-message", "Sorry but the registration failed with error code: " + response.responseCode);
						break;
					default:
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#reg-message", "Sorry but the registration failed with error code: " + response.responseCode);
				}	
			}
		});
		return false;
	});

	$("#gigyaForgotPassword-Form #forgotPassword-email").click(function() {
				
		$("#forgotpassword-message").empty();
		$('.field-error').remove();
		
		var action = $("#gigyaForgotPassword-Form").attr('action');
		
		if ($("#gigyaForgotPassword-Form .email").val() === null || $("#gigyaForgotPassword-Form .email").val() === "") {
			EVS.updateErrorMessage("#gigyaForgotPassword-Form .email", "Please enter a valid email");
			return false;
		}
		
		// show 'loading' image
		$("div.gigya-box input[type='submit']").attr("disabled","disabled");
		$("div.gigya-box input[type='submit']").parent().append("<img class='loading-progress-image' src='/images/loading.gif'/>");		
		var form_data = {
			email: $.trim($("#gigyaForgotPassword-Form .email").val())
		};
		
		$.ajax({
			type: "POST",
			url: action,
			data: form_data,
			dataType: "json",
			statusCode: {
				404: function () {
					EVS.updateErrorMessage("#gigyaForgotPassword-Form", "Request failed. unable to connect to the server");
					$(".loading-progress-image").remove();
				},
				500: function () {
					EVS.updateErrorMessage("#gigyaForgotPassword-Form", "Request failed due to a server error");
					$(".loading-progress-image").remove();
				}
			},			
			success: function(response) {
			  switch(response.responseCode) {
				case 0: //success
					//window.location.reload ();
					$(".loading-progress-image").remove();
                    EVS.updateErrorMessage("#gigyaForgotPassword-Form", "Please check your email for the password reminder.");
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
					break;
				case 1: //MissingParameter
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#gigyaForgotPassword-Form", "Please enter all the required fields");
					break;
				case 2: //EmailDontExist
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#gigyaForgotPassword-Form", "The provided email address doesn't exist.");
					break;
				case 3: //FailedToAccessEmail
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#gigyaForgotPassword-Form", "Failed to access your email account. Please re-enter correct one.");
					break;
				case 4: //FailedToResetYourNewPassword
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#gigyaForgotPassword-Form", "Failed to reset your new password. Please try again later.");
					break;
				case 5: //FailedToSendEmail
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#gigyaForgotPassword-Form", "Password has been reset. But failed to send the mail. Please contact support.");
					break;
				default:
					EVS.updateErrorMessage("#gigyaForgotPassword-Form", "Sorry but the request failed with error code: " + response.responseCode);
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
			  }				
			}
		});

		return false;
	});


	$("#completeregistration-form #submitcompletereg").click(function() {
		
		$("#complete-reg-message").empty();
		$('.field-error').remove();
		
		var action = $("#completeregistration-form").attr('action'),
            errorDetected = false;
		
		if ($("#completeregistration-form .firstname").val() === null || $("#completeregistration-form .firstname").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#completeregistration-form .firstname", "Please enter a firstname");
		}
		if ($("#completeregistration-form .lastname").val() === null || $("#completeregistration-form .lastname").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#completeregistration-form .lastname", "Please enter a lastname");
		}
		if ($("#completeregistration-form .email").val() === null || $("#completeregistration-form .email").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#completeregistration-form .email", "Please enter a valid email");
		}
		
		if ($("#completeregistration-form .password").val() === null || $("#completeregistration-form .password").val() === "" || $("#completeregistration-form .password2").val() === null || $("#completeregistration-form .password2").val() === "") {
			 EVS.updateErrorMessage("#completeregistration-form .password", "Please enter a password");
			 EVS.updateErrorMessage("#completeregistration-form .password2", "Please confirm password");
			 errorDetected = true;
		} else if ($("#completeregistration-form .password").val() !== $("#completeregistration-form .password2").val()){
			 EVS.updateErrorMessage("#completeregistration-form .password2", "Your confirmed password does not match.");
			 errorDetected = true;
		}

		if ($("#completeregistration-form .postcode").val() === null || $("#completeregistration-form .postcode").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#completeregistration-form .postcode", "Please enter a post code");
		}
		if ($("#completeregistration-form .country").val() === null || $("#completeregistration-form .country").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#completeregistration-form .country", "Please select a country");
		}
		if ($("#completeregistration-form .gender").val() === null || $("#completeregistration-form .gender").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#completeregistration-form .gender", "Please select a gender");
		}
		if ($("#completeregistration-form .yearofbirth").val() === null || $("#completeregistration-form .yearofbirth").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#completeregistration-form .yearofbirth", "Please select your year of birth");
		}
		if ($("#completeregistration-form .username").val() === null || $("#completeregistration-form .username").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#completeregistration-form .username", "Please enter a username");
		}
		
		if (!$("#completeregistration-form .agreetnc").is(':checked')) {
            errorDetected = true;
			EVS.updateErrorMessage("#completeregistration-form .agreetnc", "Please agree to the Terms and Condition to continue");
		}

        if (errorDetected === true) {
            return false;
        }
		
		// show 'loading' image
		$("div.gigya-box input[type='submit']").attr("disabled","disabled");
		$("div.gigya-box input[type='submit']").parent().append("<img class='loading-progress-image' src='/images/loading.gif'/>");		
		var form_data = {
			firstname: $.trim($("#completeregistration-form .firstname").val()),
			lastname: $.trim($("#completeregistration-form .lastname").val()),
			email: $.trim($("#completeregistration-form .email").val()),
			password: $.trim($("#completeregistration-form .password").val()),
			gender: $.trim($("#completeregistration-form .gender").val()),
			yearofbirth: $.trim($("#completeregistration-form .yearofbirth").val()),
			country: $.trim($("#completeregistration-form .country").val()),
			mobile: $.trim($("#completeregistration-form .mobile").val()),
			postcode: $.trim($("#completeregistration-form .postcode").val()),
			username: $.trim($("#completeregistration-form .username").val()),
			suid: $.trim($("#completeregistration-form .suid").val()),
			/*receiveESOffers: $("#completeregistration-form .receiveESOffers").is(':checked') ? "N" : "Y",
			receiveThirdPartyOffers: $("#completeregistration-form .receiveThirdPartyOffers").is(':checked') ? "N" : "Y",*/
			/*receiveESOffers: $("#completeregistration-form .receiveESOffers").is(':checked') ? "Y" : "N",
			receiveThirdPartyOffers: $("#completeregistration-form .receiveThirdPartyOffers").is(':checked') ? "Y" : "N",*/
			receiveIndyOffers: $("#completeregistration-form .receiveIndyOffers").is(':checked') ? "Y" : "N",
			receiveIndyThirdPartyOffers: $("#completeregistration-form .receiveIndyThirdPartyOffers").is(':checked') ? "Y" : "N",
			/*receivePropertyNews: $("#completeregistration-form .receivePropertyNews").is(':checked') ? "Y" : "N",*/
			receiveIndyVoicesNews: $("#completeregistration-form .receiveIndyVoicesNews").is(':checked') ? "Y" : "N",
			receiveIndyHeadlinesNews: $("#completeregistration-form .receiveIndyHeadlinesNews").is(':checked') ? "Y" : "N",
			receiveIndyFootballNews: $("#completeregistration-form .receiveIndyFootballNews").is(':checked') ? "Y" : "N",
			receiveIndyTravelNews: $("#completeregistration-form .receiveIndyTravelNews").is(':checked') ? "Y" : "N",
			receiveIndyCompetitionNews: $("#completeregistration-form .receiveIndyCompetitionNews").is(':checked') ? "Y" : "N",
			receiveIndyArtsAndEntertainmentNews: $("#completeregistration-form .receiveIndyArtsAndEntertainmentNews").is(':checked') ? "Y" : "N",
			receiveReplyEmailNotifications: $("#completeregistration-form .receiveReplyEmailNotifications").is(':checked') ? "immediate" : "disabled",
			receiveTheWeekender: "Y"
		};
		
		$.ajax({
			type: "POST",
			url: action,
			data: form_data,
			dataType: "json",
			statusCode: {
				404: function () {
					EVS.updateErrorMessage("#complete-reg-message", "Registration failed. unable to connect to the server");
					$(".loading-progress-image").remove();
				},
				500: function () {
					EVS.updateErrorMessage("#complete-reg-message", "Registration failed due to a server error");
					$(".loading-progress-image").remove();
				}
			},			
			success: function(response) {
			  switch(response.responseCode) {
				case 0: //success
					//window.location.reload();
					$(".loading-progress-image").remove();
					window.location.reload();
					break;
				case 1: //MissingParameter
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#complete-reg-message", "Please enter all the required fields");
					break;
				case 2: //EmailExist
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#complete-reg-message", "The provided email already exists.  Please log in instead");
					break;
				case 3: //NotifyLoginFail
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#complete-reg-message", "Sorry but the registration failed with error code: " + response.responseCode);
					break;
				case 4: //GCSsetFail
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#complete-reg-message", "Sorry but the registration failed with error code: " + response.responseCode);
					break;
				case 7: //Show link account functionality
					var user = response.socialuser;
					//$("#gigya-completeregistrationbox").dialog("close");
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					$("#gigya-link-account-form .email").val(user.email);
					$("#gigya-link-account-form .suid").val(user.suid);
					$("#gigya-link-account").dialog("open");
					break;
				case 14: //Email confirmation sent
					var user = response.socialuser;
					//$("#gigya-completeregistrationbox").dialog("close");
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					$("#gigya-email-confirmation-message-box").dialog("open");
					break;
				default:
					EVS.updateErrorMessage("#complete-reg-message", "Sorry but the registration failed with error code: " + response.responseCode);
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
			  }				
			}
		});

		return false;		
	});

	// Light Registration Event Handler
	//----------------------------------
	$("#lightregistration-form #submitlightreg").click(function() {
		
		$("#light-reg-message").empty();
		$('.field-error').remove();
		
		var action = $("#lightregistration-form").attr('action'),
            errorDetected = false;
		
		if ($("#lightregistration-form .firstname").val() === null || $("#lightregistration-form .firstname").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#lightregistration-form .firstname", "Please enter a firstname");
		}
		if ($("#lightregistration-form .lastname").val() === null || $("#lightregistration-form .lastname").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#lightregistration-form .lastname", "Please enter a lastname");
		}
		if ($("#lightregistration-form .email").val() === null || $("#lightregistration-form .email").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#lightregistration-form .email", "Please enter a valid email");
		}
		
		if ($("#lightregistration-form .password").val() === null || $("#lightregistration-form .password").val() === "" || $("#lightregistration-form .password2").val() === null || $("#lightregistration-form .password2").val() === "") {
			 EVS.updateErrorMessage("#lightregistration-form .password", "Please enter a password");
			 EVS.updateErrorMessage("#lightregistration-form .password2", "Please confirm password");
			 errorDetected = true;
		} else if ($("#lightregistration-form .password").val() !== $("#lightregistration-form .password2").val()){
			 EVS.updateErrorMessage("#lightregistration-form .password2", "Your confirmed password does not match.");
			 errorDetected = true;
		}
		
		if ($("#lightregistration-form .username").val() === null || $("#lightregistration-form .username").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#lightregistration-form .username", "Please enter a username");
		}
		
		if (!$("#lightregistration-form .agreetnc").is(':checked')) {
            errorDetected = true;
			EVS.updateErrorMessage("#lightregistration-form .agreetnc", "Please agree to the Terms and Condition to continue");
		}

        if (errorDetected === true) {
            return false;
        }
		
		// show 'loading' image
		$("div.gigya-box input[type='submit']").attr("disabled","disabled");
		$("div.gigya-box input[type='submit']").parent().append("<img class='loading-progress-image' src='/images/loading.gif'/>");		
		var form_data = {
			firstname: $.trim($("#lightregistration-form .firstname").val()),
			lastname: $.trim($("#lightregistration-form .lastname").val()),
			email: $.trim($("#lightregistration-form .email").val()),
			password: $.trim($("#lightregistration-form .password").val()),
			username: $.trim($("#lightregistration-form .username").val()),
			suid: $.trim($("#lightregistration-form .suid").val()),
			/*receiveESOffers: "N",
			receiveThirdPartyOffers: "N",*/
			receiveIndyOffers: "N",
			receiveIndyThirdPartyOffers: "N",
			/*receivePropertyNews: "N",*/
			receiveIndyVoicesNews: "N",
			receiveIndyHeadlinesNews: "N",
			receiveIndyFootballNews: "N",
			receiveIndyTravelNews: "N",
			receiveIndyCompetitionNews: "N",
			receiveIndyArtsAndEntertainmentNews: "N",
			receiveReplyEmailNotifications: "immediate",
			receiveTheWeekender: "N"
		};
		
		$.ajax({
			type: "POST",
			url: action,
			data: form_data,
			dataType: "json",
			statusCode: {
				404: function () {
					EVS.updateErrorMessage("#light-reg-message", "Registration failed. unable to connect to the server");
					$(".loading-progress-image").remove();
				},
				500: function () {
					EVS.updateErrorMessage("#light-reg-message", "Registration failed due to a server error");
					$(".loading-progress-image").remove();
				}
			},			
			success: function(response) {
			  switch(response.responseCode) {
				case 0: //success
					//window.location.reload();
					$(".loading-progress-image").remove();
					window.location.reload();
					break;
				case 1: //MissingParameter
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#light-reg-message", "Please enter all the required fields");
					break;
				case 2: //EmailExist
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#light-reg-message", "The provided email already exists.  Please log in instead");
					break;
				case 3: //NotifyLoginFail
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#light-reg-message", "Sorry but the registration failed with error code: " + response.responseCode);
					break;
				case 4: //GCSsetFail
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					EVS.updateErrorMessage("#light-reg-message", "Sorry but the registration failed with error code: " + response.responseCode);
					break;
				case 7: //Show link account functionality
					var user = response.socialuser;
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					$("#gigya-link-account-form .email").val(user.email);
					$("#gigya-link-account-form .suid").val(user.suid);
					$("#gigya-link-account").dialog("open");
					break;
				case 14: //Email confirmation sent
					var user = response.socialuser;
					//$("#gigya-completeregistrationbox").dialog("close");
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
					$("#gigya-email-confirmation-message-box").dialog("open");
					break;
				default:
					EVS.updateErrorMessage("#light-reg-message", "Sorry but the registration failed with error code: " + response.responseCode);
					$(".loading-progress-image").remove();
					$("div.gigya-box input[type='submit']").removeAttr("disabled");
			  }				
			}
		});

		return false;		
	});


	$("#myaccount-form #submitaccupdate").click(function() {
		
		$("#update-message").empty();
		$('.field-error').each(function () {
            $(this).remove();
        });

		var action = $("#myaccount-form").attr('action'),
            errorDetected = false;

		if ($("#myaccount-form .firstname").val() === null || $("#myaccount-form .firstname").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#myaccount-form .firstname", "Please enter a firstname");
		}
		if ($("#myaccount-form .lastname").val() === null || $("#myaccount-form .lastname").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#myaccount-form .lastname", "Please enter a lastname");
		}
		if ($("#myaccount-form .email").val() === null || $("#myaccount-form .email").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#myaccount-form .email", "Please enter a valid email");
		}
		if ($("#myaccount-form .password").val() !== "" && ($("#myaccount-form .password").val() !== $("#myaccount-form .password2").val())) {
            errorDetected = true;
			EVS.updateErrorMessage("#myaccount-form .password", "Please enter matching passwords or leave both blank if you don't want to update your password");
		}
		if ($("#myaccount-form .postcode").val() === null || $("#myaccount-form .postcode").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#myaccount-form .postcode", "Please enter a post code");
		}
		if ($("#myaccount-form .username").val() === null || $("#myaccount-form .username").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#myaccount-form .username", "Please enter a username");
		}
		if ($("#myaccount-form .country").val() === null || $("#myaccount-form .country").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#myaccount-form .country", "Please select a country");
		}
		if ($("#myaccount-form .gender").val() === null || $("#myaccount-form .gender").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#myaccount-form .gender", "Please select a gender");
		}
		if ($("#myaccount-form .yearofbirth").val() === null || $("#myaccount-form .yearofbirth").val() === "") {
            errorDetected = true;
			EVS.updateErrorMessage("#myaccount-form .yearofbirth", "Please select your year of birth");
        }

        if (errorDetected === true) {
            return false;
        }

		// show 'loading' image
		$("div.gigya-box input[type='submit']").attr("disabled","disabled");
		$("div.gigya-box input[type='submit']").parent().append("<img class='loading-progress-image' src='/images/loading.gif'/>");		
		
		var form_data = {
			password: $.trim($("#myaccount-form .password").val()),
			password2: $.trim($("#myaccount-form .password2").val()),
			firstname: $.trim($("#myaccount-form .firstname").val()),
			lastname: $.trim($("#myaccount-form .lastname").val()),
			email: $.trim($("#myaccount-form .email").val()),
			gender: $.trim($("#myaccount-form .gender").val()),
			yearofbirth: $.trim($("#myaccount-form .yearofbirth").val()),
			country: $.trim($("#myaccount-form .country").val()),
			mobile: $.trim($("#myaccount-form .mobile").val()),
			receiveReplyEmailNotifications: $("#myaccount-form .receiveReplyEmailNotifications").is(':checked') ? "immediate" : "disabled",
			postcode: $.trim($("#myaccount-form .postcode").val()),
			username: $.trim($("#myaccount-form .username").val())
		};
		
		$.ajax({
			type: "POST",
			url: action,
			data: form_data,
			success: function(response){
				$(".loading-progress-image").remove();
				$("div.gigya-box input[type='submit']").removeAttr("disabled");
				$("<p class='success-message'>Details updated successfully</p>").insertBefore("#submitaccupdate").hide().show('slow');
				setTimeout(function() { $(".success-message").hide('slow', function() {$(this).remove;}) }, 3000);
			}
		});

		return false;
	});	

	$("#myaccount-form #submitaccdelete").click(function() {
		$( "#dialog-confirm-delete" ).dialog( "open" );
		return false;
	});

	$( "#dialog-confirm-delete" ).dialog({
		autoOpen: false,
		resizable: false,
		height:140,
		width: 325,
		modal: true,
		dialogClass: "delete-account-dialogs",
		buttons: {
			"Delete account": function() {
				$.ajax({
					type: "POST",
					url: "/gigya/deleteAccount.gigya",
					data: {suid: $.cookie("gigya.userID")},
					dataType: "json",
					success: function(response){
						if( response.responseCode === 0 ) {
							$( "#dialog-delete-success" ).dialog( "open" );
						} else {
							$( "#dialog-delete-error" ).dialog( "open" );
						}
					},
					error: function(){
						$( "#dialog-delete-error" ).dialog( "open" );
					}
				});				
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});

	$( "#dialog-delete-success" ).dialog({
		autoOpen: false,
		modal: true,
		dialogClass: "delete-account-dialogs",
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
				window.location.replace(ind.pubUrl);
			}
		}
	});		

	$( "#dialog-delete-error" ).dialog({
		autoOpen: false,
		modal: true,
		dialogClass: "delete-account-dialogs",
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
			}
		}
	});	
		
	$("#newsLetter-form #submitaccupdate").click(function() {
		
		$("#serverside-update-message").empty();
		$('.field-error').remove();

		var action = $("#newsLetter-form").attr('action');

		// show 'loading' image
		$("div.gigya-box input[type='submit']").attr("disabled","disabled");
		$("div.gigya-box input[type='submit']").parent().append("<img class='loading-progress-image' src='/images/loading.gif'/>");		
		
		var form_data = {
			/*receiveESOffers: $("#newsLetter-form .receiveESOffers").is(':checked') ? "Y" : "N",
			receiveThirdPartyOffers: $("#newsLetter-form .receiveThirdPartyOffers").is(':checked') ? "Y" : "N",*/
			receiveIndyOffers: $("#newsLetter-form .receiveIndyOffers").is(':checked') ? "Y" : "N",
			receiveIndyThirdPartyOffers: $("#newsLetter-form .receiveIndyThirdPartyOffers").is(':checked') ? "Y" : "N",
			receiveTheWeekender: $("#newsLetter-form .receiveTheWeekender").is(':checked') ? "Y" : "N",
			/*receivePropertyNews: $("#newsLetter-form .receivePropertyNews").is(':checked') ? "Y" : "N"*/
			receiveIndyVoicesNews: $("#newsLetter-form .receiveIndyVoicesNews").is(':checked') ? "Y" : "N",
			receiveIndyHeadlinesNews: $("#newsLetter-form .receiveIndyHeadlinesNews").is(':checked') ? "Y" : "N",
			receiveIndyFootballNews: $("#newsLetter-form .receiveIndyFootballNews").is(':checked') ? "Y" : "N",
			receiveIndyTravelNews: $("#newsLetter-form .receiveIndyTravelNews").is(':checked') ? "Y" : "N",
			receiveIndyCompetitionNews: $("#newsLetter-form .receiveIndyCompetitionNews").is(':checked') ? "Y" : "N",
			receiveIndyArtsAndEntertainmentNews: $("#newsLetter-form .receiveIndyArtsAndEntertainmentNews").is(':checked') ? "Y" : "N"
		};
		
		$.ajax({
			type: "POST",
			url: action,
			data: form_data,
			success: function(response){
				$(".loading-progress-image").remove();
				$("div.gigya-box input[type='submit']").removeAttr("disabled");
				$("<p class='success-message'>Details updated successfully</p>").insertBefore("#submitaccupdate").hide().show('slow');
				setTimeout(function() { $(".success-message").hide('slow', function() {$(this).remove;}) }, 3000);
			}
		});

		return false;
	});	

	$("#gigya-link-account-form #link").click(function() {
		$("#link-message").empty();
		$('.field-error').remove();
		
		var action = $("#gigya-link-account-form").attr('action');
		
		if(!EVS.validateEmail( $("#gigya-link-account-form .email").val())) {
			EVS.updateErrorMessage("#gigya-link-account-form .email", "Please enter a valid e-mail address");
			return false;
		} 
		else if ($("#gigya-link-account-form .password").val() === null || $("#gigya-link-account-form .password").val() === ""){
			EVS.updateErrorMessage("#gigya-link-account-form .password", "Please enter a password");
			return false;
		}
		
		// show 'loading' image
		$("div.gigya-box input[type='submit']").attr("disabled","disabled");
		$("div.gigya-box input[type='submit']").parent().append("<img class='loading-progress-image' src='/images/loading.gif'/>");
		
		var form_data = {
			email: $.trim($("#gigya-link-account-form .email").val()),
			password: $.trim($("#gigya-link-account-form .password").val()),
			suid: $.trim($("#gigya-link-account-form .suid").val())
		};
		
		$.ajax({
			type: "POST",
			url: action,
			data: form_data,
			dataType: "json",
			statusCode: {
				404: function () {
					EVS.updateErrorMessage("#link-message", "Account linking failed; unable to connect to the server");
					$(".loading-progress-image").remove();
				},
				500: function () {
					EVS.updateErrorMessage("#link-message", "Account linking failed due to a server error");
					$(".loading-progress-image").remove();
				}
			},
			success: function(response){
				switch(response.responseCode) {
					case 0: //success
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						window.location.reload();
						break;
					case 1: //MissingParameter
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#link-message", "Linking accounts failed due to missing parameters, errorcode: " + response.responseCode);
						break;
					case 2: //EmailExist
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#link-message", "Email already exist!");
						break;
					case 3: //NotifyLoginFail
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#link-message", "Linking accounts failed with errorcode:" + response.responseCode);
						break;
					case 4: //GCSsetFail
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#link-message", "Linking accounts failed with errorcode: " + response.responseCode);
						break;
					case 5: //GCSsetFail
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#link-message", "The username/password combination could not be found.");
						break;						
					default:
						$(".loading-progress-image").remove();
						$("div.gigya-box input[type='submit']").removeAttr("disabled");
						EVS.updateErrorMessage("#link-message", "Linking accounts Fail, errorcode: " + response.responseCode);
				}
			}
		});

		return false;		
	});
	
	// Gigya Registration box
	$("#gigya-regbox").dialog({
		autoOpen: false,
		height: 'auto',
		width: 'auto',
		modal: true,
		resizable: false,
        zIndex: 99999,
        open: function(){
			$("#reg-email").blur();
		},
		close: function() {
			$('.field-error').remove();
			$("#reg-message").empty();
			$(".loading-progress-image").remove();
		}
	});
	
	// Gigya ForgotPassword box
	$("#gigya-forgot-password").dialog({
		autoOpen: false,
		height: 'auto',
		width: 'auto',
		modal: true,
		resizable: true,
        zIndex: 99999,
		close: function() {
			allCompleteForgotPasswordEmailFields.val("").removeClass( "ui-state-error" );
			$("#gigya-forgot-password #forgotpassword-message").empty();
			$(".loading-progress-image").remove();
		}
	});
	
	$("#petitionSuccessMsgBox").dialog({
		autoOpen: false,
		height: 'auto',
		width: 'auto',
		modal: true,
		resizable: true,
        zIndex: 99999,
		close: function() {
			$("#petitionSuccessMsgBox #petition-success-message").empty();
			$("#petitionSuccessMsgBox #opengraph-petition-success-message").empty();
			$(".loading-progress-image").remove();
				window.location.reload();
		}
	});

	$( "#register-link" )
		.click(function() {
			$( "#gigya-regbox").dialog( "open" );
		});
	
	$( "#external-register-link" )
		.click(function() {
			$( "#gigya-regbox").dialog( "open" );
		});
	
	$( "#gigya-join-now-link" ).click(function() {
		$( "#gigya-loginbox").dialog( "close" );
		$( "#gigya-regbox").dialog( "open" );
	});
	
	$( "#gigya-forgot-password-link" ).click(function() {
		$( "#gigya-loginbox").dialog( "close" );
		$( "#gigya-forgot-password").dialog( "open" );
	});
	
	$("#gigya-loginbox").dialog({
		autoOpen: false,
		height: 'auto',
		width: 'auto',
		modal: true,
		resizable: false,
        zIndex: 99999,
		open: function(){
			$("#log-email").blur();
		},
		close: function() {
			allLoginFields.val( "" ).removeClass( "ui-state-error" );
			$("#login-message").empty();
			$(".loading-progress-image").remove();
		}		
	});
	
	$(".login-link").click(function (e) {
        EVS.gigyaLoginFormCaller = $(e.target).attr('id');
		$( "#gigya-loginbox").dialog( "open" );
	});
	
	$("#external-login-link").click(function (e) {
        EVS.gigyaLoginFormCaller = $(e.target).attr('id');
		$( "#gigya-loginbox").dialog( "open" );
	});
	
	$(".external-newsletter-login-link").click(function (e) {
		if (document.cookie.indexOf('gigya.userID') !== -1) {
			window.location.pathname = '/newsLetterPreferences/';
		} else {
	        EVS.gigyaLoginFormCaller = "external-newsletter-login-link";
			$( "#gigya-loginbox").dialog( "open" );
		}
	});
	
	$(".external-newsletter-register-link").click(function (e) {
          if (document.cookie.indexOf('gigya.userID') !== -1) {
               window.location.pathname = '/newsLetterPreferences/';
          } else {
               EVS.gigyaLoginFormCaller = "external-newsletter-login-link";
               $( "#gigya-regbox").dialog( "open" );
          }
     });
	
	$("#gigya-signin-link").click(function (e) {
		$( "#gigya-regbox").dialog( "close" );
		$( "#gigya-loginbox").dialog( "open" );
	});	
		
	$("#gigya-email-confirmation-message-box").dialog({
		autoOpen: false,
		height: 'auto',
		width: 'auto',
		modal: true,
		resizable: false,
        zIndex: 99999,
		close: function() {
			allCompletRegistrationFields.val("").removeClass( "ui-state-error" );
			$(".loading-progress-image").remove();
			$("#gigya-completeregistrationbox").dialog("close");
		}		
	});
	
	$("#gigya-flag-confirmation-message-box").dialog({
		autoOpen: false,
		height: 'auto',
		width: 'auto',
		modal: true,
		resizable: false,
        zIndex: 99999,
		close: function() {
			$(".loading-progress-image").remove();
			$("#gigya-flag-confirmation-message-box").hide();
		}		
	});
	

	$("#gigya-completeregistrationbox").dialog({
		autoOpen: false,
		height: 'auto',
		width: 'auto',
		modal: true,
		resizable: false,
        zIndex: 99999,
		close: function() {
			allCompletRegistrationFields.val("").removeClass( "ui-state-error" );
			$("#gigya-completeregistrationbox #complete-reg-message").empty();
			$(".loading-progress-image").remove();
			var form_data = {suid: $.trim($("#completeregistration-form .suid").val())};
			$.ajax({
				type: "GET",
				url: "/gigya/logout.gigya",
				dataType: "json",
	            cache: false,
	            data:form_data,
	            async: false,
				success: function(response){
					if ( window.location.href.search("accountConfirmation") !== -1 || window.location.href.search("myaccount") !== -1 || window.location.href.search("newsLetterPreferences") !== -1 ) {
						window.location = EVS.pubUrl;
					} else {
						window.location.reload();
					}
				}
			});
		}		
	});	
	
	$("#gigya-lightregistrationbox").dialog({
		autoOpen: false,
		height: 'auto',
		width: 'auto',
		modal: true,
		resizable: false,
        zIndex: 99999,
		close: function() {
			allLightRegistrationFields.val("").removeClass( "ui-state-error" );
			$("#gigya-lightregistrationbox #light-reg-message").empty();
			$(".loading-progress-image").remove();
			var form_data = {suid: $.trim($("#lightregistration-form .suid").val())};
			$.ajax({
				type: "GET",
				url: "/gigya/logout.gigya",
				dataType: "json",
	            cache: false,
	            data:form_data,
	            async: false,
				success: function(response){
					if (window.location.href.search("accountConfirmation") !== -1 || window.location.href.search("myaccount") !== -1 || window.location.href.search("newsLetterPreferences") !== -1 ) {
						window.location = EVS.pubUrl;
					} else {
						window.location.reload();
					}
				}
			});
		}		
	});	
	
	$("#gigya-link-account").dialog({
		autoOpen: false,
		height: 'auto',
		width: 'auto',
		modal: true,
		resizable: false,
        zIndex: 99999,
		close: function() {
			allCompletRegistrationFields.val("").removeClass( "ui-state-error" );
			$("#link-message").empty();
			$(".loading-progress-image").remove();
			var form_data = {suid: $.trim("logout")};
			$.ajax({
				type: "GET",
				url: "/gigya/logout.gigya",
				dataType: "json",
	            cache: false,
	            data:form_data,
				success: function(response){
					if ( window.location.href.search("myaccount") !== -1 || window.location.href.search("newsLetterPreferences") !== -1 ) {
						window.location = EVS.pubUrl;
					} else {
						window.location.reload();
					}
				}
			});
		}		
	});		
	
	$("#logout-link").click(function() {
		var form_data = {suid: $.trim("logout")};
		$.ajax({
			type: "GET",
			url: "/gigya/logout.gigya",
			dataType: "json",
            cache: false,
            data:form_data,
			success: function(response){
				if ( window.location.href.search("myaccount") !== -1 || window.location.href.search("newsLetterPreferences") !== -1 ) {
					window.location = EVS.pubUrl;
				} else {
					window.location.reload();
				}
			}
		});		
	});
	
	$("#external-logout-link").click(function() {
		var form_data = {suid: $.trim("logout")};
		$.ajax({
			type: "GET",
			url: "/gigya/logout.gigya",
			dataType: "json",
			data:form_data,
			success: function(response){
				if ( window.location.href.search("myaccount") !== -1 || window.location.href.search("newsLetterPreferences") !== -1 ) {
					window.location = EVS.pubUrl;
				} else {
					window.location.reload();
				}
			}
		});		
	});
	
	$("#gigya-reaction-plugin-share-box").dialog({
			autoOpen: false,
			height: 'auto',
			width: 'auto',
			modal: true,
			resizable: false,
		    zIndex: 99999,
			close: function() {
				$("openGraphStatus").empty();
				$("#gigya-reaction-plugin-share-box").dialog("close");
			}		
		});
	
});
