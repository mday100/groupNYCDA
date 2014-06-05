// jQuery Captify Plugin

// Copyright (C) 2009 Brian Reavis

// Licenced under the MIT license

// $Date: 2011/05/18 $

jQuery.fn.extend({

	captify: function(uo) {

		var o = $.extend({

			speedOver: 'fast',				// speed of the mouseover effect

			speedOut: 'normal',				// speed of the mouseout effect

			hideDelay: 500,					// how long to delay the hiding of the caption after mouseout (ms)

			animation: 'slide',				// 'fade', 'slide', 'always-on'

			prefix: '',						// text/html to be placed at the beginning of every caption

			opacity: '0.45',				// opacity of the caption on mouse over

			className: 'caption-bottom',	// the name of the CSS class to apply to the caption box         

			position: 'bottom',				// position of the caption (top or bottom)         

			spanWidth: '100%'				// caption span % of the image

		}, uo);

//		$(this).each(function() {
		return $(this).each(function() {
			
			var img = this;

//			$(this).load(function() {
//
//				if (img.hasInit){ return false; }

			$(this).load(function( e ) {
				e.stopPropagation();
				if (img.hasInit){ return false; }
			
				img.hasInit = true;

				var over_caption = false;

				var over_img = false;
				
				//pull the label from another element if there is a 

				//valid element id inside the rel="..." attribute, otherwise,

				//just use the text in the alt="..." attribute.

				var captionLabelSrc = $('#' + $(this).attr('rel'));

				var captionLabelHTML = !captionLabelSrc.length ? $(this).attr('alt') : captionLabelSrc.html();

				captionLabelSrc.remove();

				var toWrap = this.parent && this.parent.tagName == 'a' ? this.parent : $(this);

				

				var wrapper = toWrap.wrap('<div></div>').parent();

				wrapper.css({

						overflow: 'hidden',
						padding: 0

					});

					wrapper.addClass('caption-wrapper');

					wrapper.width($(this).width());
				if(ieVersion == "7"){
					wrapper.height($(this).height()-4);
				}else{
					wrapper.height($(this).height());
				}

				//transfer the margin and border properties from the image to the wrapper

				$.map(['top', 'right', 'bottom', 'left'], function(i) {

					wrapper.css('margin-' + i, $(img).css('margin-' + i));

					$.map(['style', 'width', 'color'], function(j) {

						var key = 'border-' + i + '-' + j;

						wrapper.css(key, $(img).css(key));

					});

				});

				$(img).css({ border: '0 none' });



				//create two consecutive divs, one for the semi-transparent background,

				//and other other for the fully-opaque label

				var caption = $('div:last', wrapper.append('<div></div>'))

					.addClass(o.className);
				

					

				var captionContent = $('div:last', wrapper.append('<div></div>'))

					.addClass(o.className)

					.append(o.prefix)

					.append(captionLabelHTML);
				
				


				//override hiding from CSS, and reset all margins (which could have been inherited)

				$('*', wrapper).css({ margin: 0 }).show();



				//ensure the background is on bottom

				var captionPositioning = jQuery.browser.msie ? 'static' : 'relative';

				caption.css({

					zIndex: 1,

					position: captionPositioning,

					opacity: o.animation == 'fade' ? 0 : o.opacity,

					width: o.spanWidth

				});

				if (o.position == 'bottom'){

					var vLabelOffset = 

						parseInt(caption.css('border-top-width').replace('px', '')) + 

						parseInt(captionContent.css('padding-top').replace('px', '')) - 1;

					captionContent.css('paddingTop', vLabelOffset);

				}

				//clear the backgrounds/borders from the label, and make it fully-opaque

				captionContent.css({

					position: captionPositioning,

					zIndex: 2,

					background: 'none',

					'background-color': '#fff',
					
					color : '#000',
					
					'white-space': 'normal',
					
					'font-weight' : 'bold',
					
					border: '0 none',

					opacity: o.animation == 'fade' ? 0 : 0.9,

					width: o.spanWidth,
					
					'padding-left': '5px',
					
					'padding-right': '5px',
						
					bottom: 0

				});

				caption.width(captionContent.outerWidth());
				caption.height(captionContent.height());
				
				// modification for footer filmstrip
				var titleHeight;
				captionContent.find('.fs_title').height() !== null ? titleHeight = captionContent.find('.fs_title').height() + 10 : titleHeight = 0;

				// represents caption margin positioning for hide and show states

				var topBorderAdj = o.position == 'bottom' && jQuery.browser.msie ? -4 : 0;

				var captionPosition = o.position == 'top'

				   ? { hide: -$(img).height() - caption.outerHeight() - 1, show: -$(img).height() }

				   : { hide: -titleHeight, show: -caption.outerHeight() + topBorderAdj };
				

				//pull the label up on top of the background

				captionContent.css('marginTop', -caption.outerHeight()-4);

				caption.css('marginTop', captionPosition[o.animation == 'fade' || o.animation == 'always-on' ? 'show' : 'hide']);

				

				//function to push the caption out of view

				var cHide = function() {

					if (!over_caption && !over_img){

						var props = o.animation == 'fade'

							? { opacity: 0 }

							: { marginTop: captionPosition.hide };

						caption.animate(props, o.speedOut);

						if (o.animation == 'fade'){

							captionContent.animate({opacity: 0}, o.speedOver);

						}

					}

				};



				if (o.animation != 'always-on'){

					//when the mouse is over the image

					var hoverItem = "";
					titleHeight === 0 ? hoverItem = this : hoverItem = wrapper;
					
					$(hoverItem).hover(

						function() {

							over_img = true;

							if (!over_caption) {

								var props = o.animation == 'fade'

									? { opacity: o.opacity }

									: { marginTop: captionPosition.show };

								caption.animate(props, o.speedOver);

								if (o.animation == 'fade'){

									captionContent.animate({opacity: 1}, o.speedOver/2);

								}

							}

						},

						function() {

							over_img = false;

							window.setTimeout(cHide, o.hideDelay);

						}

					);

					//when the mouse is over the caption on top of the image (the caption is a sibling of the image)

					if (titleHeight === 0) {
						$('div', wrapper).hover(
								
							function() { over_caption = true; },
	
							function() { over_caption = false; window.setTimeout(cHide, o.hideDelay); }
	
						);
					}

				}

			});
			//if the image has already loaded (due to being cached), force the load function to be called

			if (this.complete || this.naturalWidth > 0) {

				$(img).trigger('load');

			}

		});

	}

});
