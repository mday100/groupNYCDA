/*************************************************************************************************************
* Author: Melwyn Furtado
* Version: 1.0
* Description: jQuery image gallery module
* Dependencies: jQuery 1.4.4+, JSTween 1.1, Handlebars 1.0, RequireJS 2.1.4, Modernizr 2.6.2
**************************************************************************************************************/

define(["modernizr", "handlebars", "templates/galleryTpl2", "modules/utility", "modules/registerHelper", "modules/jstween-1.1.min"], function(Modernizr, Handlebars, galleryTpl2, utility) {
	var SECONDGallery = function (options) {
		var self = this,
			galleryTimeOut2 = 0,
			slideInfoActive = false, historyPushState = true, fullscreenModeInit = false, fullscreenMode = false,
			slideNext2Prev = false, action, $thisGallery, template, freqTimeout, timeout_interval = 250, mpuLoaded = false,
			galleryMpu, userPageViewCount = 0,
			defaults = {
				debug: true,				// Set true for development environment
				autoplay: true,				// Slideshow starts playing automatically
				slide_interval: 0.25,		// Time between transitions
				serverPath: "/independent.co.uk/assets",
				serverAPIURL: "/?service=gallery&galleryID=",
				dataFile: "gallery2.json",	// Used only for localhost to simulate gallery feed
				dataType: "json",
				method: "GET",
				defaultHeight: 575,
				mobileThumbsCnt: 5,
				success_callback: function() {},
				error_callback: function( textStatus, errorThrown, galleryObj) { 
									debug(textStatus);
									debug(errorThrown);
									hideLoader2(galleryObj);
								},
				timeout: 5000,
				ui: {
					ctrClass: "second-gallery",
					galleryWrapperClass: "second-gallery-wrapper",
					dimmerClass: "second-gallery-dimmer",
					activeClass: "active",				
					slidesCtrClass: "second-gallery-slides-container",
					slidesWrapperClass: "second-gallery-slides-wrapper",			
					slidesUlCtrClass: "second-gallery-slides",
					slideClass: "second-gallery-slide",
					slideInfoCtrClass: "second-gallery-slide-info",
					slideInfoInnerCtrClass: "second-gallery-slide-info-inner",
					slidesCounterClass: "second-gallery-slide-counter",
					slidesTitleClass: "second-gallery-slides-title",
					slidesDescClass: "second-gallery-slides-description",
					slideLeftArrowClass: "second-gallery-leftarrow",
					slideRightArrowClass: "second-gallery-rightarrow",
					thumbClass: "second-gallery-thumb",
					thumbsCtrClass: "second-gallery-thumbs",
					thumbsWrapperClass: "second-gallery-thumbs-wrapper",
					loaderClass: "second-gallery-loading-div",
					mpuClass: "second-gallery-mpu",
					fullscreenBtnClass: "second-gallery-fullscreen-btn",
					fullscreenCloseBtnClass: "second-gallery-close-fullscreen"				
				},
				ad: {
					dartAdSize: "sz=300x250",
					dartTile: "tile=3"		
				}
			},

		settings2 = $.extend( {}, defaults, options ),

		// Private functions
		debug = function ( $obj ) {
			if( window.console && window.console.log && settings2.debug ) {
				window.console.log( $obj );
			}
		},

		getGalleryCtrs = function () {
			// Make classnames to use css prefixes
			for( key in settings2.ui ) {
				settings2.ui[key] = "." + settings2.ui[key]; 
			};

			// Set $.browser.device to true if mobile
			setDeviceType();

			$( settings2.ui.ctrClass ).each(function() {
				var $this = $( this ), aObj, tmp;
				if ( $.browser.device ) {
					aObj = $this.find("a");
					tmp = aObj.attr("href");
					aObj.attr("href", tmp + "?action=gallery&ino=1");
				} else {
					showLoader($this);
					settings2.success_callback = buildGalleryHtml;
					getData($this);
				}
			});
		},

		buildGalleryHtml = function (data, galleryObj) {
			var slidesHtml; var slideNumCount; 

			// Make gallery JSON available to all functions
			settings2.data = data;

			//$thisGallery = $( "#gallery-" + settings2.data.gallery_id );
			$thisGallery = galleryObj;

			// Render gallery based on container height
			data.defaultHeight = settings2.defaultHeight;

			// build gallery slides list 
          	template = Handlebars.compile( galleryTpl2.slidesTemplate );
          	slidesHtml = template( data );
          	$thisGallery.append( slidesHtml );

          	// check if the first 3 images loaded
          	slideNumCount = data.slides.length < 2 ? data.slides.length - 1 : 2;

			$thisGallery.find("li[data-slide=\"" + slideNumCount + "\"] img").load(function() {
				hideLoader2($thisGallery);
				$(settings2.ui.galleryWrapperClass).show();				
				setSlideParams2();
				setSlideCounter2();
				setCurrentThumb2();
				bindGalleryEvents2();
				resizeImages2();

				// Hide or show left/right chevrons
				showHideChevrons2();				
				if ( utility.getURLParameter('slide_num') !== "null" ) {
					// save action before its overwritten for defaulting view to fullscreen
					action = utility.getURLParameter('action');
					actionSlideNum = getCurrentSlideNumber2FromURL2();
					slideTo2(actionSlideNum);
					showSlideInfo2();
					showDimmer2();					
					if( action === 'fullscreen' ) {
						showFullScreen2(actionSlideNum);
						loadMPU2();
					}
				}
			});
		},

		updateGallerySlide = function (State) {
			if ( utility.getURLParameter('slide_num') !== "null" ) {
				historyPushState = false;				
				slideTo2(getCurrentSlideNumber2FromURL2());
			}
		},

		bindGalleryEvents2 = function () {
		  	// Content update and back/forward button handler
		  	/*History.Adapter.bind(window, 'statechange', function() {
				// Log the State
				var State = History.getState(),
					currentIndex, internal;
				//History.log('statechange:', State.data, State.title, State.url);

			    currentIndex = History.getCurrentIndex();
			    internal = (History.getState().data._index == (currentIndex - 1));
			    if (!internal) {
					updateGallerySlide(State);
			    }
		  	});*/

		  	// Capture keyboard events and action accordingly
			$(document).keydown(function(e) {
				if( !slideInfoActive ) return;
			    switch ( e.keyCode ) { 
					case 37:
					case 38:
						if( getCurrentSlideNumber2() === 1 ) return;
						freqSetTimeout(slidePrev2);
						slideNext2Prev = true;
					break;
					case 39:
					case 40:
						if( ( getCurrentSlideNumber2() ) === settings2.totalSlides ) return;				
						freqSetTimeout(slideNext2);
						slideNext2Prev = true;
					break;
					case 27:
						hideDimmer2();
					break;
			    }
			});

			$(settings2.ui.slideLeftArrowClass).bind("click", function(e) {
				if( getCurrentSlideNumber2() === 1 ) return;
				freqSetTimeout(slidePrev2);
				slideNext2Prev = true;
			});

			$(settings2.ui.slideRightArrowClass).bind("click", function(e) {
				if( ( getCurrentSlideNumber2() ) === settings2.totalSlides ) return;				
				freqSetTimeout(slideNext2);
				slideNext2Prev = true;
			});

			$thisGallery.bind("click", function() {
				if( slideInfoActive ) return;
				slideInfoActive = true;
				showSlideInfo2();
				showDimmer2();
			});

			$thisGallery.bind("mouseenter", function(e) {
				if( slideInfoActive ) return;
				freqSetTimeout(showSlideInfo2);
			});
			
			$thisGallery.bind("mouseleave", function(e) {
				if( slideInfoActive ) return;
				freqSetTimeout(hideSlideInfo);				
			});

			$(settings2.ui.dimmerClass).bind("click", function() {
				hideDimmer2();
			});			

			$(settings2.ui.thumbClass).bind("click", function(e) {
				var curThumb = parseInt($(this).data("thumb")) + 1;
				if( getCurrentSlideNumber2() ===  curThumb ) return;
				freqSetTimeout(function() {slideTo2( curThumb );});
				slideNext2Prev = true;
			});

			$(settings2.ui.slideInfoCtrClass).delegate(settings2.ui.fullscreenBtnClass, "click", function() {
				showFullScreen2();
			});

			$(settings2.ui.slideInfoCtrClass).delegate(settings2.ui.fullscreenCloseBtnClass, "click", function() {
				hideDimmer2();
			});
		},		

		// To avoid frequent user mouse or click events causing too many animations
		freqSetTimeout = function (funcName) {
			debug(freqTimeout);
			if( freqTimeout ) {
				// clear the timeout, if one is pending
                clearTimeout(freqTimeout);
                freqTimeout = null;					
			}
			freqTimeout = setTimeout(funcName, timeout_interval);			
		},

		showFullScreen2 = function (actionSlideNum) {
			actionSlideNum = actionSlideNum || getCurrentSlideNumber2();
			fullscreenModeInit = true;
			fullscreenMode = true;
			$(settings2.ui.ctrClass).width( $(window).width() - $(settings2.ui.slideInfoCtrClass).width() );
			$(settings2.ui.ctrClass).addClass("fullscreen");
			setSlideParams2();
			resizeImages2();
			slideTo2(actionSlideNum);
			showSlideInfo2();
		},

		hideFullScreen = function () {
			fullscreenModeInit = false;
			fullscreenMode = false;
			var infoCtrObj = $thisGallery.find( settings2.ui.slideInfoCtrClass );
			infoCtrObj.hide();
			$(settings2.ui.ctrClass).removeAttr('style');
			$(settings2.ui.ctrClass).removeClass("fullscreen");			
			setSlideParams2();
			resizeImages2();
			slideTo2(getCurrentSlideNumber2());
		},

		resizeImages2 = function () {
			$(settings2.ui.slideClass + " img[src]" ).each(function() {
		        var maxWidth = $(settings2.ui.slidesWrapperClass).width(), // Max width for the image
		        	maxHeight = $(settings2.ui.slidesWrapperClass).height(),    // Max height for the image
		        	ratio = 0,  // Used for aspect ratio
					imageWidth, imageHeight, theImage;  // Current image height

					theImage = new Image();
					theImage.src = $(this).attr("src");

					// Get accurate measurements from that.
					imageWidth = $(this).data("originalImageWidth") || theImage.width;
					imageHeight = $(this).data("originalImageHeight") || theImage.height;					

			        // Check if current height is larger than max
			        if(imageHeight > maxHeight){
			            ratio = maxHeight / imageHeight; // get ratio for scaling image
			            $(this).css("height", (maxHeight-2));   // Set new height
			            $(this).css("width", imageWidth * ratio);    // Scale width based on ratio
			            imageWidth = imageWidth * ratio;    // Reset width to match scaled image
			            imageHeight = imageHeight * ratio;    // Reset height to match scaled image
			        }					

			        // Check if the current width is larger than the max
			        if(imageWidth > maxWidth){
			            ratio = maxWidth / imageWidth;   // get ratio for scaling image
			            $(this).css("width", (maxWidth-2)); // Set new width
			            $(this).css("height", imageHeight * ratio);  // Scale height based on ratio
			            imageHeight = imageHeight * ratio;    // Reset height to match scaled image
			            imageWidth = imageWidth * ratio;    // Reset width to match scaled image
			        }
		    });
		},

		showSlideInfo2 = function () {
			var infoCtrObj = $thisGallery.find( settings2.ui.slideInfoCtrClass );
			if( slideInfoActive || getCurrentSlideNumber2() === 1 ) updateSlideInfo2();
			infoCtrObj.show().animate({
				left: $(settings2.ui.ctrClass).outerWidth()
			}, 'slow');		
		},

		hideSlideInfo = function () {
			//if( !slideInfoActive ) return;
			var infoCtrObj = $thisGallery.find( settings2.ui.slideInfoCtrClass );
			infoCtrObj.animate({
				left: $thisGallery.outerWidth() - infoCtrObj.outerWidth()
			}, 'slow', function () {
				infoCtrObj.hide();
				slideInfoActive = false;				
			});
		},

		updateSlideInfo2 = function () {
			var slideInfoHtml,
				infoCtrObj = $thisGallery.find( settings2.ui.slideInfoInnerCtrClass ),
				curSlideInfo = settings2.data.slides[getCurrentSlideNumber2()-1],
				slideHashbang = ( location.search === "" ) ? "?slide_num=" : "&slideNum=";
				slideHashbang += getCurrentSlideNumber2();
				curSlideInfo.slideURL = location.href.replace(location.search, "") + "?slide_num=" + getCurrentSlideNumber2() + "&action=fullscreen#gallery-" + settings2.data.gallery_id;
				//curSlideInfo.slideURL = location.href.replace + slideHashbang + "&action=fullscreen";

			// build gallery slides list 
          	template = Handlebars.compile( galleryTpl2.infoTemplate );
          	slideInfoHtml = template( curSlideInfo );
			infoCtrObj.html( slideInfoHtml );
			
			// Push new url state into history object
			//( historyPushState ) ? updateHistory(curSlideInfo.title, slideHashbang) : historyPushState = true;
		},

		setSlideCounter2 = function () {
			var slideCountHtml;

			// build counter html 
          	template = Handlebars.compile( galleryTpl2.slidesCountTemplate );
          	slideCountHtml = template( {
          		totalSlides: settings2.totalSlides,
          		image_num: getCurrentSlideNumber2()
          	});			
			$(settings2.ui.slidesCounterClass).html(slideCountHtml);			
		},

		setSlideParams2 = function () {
			var slidesWrapperHeight;
			settings2.totalSlides = settings2.data.slides.length;
			settings2.slideWidth = $(settings2.ui.slidesWrapperClass).width();
			if(fullscreenMode) {
				slidesWrapperHeight = $(window).height() - 
										( $(settings2.ui.slidesTitleClass).outerHeight() 
											+ $(settings2.ui.thumbsWrapperClass).outerHeight() 
											+ $(settings2.ui.slidesDescClass).outerHeight() + 20 );				
			} else {
				//slidesWrapperHeight = ((settings2.slideWidth + $(settings2.ui.slideInfoCtrClass).width()) * 9)/16;				
				slidesWrapperHeight = $(settings2.ui.slidesWrapperClass).data("defaultHeight");
			}
			$(settings2.ui.slidesWrapperClass).height(slidesWrapperHeight + "px");
			settings2.totalWidth = settings2.totalSlides * settings2.slideWidth;
			settings2.thumbWidth = $(settings2.ui.thumbClass).outerWidth();
			settings2.totalThumbWidth = settings2.totalSlides * settings2.thumbWidth;

			if (!$('.second-gallery').hasClass('rendered')) {
				// fix the height based on the slides
				var maxWidth = $('.second-gallery-slides-wrapper').width();
				var maxHeight = $('.second-gallery-slides-wrapper').height();
				var slides = [];

				// check all the side sizes
				for (var i = 0; i < settings2.data.slides.length; i++) {
					var imgWidth = settings2.data.slides[i].originalImageWidth;
					var imgHeight = settings2.data.slides[i].originalImageHeight;
					if (imgWidth > maxWidth) {
						var ratio = maxWidth / imgWidth;
						slides.push(imgHeight * ratio);
					} else {
						var ratio = maxHeight / imgHeight;
						slides.push(maxHeight - 2);
					}
				}

				slides.sort();
				slidesWrapperHeight = slides[slides.length-1];

				if (slidesWrapperHeight > 575) 
					slidesWrapperHeight = 575;
				else if (slidesWrapperHeight < 400)
					slidesWrapperHeight = 400;
				
				$('.second-gallery-slides-wrapper').css('height',slidesWrapperHeight+"px");
				$('.second-gallery-slides-wrapper').attr('data-defaultheight',slidesWrapperHeight);

				$('.second-gallery').addClass('rendered');
			}

			$(settings2.ui.slidesUlCtrClass).css({
				"width": settings2.totalWidth + "px"
			});
			$(settings2.ui.slidesUlCtrClass + " " + settings2.ui.slideClass).css({
				"float": "left",
				"width": settings2.slideWidth + "px",
				"height": slidesWrapperHeight + "px",
				"line-height": slidesWrapperHeight + "px" 
			});
			$(settings2.ui.thumbsCtrClass).css({
				"width": settings2.totalThumbWidth + "px"
			});			
		},

		slidePrev2 = function () {
			var translatexEnd, translatexStart,
				curSlide = getCurrentSlideNumber2(); 
			translatexStart = - ( settings2.slideWidth * (curSlide -1) );
			translatexEnd =  translatexStart + settings2.slideWidth;			

			if( slideInfoActive === false ) {
				showSlideInfo2();
			}

			startAnimation2(translatexStart, translatexEnd, curSlide-2);
		},

		slideNext2 = function () {
			var translatexEnd, translatexStart,
				curSlide = getCurrentSlideNumber2();
			translatexEnd = settings2.slideWidth * curSlide;
			translatexStart =  -1 * ( translatexEnd - settings2.slideWidth );
			translatexEnd = translatexEnd * -1;

			if( slideInfoActive === false ) {
				showSlideInfo2();
			}

			startAnimation2(translatexStart, translatexEnd, curSlide);
		},

		slideTo2 = function (slideNum) {
			var translatexEnd, translatexStart,
				curSlide = getCurrentSlideNumber2();

			translatexStart = -1 * ( settings2.slideWidth * (curSlide -1) );
			translatexEnd =   -1 * ( settings2.slideWidth * ( slideNum - 1 ) );
			startAnimation2(translatexStart, translatexEnd, --slideNum);
		};

		updateSlides2 = function(curSlide) {
			var $slideImg = $(settings2.ui.slideClass + "[data-slide=" + curSlide + "] img");
			
			if ($slideImg.attr("src") === undefined) {
				$slideImg.attr("src", $slideImg.attr("data-src"));
			}

			updateSlideDirect2 = function(fowardBool) {
					var j;

					for (var i = 1; i < 4; i++) {
						if (fowardBool && ( settings2.totalSlides < ( curSlide + i ) )) continue;
						else if ( ( curSlide - i ) < 0 ) continue;

						j = i;
						if (!fowardBool) j = i*-1;

						$slideImg = $(settings2.ui.slideClass + "[data-slide=" + parseInt(curSlide + j) + "] img");
						
						if ($slideImg.attr("src") === undefined) {
							$slideImg.attr("src", $slideImg.attr("data-src"));
						}
					}
			};

			updateSlideDirect2(true);
			updateSlideDirect2(false);
			resizeImages2();
		};

		startAnimation2 = function (translatexStart, translatexEnd, curSlide) {
			updateSlides2(curSlide);
			setSlideCounter2();

			var moveThumbsCnt;
			moveThumbsCnt = ( fullscreenMode ) ? 10 : 5;

			// CSS 2D transform feature detection check
			if ( window.Modernizr.csstransforms ) {
				$( settings2.ui.slidesUlCtrClass ).tween({
				   transform:{
				      start: 'translateX(' + translatexStart + 'px)',
				      stop: 'translateX(' + translatexEnd + 'px)',
				      time: 0,
				      duration: settings2.slide_interval,
				      effect:'linear',
					  onStop: function() {
					  	if( fullscreenModeInit ) {
					  		fullscreenModeInit = false;
					  		return;
					  	}
						$(settings2.ui.slideClass + settings2.ui.activeClass).removeClass(cleanClassName(settings2.ui.activeClass));
						$(settings2.ui.slideClass + "[data-slide=" + curSlide + "]").addClass(cleanClassName(settings2.ui.activeClass)); 
						
						// Hide or show left/right chevrons
						showHideChevrons2();

						// Make omniture, google analytics and mpu call only on gallery slide change
						if( slideInfoActive && slideNext2Prev ) {
							userPageViewCount++;							
							loadMPU2();							
							triggerOmniture2();
							triggerGA();			
							slideNext2Prev = false;		
						}							

						// Move thumbs carousel		
						if ( (( ($(settings2.ui.thumbsWrapperClass).width()/2) + settings2.thumbWidth ) 
								< ( settings2.thumbWidth * curSlide )) || curSlide < moveThumbsCnt ) {
							translatexStart = $(settings2.ui.thumbsCtrClass).css("transform") 
												|| $(settings2.ui.thumbsCtrClass).css("-webkit-transform") 
												|| $(settings2.ui.thumbsCtrClass).css("-ms-transform") 
												|| 0;
							translatexStart = ( translatexStart !== 0 && translatexStart !== "none" ) ? 
												utility.matrixToArray(translatexStart)[4] : 0;
							translatexEnd = ( curSlide < moveThumbsCnt ) ? 0 : -1 * ( settings2.thumbWidth * ( curSlide - 4 ) );
							$(settings2.ui.thumbsCtrClass).tween({
							   transform:{
							      start: 'translateX(' + translatexStart + 'px)',
							      stop: 'translateX(' + translatexEnd + 'px)',
							      time: 0,
							      duration: settings2.slide_interval,
							      effect:'linear',
							      onStop: function() {
									setSlideCounter2();
									setCurrentThumb2();
									updateSlideInfo2();  						      	
							      }    
							   }
							}).play();
						}     	
				      }      
				   }
				}).play();
			// Gracefully degrade by animating using left css property
			} else {
				$( settings2.ui.slidesUlCtrClass ).tween({
				   left:{
				      start: translatexStart,
				      stop: translatexEnd,
				      time: 0,
				      duration: settings2.slide_interval,
				      effect:'linear',
					  onStop: function() {
					  	if( fullscreenModeInit ) {
							fullscreenModeInit = false;					  		
					  		return;
					  	}
						$(settings2.ui.slideClass + settings2.ui.activeClass).removeClass(cleanClassName(settings2.ui.activeClass));
						$(settings2.ui.slideClass + "[data-slide=" + curSlide + "]").addClass(cleanClassName(settings2.ui.activeClass));
						
						// Hide or show left/right chevrons
						showHideChevrons2();

						// Make omniture, google analytics and mpu call only on gallery slide change
						if( slideInfoActive && slideNext2Prev ) {
							userPageViewCount++;							
							loadMPU2();							
							triggerOmniture2();
							triggerGA();
							slideNext2Prev = false;		
						}							

						// Move thumbs carousel		
						if ( (( ($(settings2.ui.thumbsWrapperClass).width()/2) + settings2.thumbWidth ) 
								< ( settings2.thumbWidth * curSlide )) || curSlide < moveThumbsCnt ) {				
							translatexStart = $(settings2.ui.thumbsCtrClass).css("transform") 
												|| $(settings2.ui.thumbsCtrClass).css("-webkit-transform") 
												|| $(settings2.ui.thumbsCtrClass).css("-ms-transform") 
												|| 0;
							translatexStart = ( translatexStart !== 0 && translatexStart !== "none" ) ? 
												utility.matrixToArray(translatexStart)[4] : 0;
							translatexEnd = ( curSlide < moveThumbsCnt ) ? 0 : -1 * ( settings2.thumbWidth * ( curSlide - 4 ) );
							$(settings2.ui.thumbsCtrClass).tween({
							   left:{
							      start: translatexStart,
							      stop: translatexEnd,
							      time: 0,
							      duration: settings2.slide_interval,
							      effect:'linear',
							      onStop: function() {
									setSlideCounter2();
									setCurrentThumb2();
									updateSlideInfo2();  						      	
							      }    
							   }
							}).play();
						}     	
				      }      
				   }
				}).play();
			}		
		},

		showHideChevrons2 = function () {
			var totalSlides = settings2.totalSlides + 1;
			switch( getCurrentSlideNumber2() ) {
				case 1:
					$(settings2.ui.slideLeftArrowClass).hide();
					break;
				case settings2.totalSlides:
					$(settings2.ui.slideRightArrowClass).hide();
					break;
				default:
					$(settings2.ui.slideLeftArrowClass).show();
					$(settings2.ui.slideRightArrowClass).show();
			}
		},

		cleanClassName = function (className) {
			return className.replace(".", "");
		},

		showLoader = function (galleryObj) {
			var loaderHtml;

			// build gallery slides list 
          	template = Handlebars.compile( galleryTpl2.loadingTemplate );
          	loaderHtml = template( {serverPath: settings2.serverPath} );
			$( galleryObj ).html( loaderHtml );
		},

		hideLoader2 = function (galleryObj) {
			galleryObj.find(settings2.ui.loaderClass).hide();
		},

		showDimmer2 = function () {
			$(settings2.ui.dimmerClass).show().animate({
				opacity: "0.7",
			}, "slow");
			$('.esi-gallery').css('z-index',100);
		},

		hideDimmer2 = function () {
			if( fullscreenMode ) hideFullScreen();			
			var dimmerCtrObj = $(settings2.ui.dimmerClass);
			dimmerCtrObj.animate({
				opacity: "0",
			}, "slow", function() {
				hideSlideInfo();
				dimmerCtrObj.hide();				
			});
			$('.esi-gallery').css('z-index',999999);
		},

		setCurrentThumb2 = function () {
			$(settings2.ui.thumbClass + settings2.ui.activeClass).removeClass(cleanClassName(settings2.ui.activeClass));
			$(settings2.ui.thumbClass + ":nth-child(" + getCurrentSlideNumber2() + ")").addClass(cleanClassName(settings2.ui.activeClass));
		},

		getCurrentSlideNumber2 = function () {
			return parseInt($(settings2.ui.slideClass + settings2.ui.activeClass).data("slide")) + 1;
		},

		getCurrentSlideNumber2FromURL2 = function() {
			return parseInt(utility.getURLParameter('slide_num', !Modernizr.history)) || 0;
		},

		loadDFP5MPU = function () {
			if( $.browser.device ) return;
			var mpuHtml;
          	template = Handlebars.compile( galleryTpl2.mpuTemplate );
          	mpuHtml = template({
          		serverPath: settings2.serverPath,
          		dartAdSize: settings2.ad.dartAdSize,
          		dartTile: settings2.ad.dartTile
          	});
          	$(settings2.ui.mpuClass).remove();
          	$(settings2.ui.slideInfoCtrClass).append( mpuHtml );
		},

		loadMPU2 = function () {
			var mpuHtml;
			if( $.browser.device ) return;

			if( typeof googletag === "undefined" ) {
				debug("GPT SDK not loaded. Please include it for ads to work.");
				return;
			}	

			if( mpuLoaded ) {
				googletag.pubads().refresh([galleryMpu]);
			}else{		
				mpuLoaded = true;
	          	template = Handlebars.compile( galleryTpl2.mpuTemplate );
	          	mpuHtml = template({});
	          	$(settings2.ui.slideInfoCtrClass).append( mpuHtml );
				googletag.cmd.push(function() {				
					galleryMpu = googletag.defineSlot("/71347885/(Core)_The_Independent_UK/indy_indygallery", [300, 250], cleanClassName(settings2.ui.mpuClass))
								.addService(googletag.pubads())
								.setTargeting("gs_cat", gs_channels)
								.setTargeting("article", articleId)
								.setTargeting("tile", "gallery-mpu");	
					googletag.pubads().collapseEmptyDivs();
					googletag.pubads().enableAsyncRendering();
					googletag.enableServices();								
					googletag.display(cleanClassName(settings2.ui.mpuClass));
				});					
			}
		},		

		triggerOmniture2 = function () {
			// To fix anomaly in page views generated mostly by slide #3 
			//if( getCurrentSlideNumber2() === 3 ) return;
			if( userPageViewCount > (settings2.totalSlides * 2) ) return;

	        var s=s_gi(s_account),
	        	articleId = articleId || utility.getArticleID();			
			s.linkTrackVars="prop21";
			s.linkTrackEvents='event3';
			s.prop21 = articleId + " | " + getCurrentSlideNumber2();
			s.events = "event3";
			s.t();
			s.prop21 = s.events = "";
		},

		triggerGA = function () {
			// To fix anomaly in page views generated mostly by slide #3 			
			//if( getCurrentSlideNumber2() === 3 ) return;
			if( userPageViewCount > (settings2.totalSlides * 2) ) return;

			var pageurl;
			pageurl = ( utility.getURLParameter('slide_num') !== "null" ) ? location.href :  location.href.replace(location.search, "") + "?slide_num=" + getCurrentSlideNumber2();

			_gaq.push(['_trackEvent', 'UserStats', 'Browser', navigator.userAgent]);
			_gaq.push(['_trackEvent', 'UserStats', 'Referrer', window.document.referrer]);
			// Google Analytics request fired
			_gaq.push(['_trackPageview', pageurl]);
		},

		updateHistory = function (title, link) {
			History.pushState({_index: History.getCurrentIndex()}, null, link);
		},

		setDeviceType = function () {
			$.browser.device = Modernizr.mq('only all and (max-width: 400px)') || ( $( settings2.ui.ctrClass + ".mobile" ).length > 0 ) ? true : false;
		},

        getData = function (galleryObj) {
			$.ajax({
				//url: settings2.serverPath + "/data/" + settings2.dataFile,
				url: settings2.serverAPIURL + galleryObj.data("galleryid"),
				dataType: settings2.dataType,
				method: settings2.method,        
				success: function(data) { 
							settings2.success_callback(data, galleryObj); 
						},
				error: function(jqXHR, textStatus, errorThrown) { 
							settings2.error_callback(textStatus, errorThrown, galleryObj); 
							var pageId = document.location.href.match(/(\d+).html/);
							if (pageId.length>0) {
								_gaq.push(['_trackEvent', 'Broken Gallery', 'page id: '+pageId[1], 'gallery: '+$('.esi-gallery').data('galleryid')]);
							}
						},
				timeout: settings2.timeout
			});	
        };		

		//public functions and data
		return {
			load: function() {
				getGalleryCtrs();
			}
		};
		
	};
	
	return SECONDGallery;
});