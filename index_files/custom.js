$(function() {	
	primaryNavDropdown();
	imgPopup();
	openPopup('.openBiogPopup', '#renderBiography');
	openPopup('.tipsPopup', '.tipsContent');
	closePopup('.closeBiogPopup', '#renderBiography');
	closePopup('#renderBiography .close', '#renderBiography');
	closePopup('.closeImg', '.imageBox');
	displayRatingStars(5);
	makeColsEqual('#main-container, #side');
	makeColsEqual('.reload-gallery #main, .reload-gallery #side');
	makeColsEqual('#footer .column-2 .menu');
	makeColsEqual('.x460x140 .column-1, .x460x140 .column-2');
	makeColsEqual('.sectionRowTwo.x300x300 .column-1, .sectionRowTwo.x300x300 .column-2');
	makeColsEqual('.sectionRowFour.x300x300 .column-1, .sectionRowFour.x300x300 .column-2');
	makeColsEqual('.x220x140x220 .column-1, .x220x140x220 .column-2, .x220x140x220 .column-3');
	makeColsEqual('.x140x300x140 .column-1, .x140x300x140 .column-2, .x140x300x140 .column-3');
	makeColsEqual('.x220x380 .column-1, .x220x380 .column-2');
    makeColsEqual('.x140x460_alt .column-1, .x140x460_alt .column-2');
	makeColsEqual('.sectionRowSix.x300x300 .column-1, .sectionRowSix.x300x300 .column-2');
	makeColsEqual('.ihomep .x300x300 .column-1, .ihomep .x300x300 .column-2');
	addClassSkyscraper();
	atozList();
 	miniinxexV2helper();
    articleLocations(ind.mainColumnClassId);
 	modifyGallery();
 	preopulateInput('.superSearchBox fieldset input[type="text"]', 'Search The Independent');
 	preopulateInput('.superSearchBox fieldset input[type="text"]', 'Search The Independent');
 	ie7parawidthfix();
 	findemptysummary();
 	appenddownarrow();
 	movebiobox();
	movetipbox();
	removeBorderLastMostMostMost();
	manageBordersMostMostMostTabsMenu();
	VoicesUtils.init();
});

// Function to set width, add canvas arrow and slide down and up third level navigation on the page
function primaryNavDropdown () {
	$('.third-level-wrapper').each(function() {
		$(this).css({display:'block',visibility:'hidden'});
		$(this).width('3000px');
		var wrapperWidth = 2; // adding 2 pixels as a buffer
		$(this).find('ul').each(function() { wrapperWidth += $(this).outerWidth(); });
		$(this).width(wrapperWidth+'px');		
		$(this).css({display:'none',visibility:'visible'});
		
	});
	
	var timeout = false;
	$('.navPrimary ul li ul li').hover(
		function() {
			var that = this;
			timeout = setTimeout( function() {$(that).find('.third-level-wrapper').slideDown()}, 500);
		},
		function() {
			if (timeout) clearTimeout(timeout);
			$(this).find('.third-level-wrapper').slideUp();
		}
	);
}

// Function to hide popup content in DOM and to pop it up when the link is clicked
function openPopup (popupLinkSelector, popupBoxSelector) {
	$(popupLinkSelector).click(function() {
		addoverlay();
		centerPopup(popupBoxSelector, true);		
		$(popupBoxSelector).addClass('shown');
		return false;
	});
}

function imgPopup () {
	
	$('.slideshow .galleria-stage img').live('click', function() {	
		
		var gallery = Galleria.get(0);
	    gallery.pause();
	});		
}

function addoverlay () {
	$('<div id="overlay"></div>')
    .css('top', '0')
    .css('opacity', '0')
    .animate({'opacity': '0.5'}, 'slow')
    .appendTo('body');
	$('#overlay').live('click', function() {
		$('#overlay, .poppedUp, .shown').fadeOut('slow', function() {
			$('#overlay, .poppedUp').remove();
			$('.shown').hide().removeClass('shown');
		});
	});
}

function createPopupImgContainer (containerClass) {
	$('<div class="'+containerClass+' poppedUp"></div>').appendTo('body');
}

function createBigImage (image, containerClass) {
	var orginalSrc = $(image).attr('src');
	var alt = $(image).attr('alt');
	var bigSrc = orginalSrc.replace(/\/ALTERNATES\/.+\//, "/BINARY/");
	var bigImg = document.createElement('img');
	bigImg.src = bigSrc;
	bigImg.setAttribute('alt', alt);
	var jBigImg = $(bigImg);
	var container = $('.'+containerClass).get(0);
	container.appendChild(bigImg);
	
	$(bigImg).load(function() {
		$('.'+containerClass).show();
		var imgWidth = $(this).width();
		var imgHeight = $(this).height();
		var windWidth = $(window).width();
		var windHeight = $(window).height();
		var horizOverflow = 0;
		var vertOverflow = 0;
		var overflow = false;		
		if ((imgWidth + 80) > windWidth) {
			horizOverflow = (imgWidth + 80) - windWidth;
			overflow = true;
		};
		if ((imgHeight + 110) > windHeight) {
			vertOverflow = (imgHeight + 110) - windHeight;
			overflow = true;
		};
		if (vertOverflow > horizOverflow) {
			jBigImg.css('height', (windHeight - 110)+'px');
		}
		if (vertOverflow < horizOverflow) {
			jBigImg.css('width', (windWidth - 80)+'px');
		}
		$('.'+containerClass).hide();
		$('.'+containerClass).append('<div class="closeImg">Close</div>')
		centerPopup('.imageBox', true);
	});
}

function centerPopup(popupBoxSelector, fadein) {
	$(popupBoxSelector).css("position","absolute");
	$(popupBoxSelector).css("z-index","1002");
	$(popupBoxSelector).css("top", Math.round(($(window).height() - $(popupBoxSelector).outerHeight() ) / 2+$(window).scrollTop()) + "px");
	$(popupBoxSelector).css("left", Math.round(( $(window).width() - $(popupBoxSelector).outerWidth() ) / 2+$(window).scrollLeft()) + "px");
	if (fadein) {
		$(popupBoxSelector).fadeIn(1000);
	}
	
}

// Function to close popup 
function closePopup(closePopupLinkSelector, popupBoxSelector) {
	
	$(closePopupLinkSelector).live('click', function() {
	// document.location.href	=	document.location.href
		$('#overlay, '+popupBoxSelector).fadeOut('slow', function() {
			$("#overlay").remove();
			$(popupBoxSelector).hide();
			if (popupBoxSelector === '.imageBox') {
				$(popupBoxSelector).remove();
			}
			$('body').css('overflow-y', 'auto');
		});
		return false;
	});
}

//Function to change article rating text information to star images
function displayRatingStars(maxRating) {
	var starCounter = 0;
	$('.starRating').each(function() {
	    var rating = parseInt($(this).text());
	    var greyStarNumber = parseInt(maxRating - rating);
	    starCounter = 0;
	    $(this).text('');
	    renderStars(this, rating, 'rating_star.png');
	    renderStars(this, greyStarNumber, 'rating_star_grey.png');
	});

    function renderStars(starContainer, starCount, imageName) {
        var i = 0;
        while (i < starCount) {
        	starCounter ++;
            $(starContainer).append("<img alt='star number " + starCounter + "' src='" + ind.pubUrl + "skins/"+ ind.skinName + "/images/" + imageName + "' />")
            i ++;
        }
    }
}

// added new method to Array object - it returns the highest number from an array
Array.prototype.maxNum = function(){
	var max = null,
		current;
	for (var i in this){
		if (this.hasOwnProperty(i)){
			current = parseFloat(this[i]);
			if (max === null || current > max){
				max = current;
			}
		}
	}
	return max;
};

var equalColumns = {
		
	//gets heights of elements from specified set
	getColumnHeights: function(selector){
		var allColHeights = [];
		$(selector).each(function(){
			allColHeights[allColHeights.length] = $(this).height();
		});
		return allColHeights;
	},

	//gets highest column
	findHighestColumn: function(arrayOfColumnHeights){
		return arrayOfColumnHeights.maxNum();
	},
	
	//apply specified height to selected containers
	applyHeightToColumns: function(selector, height) {
		$(selector).each(function() {
			$(this).css('min-height', height);
		});
	}
};

// uses equalColumns object to set footer columns equal
function makeColsEqual(selector) {
	$(window).load(
		function () {
			var allColumnHeights = equalColumns.getColumnHeights(selector);
			var tallestColumn = equalColumns.findHighestColumn(allColumnHeights);
			equalColumns.applyHeightToColumns(selector, tallestColumn);
		}
	);
}

// Adds "skyscraper" class to skyscraper ads container
function addClassSkyscraper() {
	$('.ad').each(function() {
		var adContainer = $(this).find('div:first-child');
		if (adContainer.height() > 599) {
			adContainer.addClass('skyscraper');
		}
	});
}

// Shows and hides articles listings on "a to z" page
function atozList () {
		
	// set up html
	var listOfArticles;
	$('.atoz').append('<div class="articleList"></div>');
	$('.atoz ul.atozlist').find('.columns').each(function() {
		$(this).addClass('hidden');
	});	
	$('ul.atozlist').find('h3').each(function() {					
		var listItem = $(this).parent();
		var ulInside = listItem.find('ul');
		if (ulInside.length > 0) {
			$(this).addClass('active');
		} else {
			$(this).addClass('inactive');
		}
		if (ulInside.length > 1) {
			listItem.find('.columns').append('<div class="pagination"><ul><li class="previous notactive">Previous</li></ul></div>');
			for (i = 1; i <= ulInside.length; i++) {
				listItem.find('div.pagination ul').append('<li class="list'+ i +' number">'+ i +'</li>');
			}
			listItem.find('div.pagination ul').append('<li class="next">Next</li><li class="last">Last</li>');
			listItem.find('li.list1').addClass('current');			
			ulInside.each(function() {
				$(this).addClass('hidden');
			});
			ulInside.first().removeClass('hidden');
		}		
	});
	
	// display list of articles from first not empty index item
	var firstItemWithContent = $('.atoz .atozlist li').find('.columns').first();
	var h3TagIdfromFirstItem = firstItemWithContent.parent().attr('id');
	listOfArticles = firstItemWithContent.html();
	$('.atoz .articleList').html(listOfArticles);
	$('.atoz #'+ h3TagIdfromFirstItem +' h3').addClass('current');
	
	// click handlers
	$('.atoz ul.atozlist li h3.active').click(function() {
		$('.atoz h3.current').removeClass('current');
		$(this).addClass('current');
		var letter = $(this).text();
		listOfArticles = $('.atoz ul.atozlist li#articles'+letter+' .columns').html();	
		$('.atoz .articleList').html(listOfArticles);
	});
	
	$('.atoz .articleList .pagination ul li.number').live('click', function() {
		var className = $(this).attr('class');
		var currentItemNumber = parseInt(className.charAt(4));
		var previousItemNumber = currentItemNumber - 1;
		var lastItemNumber = $('.articleList .pagination ul li').length - 3;
		
		$(this).siblings().removeClass('current').removeClass('notactive');
		if (currentItemNumber === 1) {
			$('.atoz .articleList .pagination ul li.previous').addClass('notactive');
		}
		if (currentItemNumber === lastItemNumber) {
			$('.atoz .articleList .pagination ul li.next, .atoz .articleList .pagination ul li.last').addClass('notactive');
		}
		$(this).addClass('current');				
		$('.atoz .articleList ul').each(function() {
			var parentClass = $(this).parent().attr('class');			
			if (parentClass !== 'pagination') {
				$(this).addClass('hidden');
			}
		});
		$('.atoz .articleList ul:nth-child('+ currentItemNumber +')').removeClass('hidden');
	});
	
	$('.atoz .articleList .pagination ul li.previous').live('click', function() {
		var currentItem = $('.atoz .articleList .pagination ul').find('.current');
		var className = currentItem.attr('class');
		var currentItemNumber = parseInt(className.charAt(4));
		var previousItemNumber = currentItemNumber - 1;
		if (currentItemNumber !== 1) {
			$(this).siblings().removeClass('current');
			$('.atoz .articleList .pagination ul li.next, .atoz .articleList .pagination ul li.last').removeClass('notactive');
			$('.atoz .articleList .pagination ul li.list' + previousItemNumber).addClass('current');
			if (previousItemNumber === 1) {
				$('.atoz .articleList .pagination ul li.previous').addClass('notactive');
			}
			$('.atoz .articleList ul').each(function() {
				var parentClass = $(this).parent().attr('class');	
				if (parentClass !== 'pagination') {
					$(this).addClass('hidden');
				}
			});
			$('.atoz .articleList ul:nth-child('+ previousItemNumber +')').removeClass('hidden');
		}
	});
	
	$('.atoz .articleList .pagination ul li.next').live('click', function() {
		var currentItem = $('.atoz .articleList .pagination ul').find('.current');
		var className = currentItem.attr('class');
		var currentItemNumber = parseInt(className.charAt(4));
		var nextItemNumber = currentItemNumber + 1;
		var lastItemNumber = $('.articleList .pagination ul li').length - 3;
		if (currentItemNumber !== lastItemNumber) {
			$(this).siblings().removeClass('current');
			$('.atoz .articleList .pagination ul li.previous').removeClass('notactive');
			$('.atoz .articleList .pagination ul li.list' + nextItemNumber).addClass('current');
			if (nextItemNumber === lastItemNumber) {
				$('.atoz .articleList .pagination ul li.next, .atoz .articleList .pagination ul li.last').addClass('notactive');
			}
			$('.atoz .articleList ul').each(function() {
				var parentClass = $(this).parent().attr('class');			
				if (parentClass !== 'pagination') {
					$(this).addClass('hidden');
				}
			});
			$('.atoz .articleList ul:nth-child('+ nextItemNumber +')').removeClass('hidden');
		}
	});
	
	$('.atoz .articleList .pagination ul li.last').live('click', function() {
		var lastItemNumber = $('.articleList .pagination ul li').length - 3;
		$(this).siblings().removeClass('current');
		$('.atoz .articleList .pagination ul li.previous').removeClass('notactive');
		$('.atoz .articleList .pagination ul li.list' + lastItemNumber).addClass('current');
		$('.atoz .articleList .pagination ul li.next, .atoz .articleList .pagination ul li.last').addClass('notactive');
		$('.atoz .articleList ul').each(function() {
			var parentClass = $(this).parent().attr('class');			
			if (parentClass !== 'pagination') {
				$(this).addClass('hidden');
			}
		});
		$('.atoz .articleList ul:nth-child('+ lastItemNumber +')').removeClass('hidden');
	});
	
}

// Adds additional class to index with tabs for styling purposes
function miniinxexV2helper () {
	$('.miniindexwithtitle ul li:nth-child(2) a').addClass('no-bg');	
	$('.miniindexwithtitle ul li a').click(function() {
		$('.miniindexwithtitle ul li a').each(function() {
			$(this).removeClass('no-bg');
		});
		$(this).parent().next().find('a').addClass('no-bg');
	})
}

// Moves the image/slideshow to a wide column on article page
function articleLocations (columnClassId) {
	if (typeof columnClassId === 'undefined' || columnClassId ===''){
		columnClassId = ".x220x380";
    } 
	
    if (columnClassId !== 'newlayout') {
    	
		if (ind.article.largeItem === 'false' && ind.article.videoPriority === 'false') {
			var videoContent = $('#newsVideoPlayer').html();
			if (videoContent !== null) {
				$('#newsVideoPlayer').addClass('widget');
				$('#newsVideoPlayer').prepend('<h5>Releated video</h5>');
				$('#newsVideoPlayer').find('iframe').attr('width', 220);
			}
		}
		
		if (ind.article.largeItem === 'true' && ind.article.videoPriority === 'false') {
			var slideshowContent = $('.slideshow').html();
			var slideshowClass = $('.slideshow').attr('class');
			var articleColumns = $(columnClassId);
			var videoContent = $('#newsVideoPlayer').html();
			
			if (slideshowContent !== null) {
				$('.slideshow').remove();
				articleColumns.before('<div class="'+ slideshowClass +' movedImg"></div>');
				$('.movedImg').html(slideshowContent);
			}
			
			if (videoContent !== null) {
				$('#newsVideoPlayer').prepend('<h5>Related video</h5>');
				$('#newsVideoPlayer').addClass('widget');
				$('#newsVideoPlayer').find('iframe').attr('width', 220);
			}
		}
	
		if (ind.article.largeItem === 'true' && ind.article.videoPriority === 'true') {
			var videoContent = $('#newsVideoPlayer').html();
			var videoContentClass = $('#newsVideoPlayer').attr('class');
			var articleColumns = $(columnClassId);
			
			var slideshowContent = $('.slideshow').html();
			var slideshowClass = $('.slideshow').attr('class');
			
			if (videoContent !== null) {
				$('#newsVideoPlayer').remove();
				articleColumns.before('<div id="newsVideoPlayer" class="'+ videoContentClass +' movedVid"></div>');
				$('.movedVid').html(videoContent);
				$('.movedVid').find('object').attr('width', 620).attr('height', 584);
				$('.movedVid').find('iframe').attr('width', 620).attr('height', 584);
			}
			
			if (slideshowContent !== null) {
				$('.slideshow').remove();
				articleColumns.find('.column-1').prepend('<div class="'+ slideshowClass +' movedImg"></div>');
				$('.movedImg').html(slideshowContent);
				$('.movedImg').prepend('<h5>Related Image</h5>');
			}
			
		}
	
		if (ind.article.largeItem === 'false' && ind.article.videoPriority === 'true') {
			var slideshowContent = $('.slideshow').html();
			var slideshowClass = $('.slideshow').attr('class');
			var articleColumns = $(columnClassId);
			
			var videoContent = $('#newsVideoPlayer').html();
			var videoContentClass = $('#newsVideoPlayer').attr('class');
			
			if (slideshowContent !== null) {
				$('.slideshow').remove();
				articleColumns.find('.column-1').prepend('<div class="'+ slideshowClass +' movedImg"></div>');
				$('.movedImg').html(slideshowContent);
				$('.movedImg').prepend('<h5>Related Image</h5>');
			}
			
			if (videoContent !== null) {
				$('#newsVideoPlayer').remove();
				articleColumns.find('.column-2').prepend('<div id="newsVideoPlayer" class="'+ videoContentClass +' movedVid"></div>');
				$('.movedVid').html(videoContent);
										
				if(columnClassId === '.x220x380'){
				
					$('.movedVid').find('object').width(380);
					$('.movedVid').find('object').height(404);
	            
					$('.movedVid object param[name="width"]').val(380);
					$('.movedVid object param[name="height"]').val(404);
										
					$('.movedVid').find('object').attr('width', 380).attr('height', 404);
					$('.movedVid').find('iframe').attr('width', 380).attr('height', 404);
				} else {
					$('.movedVid').find('object').width(460);
					$('.movedVid').find('object').height(424);
										
					$('.movedVid object param[name="width"]').val(460);
					$('.movedVid object param[name="height"]').val(424);
										
					$('.movedVid').find('object').attr('width', 460).attr('height', 424);
				    $('.movedVid').find('iframe').attr('width', 460).attr('height', 424);
										
				}
			}
		}
	}
}

function modifyGallery () {
	$('.slideshow .autoplay').live('click', function() {
		var gallery = Galleria.get(0);
	    gallery.play(2000);
	    $(this).attr('class', 'stop');
	    $(this).text('Stop');
	});
	$('.slideshow .stop').live('click', function() {
		var gallery = Galleria.get(0);
	    gallery.pause();
	    $(this).attr('class', 'autoplay');
	    $(this).text('Autoplay');
	});
	$('.slideshow .galleria-image-nav-left, .slideshow .galleria-image-nav-right, .slideshow .galleria-image').live('click', function() {
	    if ($('.stop').html !== null) {
	    	$('.stop').text('Autoplay');
	    	$('.stop').attr('class', 'autoplay');
	    }
	});   	
}

function preopulateInput (selector, value) {
	$(selector).each(function() {
		var field = $(this);
		var currentValue = field.val();
		if (currentValue == "") {
			field.val(value);
			field.css('color', '#dddddd');
		};
		field.focus(function() {
			currentValue = field.val();
			if (currentValue == value) {
				field.val("");
				field.css('color', 'inherit');
			}
		});
		field.blur(function() {
			currentValue = field.val();
			if (currentValue == "") {
				field.val(value);
				field.css('color', '#dddddd');
			};
		});
	});
	$('input.button').click(function() {
		if ($(this).prev().val() === value) return false;
	});
};

function ie7parawidthfix() {
	if(parseInt($('.first .summary').css('width')) == 0) {
		$('.first .summary').css('width','380px')
	}
}
function findemptysummary() {
	$('.summary').each(function(){
		
		if(parseInt($(this).html().length) < 1){
			var notext = '';
			$(this).html(notext);
		}
	})
}

function appenddownarrow() {
	$('ul .submenu .parent').each(function(){
		var arrowcontainer	=	document.createElement('div');
		$(arrowcontainer).attr('class','downarrow');
		$(this).append(arrowcontainer);
	})	
}

function movebiobox() {
	$('body').append($('#renderBiography'));
}

function movetipbox() {
	$('body').append($('.tipsContent'));
}

/* reload gallery helper functions*/
function galleryAutoplay () {
	var href = window.location.href;
	
	if (href.search('autoplay=true') > -1) {
		autoplay(true);
	} else {
		$('#autoplay span').text('Autoplay');
	}
	$('#autoplay span').click(function() {
		if (href.search('autoplay=true') > -1) {
			autoplay(false);
		} else {					
			autoplay(true);
		}
	});
	function autoplay (flag) {
		if (flag) {
			$('#autoplay span').text('Stop');
			var autoplayUrl = $('#right-arrow').attr('href') + "&autoplay=true";
			var autoTimeout = setTimeout(function() {
				window.location = autoplayUrl;
			}, 5000);
		} else {
			$('#autoplay span').text('Autoplay');
			clearTimeout(autoTimeout);
			window.location.search = "?action=gallery&ino=" + ind.article.img;
		}								
	}
}

function navigateToCurrentImage () {
	var slideIndex = (Math.ceil(ind.article.img / 8)) - 1;
	var imgIndex = ind.article.img - (slideIndex * 8);
	
	ind.scrollInstance.seekTo(slideIndex, 0);
	var currentSlide = $('#thumbnails .items div.slide:nth-child(' + (slideIndex + 1) + ')');
	currentSlide.find('div.galleria-image:nth-child(' + imgIndex + ')').addClass('active');
};

function manageNavArrows (that) {
	var prevNav = $('.reload-gallery .custom-gallery a.prev');
	var nextNav = $('.reload-gallery .custom-gallery a.next');
	prevNav.show().removeClass('disabled');
	nextNav.show().removeClass('disabled');							
	if (that.getSize() === 1 ) {
		prevNav.hide();
		nextNav.hide();
	}
	if (that.getIndex() === 0) {
		prevNav.addClass('disabled');
	}
	if (that.getIndex() === (that.getSize() - 1)) {
		nextNav.addClass('disabled');
	}
}
/* reload gallery helper functions END */

/* commercial carousel helper */
function commercialListLayout () {
	$('.item-list').each(function() {
		var centerLink = $(this).find('a:nth-child(2)');
		var margin = (276 - centerLink.width()) / 2;
		centerLink.css( {
			'left': margin,
			'right': margin,
			'position': 'absolute'
		});
	});
};
/* utility functions for voices section */
var VoicesUtils = (function(){
	
	var utilsSelectors = new Array(
		["voicesDebateBody"]
	);
	
	function executeLink(){
				$(utilsSelectors).each(function(i){
					$("."+utilsSelectors[i][0]).click(function(){
				window.location=$(this).find("a").attr("href"); 
			     return false;
			});
		});
	}
	
	function ivdripTeaserColor(){
		$(".ivdripTeaserView .article").each(function(index) {
		    var bgc = $(this).css('backgroundColor');
		    var bgc2 = "";
		    
		    if($(this).hasClass('colour0')) bgc2 = '#566154'; 
		    if($(this).hasClass('colour1')) bgc2 = '#777a41';
		    if($(this).hasClass('colour2')) bgc2 = '#3d3d3c';
		    if($(this).hasClass('colour3')) bgc2 = '#5b3e54';
		    if($(this).hasClass('colour4')) bgc2 = '#2e535a';
		    if($(this).hasClass('colour5')) bgc2 = '#5a4d4e';
		    
		    $(this).mouseenter(function() {
			if(bgc2) $(this).stop().animate({ backgroundColor: bgc2 }, 1000);
		    });
		    $(this).mouseleave(function() {
			$(this).stop().animate({ backgroundColor: bgc }, 1000);
		    })
		});
	}
	
	function getAndCheckUrl(){
		var url = window.location.href;
		var link = "#commentReference";
		if(url.indexOf(link) != -1){
			$(window).load(function () {
				 scrollTo(link);
			});
		}
	}
	
	function scrollTo(e, t, o){
		if (!o)
			o = 0;
		var y = ($(e).offset().top + o);
		$('html, body').animate({
			scrollTop : y
		}, t);
	}
	
	return{
		init: function(){
			executeLink();
			ivdripTeaserColor();
			getAndCheckUrl();
		}
	};
}());

function removeBorderLastMostMostMost(){  
    $(".mostViewed ul li:last-child .image").addClass("noBorderLi");              
}


function manageBordersMostMostMostTabsMenu(){ 
    $(".tabbingGroup ul.tabs li:first-child a").css("border-left","0px");
     
    //add right border to the first child of the most tab menu   
    $(".tabbingGroup ul.tabs li:first-child a").css("border-right","1px solid #DDDDDD");
     
    //add right border to the second child of the most tab menu 
    $(".tabbingGroup ul.tabs li:nth-child(2) a").css("border-right","1px solid #DDDDDD");    
    
     //remove left border to the second child of the most tab menu 
    $(".tabbingGroup ul.tabs li:nth-child(2) a").css("border-left","0px");    
    
    //remove left border to the third child of the most tab menu 
    $(".tabbingGroup ul.tabs li:nth-child(3) a").css("border-left","0px");    
}





function newsTicker(interval, fadeDuration){
	var list = $('.newsTicker li.news'),
		count = 1,
		interval = interval,
		fadeDuration = fadeDuration;
	
	if(list.length > 1){
		var fadeNewsInt = setInterval(fadeNewsTicker, interval);
	}

	function fadeNewsTicker() {
		var liLength = list.length,
			current = list.filter('.first'),
			nextLi = current.next();
		
		if (count <= liLength) {
			current.fadeOut(fadeDuration, function(){
				current.removeClass('first');
				nextLi.fadeIn(fadeDuration).addClass('first');
			});
			if (count == liLength) {
				current.fadeOut(fadeDuration, function(){
					list.first().addClass('first').fadeIn(fadeDuration);
				});
				count = 0;
			}
			count++;
		}
	}
	
}