define(function(){
	return {
		loadingTemplate: "<div class=\"second-gallery-loading-div\"><em>Loading gallery</em><img src=\"{{serverPath}}/images/gallery/ajax-loader.gif\" alt=\"...\"></div>",
		slidesTemplate: "<div class=\"second-gallery-wrapper hide\">" +
						"<div class=\"second-gallery-dimmer\"></div>" + 
						"<div class=\"second-gallery-slides-container\">" +
						"<div class=\"second-gallery-slides-title\">{{title}}</div>" +
						"<span class=\"second-gallery-slide-counter\"></span>" +
						/*"<div class=\"second-gallery-slides-description\">{{{description}}}</div>" +*/
						"<div class=\"second-gallery-slides-wrapper\" data-defaultHeight=\"{{defaultHeight}}\">" +
						"<ul class=\"second-gallery-slides\">" +
						"{{#foreach slides}}" + 
						"<li class=\"second-gallery-slide{{#ifCond image_num 0}} active{{/ifCond}}\" data-slide=\"{{image_num}}\"><img {{#lt image_num 3}} src=\"{{image}}\" {{/lt}} data-src=\"{{image}}\" alt=\"{{title}}\" data-originalImageWidth=\"{{originalImageWidth}}\" data-originalImageHeight=\"{{originalImageHeight}}\" /></li>" +
						"{{/foreach}}" +						
						"</ul></div>" +
						"<div class=\"second-gallery-nav-prev\"><a class=\"second-gallery-leftarrow\">Prev</a></div>" +
						"<div class=\"second-gallery-nav-next\"><a class=\"second-gallery-rightarrow\">Next</a></div>" +
						"<div class=\"second-gallery-thumbs-wrapper\">" +
						"<ul class=\"second-gallery-thumbs\">" +
						"{{#foreach slides}}" + 
						"<li class=\"second-gallery-thumb\" data-thumb=\"{{image_num}}\"><img src=\"{{thumb}}\" alt=\"{{title}}\" /></li>" +
						"{{/foreach}}" +					
						"</ul></div></div></div>" +
						"<div class=\"second-gallery-slide-info hide\"><div class=\"second-gallery-slide-info-inner\"></div></div>",
		slidesLiTemplate: "{{#foreach slides}}" + 
						"<li class=\"second-gallery-slide{{#ifCond image_num 0}} active{{/ifCond}}\" data-slide=\"{{image_num}}\"><img src=\"{{image}}\" alt=\"{{title}}\" /></li>" +
						"{{/foreach}}",
		mslidesTemplate: "<div class=\"second-mgallery-slides-title\">{{title}}</div>" +
						 "<div class=\"dxwSlideMenu\" id=\"imageGalleryMenu\">" +
						 "<ul class=\"dxwSlideMenuItems\">" +
						 "{{#foreach slides}}" + 
						 "<li><a data-target=\"#galleryImage{{index}}\" href=\"{{../galleryURL}}?action=gallery&ino={{image_num}}\"><img height=\"100\" width=\"80\" src=\"{{thumb}}\" alt=\"{{title}}\" /></a></li>" +
						 "{{/foreach}}" +
						 "<li><a data-target=\"#galleryImage{{loadMoreIndx}}\" href=\"{{galleryURL}}?action=gallery&ino={{loadMoreIndx}}\"><img height=\"100\" width=\"80\" src=\"{{serverPath}}/images/gallery/load-more.gif\" alt=\"load more\" /></a></li>" +
						 "</ul>" +
						 "<span class=\"dxwSlideMenuNav\">" +
						"<span class=\"dxwSlideMenuNavLeft dxwStateDisabled\">Left</span>" +
						"<span class=\"dxwSlideMenuNavRight dxwStateDisabled\">Right</span>" + 
						"</span>" +
						"</div>",
		infoTemplate:   "<div id=\"second-gallery-share-btns\" class=\"second-gallery-share-btns\"></div>" +
						"<script type=\"text/javascript\">" +
						"var act_gigya = new gigya.socialize.UserAction();" +
						"act_gigya.setLinkBack(\"{{slideURL}}\");" +
						"act_gigya.setTitle(\"{{{stripHtml title}}}\");" +
						"act_gigya.setDescription(\"{{{stripHtml caption}}}\");" +
						"act_gigya.addMediaItem({ type: \"image\", src: \"{{image}}\", href: \"{{slideURL}}\" });" +
						"var showShareBarUI_params= " +
						"{ userAction: act_gigya, shortURLs: \"never\", showTooltips: true, containerID: \"second-gallery-share-btns\", showCounts: \"right\", iconsOnly: true," +
						"shareButtons: [" +
						"{provider:\"facebook\", tooltip:\"Share on Facebook\", enableCount:\"false\", iconImgUp: \"http://www.independent.co.uk/independent.co.uk/assets/images/share-btns/facebook.png\", iconImgOver: \"http://www.independent.co.uk/independent.co.uk/assets/images/share-btns/facebookRoll.png\"}," +
						"{ provider:\"twitter\", tooltip:\"Share on Twitter\", enableCount:\"false\", via: \"Independent\", iconImgUp: \"http://www.independent.co.uk/independent.co.uk/assets/images/share-btns/twitter.png\", iconImgOver: \"http://www.independent.co.uk/independent.co.uk/assets/images/share-btns/twitterRoll.png\"}," +
						"{provider:\"googleplus\", tooltip:\"Share on Google+\", enableCount:\"false\", iconImgUp: \"http://www.independent.co.uk/independent.co.uk/assets/images/share-btns/google.png\", iconImgOver: \"http://www.independent.co.uk/independent.co.uk/assets/images/share-btns/googleRoll.png\"}" +
						"]};" +
						"gigya.socialize.showShareBarUI(showShareBarUI_params);" +
						"</script>" +
						"<span class=\"second-gallery-fullscreen-btn\" title=\"Fullscreen\" onClick=\"_gaq.push(['_trackEvent', 'InlineGallery', 'Fullscreen']);\"></span>" +
						"<span class=\"second-gallery-close-fullscreen\" title=\"Close\"></span>" +
						"<div class=\"second-gallery-slide-title\">{{{title}}}</div>" +
						"<div class=\"second-gallery-slide-caption\">{{{caption}}}</div>" +
						"<span class=\"second-gallery-slide-credit\">{{{credits}}}</span>",
		slidesCountTemplate: "{{image_num}} of {{totalSlides}}",
		mpuTemplate: "<div id=\"second-gallery-mpu\" class=\"second-gallery-mpu\">" +
					 /*"<script type=\"text/javascript\">" +
					 "var dartAdSize = \"{{dartAdSize}}\";" +
					 "var dartTile = \"{{dartTile}}\";" +
					 "</script>" +
					 "<iframe width=\"300\" height=\"250\" title=\"Ad\" marginwidth=\"0\" marginheight=\"0\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"no\" id=\"\" src=\"{{serverPath}}/data/adpage.html\"></iframe>" +*/
					 "</div>"
	};
});