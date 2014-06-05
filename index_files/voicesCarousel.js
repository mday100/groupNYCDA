ind.carousel = {};
//ind.carousel.autoSlide_active = true;
//ind.carousel.autoSlide_interval = 2000;


function VoicesCarousel(container, autoSlide_active, autoSlide_interval){
			var autoSlide_count = 1;
			this.autoSlide_active = autoSlide_active;
			this.autoSlide_interval = autoSlide_interval;
			this.container = container;
			var count = 0;
			var NumberOfCarousel =$('#'+container+' .carouselNav ul li').length - 2;
			var next_button = $('#'+container+' .carouselNav ul li.next');
			var prev_button = $('#'+container+' .carouselNav ul li.prev');
			
			$('.fullWidth .textAreaBg').css({ opacity: 0.5 });
	
			function hideCarousel(){
				$('.voicescarousel').hide();
				$('.carousel1').show();
				$('.carouselNav ul li.one').addClass('active');
			}
	
			function showCarousel(showThis){
				$('#'+container+' .voicescarousel').hide();
				$('#'+container+' .'+showThis).show();
				$('.carouselNav ul li').removeClass('active');
			}
	
			var carouselItems = new Array(
				["carouselNavList_1", "carousel1"],
				["carouselNavList_2", "carousel2"],
				["carouselNavList_3", "carousel3"],
				["carouselNavList_4", "carousel4"],
				["carouselNavList_5", "carousel5"],
				["carouselNavList_6", "carousel6"],
				["carouselNavList_7", "carousel7"],
				["carouselNavList_8", "carousel8"],
				["carouselNavList_9", "carousel9"],
				["carouselNavList_10", "carousel10"]
			);
	
			function selectCarousel(){
				var totalCarouselItems = $("#"+container+" > div.voicescarousel").size() - 1;
				$(carouselItems).each(function(i){
					$('.carouselNav ul li.'+carouselItems[i][0]).click(function(){
						//alert('hello');
						stop_autoSlide();
						showCarousel(carouselItems[i][1]);
						$(this).addClass('active');
						var n = $.inArray(carouselItems[i], carouselItems);
						//alert($.inArray(carouselItems[i], carouselItems));
						count = n;
						if (i == 0) {
							next_button.removeClass('carouselHidden');
							prev_button.addClass('carouselHidden');
						}
						if ((i > 0) && (i < totalCarouselItems)) {
							next_button.removeClass('carouselHidden');
							prev_button.removeClass('carouselHidden');
						}
						if (i == totalCarouselItems) {
							next_button.addClass('carouselHidden');
							prev_button.removeClass('carouselHidden');
						}
					});
				});
			}
	
			function executeNext(){
				next_button.click(function(){
					stop_autoSlide();
					if(count<NumberOfCarousel){
						count++;
						if(count!=NumberOfCarousel){
							showCarousel(carouselItems[count][1]);
							$('.carouselNav ul li.'+carouselItems[count][0]).addClass('active');
						}
						if(count==NumberOfCarousel){
							count--;
						}
					}
					if (count == (NumberOfCarousel-1)) {
						next_button.addClass('carouselHidden');
						prev_button.removeClass('carouselHidden');
					}
					else {
						next_button.removeClass('carouselHidden');
						prev_button.removeClass('carouselHidden');
					}
				});
			}
	
			function executePrev(){
				prev_button.click(function(){
				stop_autoSlide();
					if(count>0){
						count--;
						showCarousel(carouselItems[count][1]);
						$('.carouselNav ul li.'+carouselItems[count][0]).addClass('active');
					}
					if (count == 0) {
						next_button.removeClass('carouselHidden');
						prev_button.addClass('carouselHidden');
					}
					else {
						next_button.removeClass('carouselHidden');
						prev_button.removeClass('carouselHidden');
					}
				});
			}
			
			function executeLinks(){
				$(carouselItems).each(function(i){
					//carousel link
					$('#'+container+" ."+carouselItems[i][1]).click(function(){
						window.location=$(this).find(".heading a").attr("href"); 
					     return false;
					});
					//carousel comment count link
					$('#'+container+" ."+carouselItems[i][1]+' .commentsCount').click(function(){
						window.location=$(this).find("a").attr("href"); 
					     return false;
					});
				});
			}
			
			function autoSlide(){
				var total_car = $("#"+container+" > div.voicescarousel").size();
				if(autoSlide_count == 0){
					autoSlide_count = 1;
				}
				if(autoSlide_count < total_car){
					showCarousel(carouselItems[autoSlide_count][1]);
					$('.carouselNav ul li.'+carouselItems[autoSlide_count][0]).addClass('active');
					autoSlide_count++;
					count++;
				}else if(autoSlide_count == total_car){
					autoSlide_count = 0;
					count = 0;
					showCarousel(carouselItems[autoSlide_count][1]);
					$('.carouselNav ul li.'+carouselItems[autoSlide_count][0]).addClass('active');
				}
			}
			
			function execute_autoSlide(){
				if(autoSlide_active == true){autoSlide_active = setInterval(function(){autoSlide()},autoSlide_interval);}
			}
			
			function execute_autoSlide_miniCarousel(){
				if(autoSlide_active == true){prev_button.removeClass('carouselHidden');autoSlide_active = setInterval(function(){autoSlide()},autoSlide_interval);}
			}
			
			function stop_autoSlide(){
				next_button.removeClass('carouselHidden');
				clearInterval(autoSlide_active);
			}
			
			return{
				largeCarousel:function(){
					//hide previous button for mini-carousel when auto scroll is disabled
					if(autoSlide_active == false){prev_button.addClass('carouselHidden');}
					hideCarousel();
					selectCarousel();
					executeNext();
					executePrev();
					executeLinks();
					window.onload=function(){execute_autoSlide();}
				},
				miniCarousel:function(){
					//hide previous button for mini-carousel when auto scroll is disabled
					if(autoSlide_active == false){prev_button.addClass('carouselHidden');}
					hideCarousel();
					selectCarousel();
					executeNext();
					executePrev();
					executeLinks();
					window.onload=function(){execute_autoSlide_miniCarousel();}
				}
			}

		}