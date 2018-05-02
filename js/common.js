		(function() {
			var id = 0;
			$('.animate').scroll(function() {
				clearInterval(id)
				id = performance()
			});
			window.onscroll = function() {
				clearInterval(id)
				id = performance()
			}

			function headerFadein() {
				var height = window.innerHeight / 2.5;
				var top = document.documentElement.scrollTop || document.body.scrollTop || $('.animate').scrollTop();
				if (height < top) {
					$('.header').css('opacity', 1)
					return true;
				} else {
					// if (parseInt($('.header').css('opacity')) == 1) {
					// 	return true;
					// }
					$('.header').css('opacity', 0)
				}
				var opacity = 1 - ((top) / height).toFixed(2);
				// window.innerWidth >= 991 && height < top ? $('.header').css('opacity', 0) : $('.header').css('opacity', 1);;
			}

			function performance() {
				return setTimeout(function() {
					headerFadein()
				}, 50);
			}
		})();

		function fix_screen(hide) {
			var top = document.documentElement.scrollTop || document.body.scrollTop;
			if (hide == 'hide') {
				document.documentElement.style.overflow = 'hidden';
				$('body').addClass('active').css('top', '-' + top + 'px');
			} else {
				$('body').removeClass('active');
				document.documentElement.style.overflow = 'auto';
				document.documentElement.scrollTop = -parseInt($('body').css('top'));
				document.body.scrollTop = -parseInt($('body').css('top'));
			}
		}

		$('.header .mobile-menu-toggle').on('click', function() {
			$(this).toggleClass('active').siblings('.nav').toggleClass('active');
			fix_screen('hide');
		});
		$('.header .nav a').on('click', function() {
			return false;
		});
		$('.header .nav').on('click', function() {
			if ($(this).hasClass('active')) {
				fix_screen();
				$(this).removeClass('active');
				$('.header .mobile-menu-toggle').removeClass('active');
			}
		});


		$('.public-content').scrollLeft(10000)
		$('.public-content .public-menu .menu-status').on('click', function() {
			if ($(this).toggleClass('active').hasClass('active')) {
				$('.public-content').animate({
					scrollLeft: 0
				}, 300)
			} else {
				var width = parseInt($('.public-content .container .row .col-xs-3').width()) + parseInt($('.public-content .container .row .col-xs-9').width())
				$('.public-content').animate({
					scrollLeft: width
				}, 300)
			}
		});

		var mySwiper = new Swiper('.who-is-we .swiper-container', {
			effect: 'coverflow',
			initialSlide: 3,
			slidesPerView: 2,
			centeredSlides: true,
			pagination: '.swiper-pagination',
			coverflow: {
				rotate: 0,
				stretch: 40,
				depth: 80,
				modifier: 2,
				slideShadows: false
			},
			breakpoints: {
				767: {
					slidesPerView: 2,
				}
			},
			onTap: function(swiper) {
				typeof(swiper.clickedIndex) != 'undefined' && swiper.slideTo(swiper.clickedIndex)
			}
		})
		var mySwiper = new Swiper('.banner .swiper-container', {
			// nextButton: '.swiper-button-next',
			// prevButton: '.swiper-button-prev',
			// pagination: '.swiper-pagination',
			autoplay: 3000,
			autoplayDisableOnInteraction: false,
			paginationClickable: true,
		})



		$('.public-content .child-page .content .clause .indexes a').on('click', function() {
			$(this).addClass('active').siblings().removeClass('active');
			var name = $(this).attr('href').split('#')[1];
			var bodytop = document.documentElement.scrollTop || document.body.scrollTop;
			var offsetTop = $('*[name=' + name + ']').offset().top;
			var animatetop = $('.animate ').scrollTop();
			if (animatetop > 0) {
				$('.animate ').animate({
					scrollTop: offsetTop + animatetop - 20
				}, 300);
			} else {
				$('html,body').animate({
					scrollTop: offsetTop - 100
				}, 300);
			}
		});


		// $('.public-content .child-page .content .clause .indexes').length != 0 && $('.public-content .child-page .content .clause .indexes').attr('data-top', $('.public-content .child-page .content .clause .indexes').offset().top)
		// $('.public-content .child-page .content .clause .indexes').length != 0 && $('.public-content .child-page .content .clause .indexes').attr('data-width', $('.public-content .child-page .content .clause .indexes').width());

		// $('.animate').on('scroll', function() {
		// 	var animatetop = $('.animate ').scrollTop();
		// 	var offsetTop = parseInt($('.public-content .child-page .content .clause .indexes').attr('data-top'));

		// 	if (animatetop >= offsetTop) {
		// 		$('.public-content .child-page .content .clause .indexes').addClass('active')
		// 		$('.public-content .child-page .content .clause .indexes').width($('.public-content .child-page .content .clause .indexes').attr('data-width'))
		// 		$('.public-content .child-page .content .clause .indexes').css('top', animatetop);
		// 	} else {
		// 		$('.public-content .child-page .content .clause .indexes').removeClass('active')
		// 		$('.public-content .child-page .content .clause .indexes').css('width', 'auto');
		// 	}
		// });


		// $(window).on('scroll', function() {
		// 	if (window.innerWidth >= 768) {
		// 		var animatetop = $(window).scrollTop()
		// 		var offsetTop = parseInt($('.public-content .child-page .content .clause .indexes').attr('data-top'));
		// 		if (animatetop >= offsetTop - 100) {
		// 			$('.public-content .child-page .content .clause .indexes').addClass('active')
		// 			$('.public-content .child-page .content .clause .indexes').width($('.public-content .child-page .content .clause .indexes').attr('data-width'))
		// 			$('.public-content .child-page .content .clause .indexes').css('top', 100);
		// 		} else {
		// 			$('.public-content .child-page .content .clause .indexes').removeClass('active')
		// 			$('.public-content .child-page .content .clause .indexes').css('width', 'auto');
		// 		}
		// 	}
		// });

		$(window).on('resize', function() {
			// $('.public-content .child-page .content .clause .indexes').length != 0 && $('.public-content .child-page .content .clause .indexes').attr('data-top', $('.public-content .child-page .content .clause .indexes').offset().top)
			// $('.public-content .child-page .content .clause .indexes').length != 0 && $('.public-content .child-page .content .clause .indexes').attr('data-width', $('.public-content .child-page .content .clause .indexes').width());
		});
		var mySwiper = new Swiper('.health-rural-list .swiper-container', {
			// nextButton: '.swiper-button-next',
			// prevButton: '.swiper-button-prev',
			// pagination: '.swiper-pagination',
			autoplay: 3000,
			autoplayDisableOnInteraction: false,
			paginationClickable: true,
			slidesPerView: 5,
			spaceBetween: 5,
			breakpoints: {
				640: {
					slidesPerView: 3,
				}
			}
		})
		$('.health-rural-list .swiper-container .swiper-slide img').on('click', function() {
			var src = $(this).attr('src');
			$('.health-content .health-rural-list .big img').attr('src', src);
			var str = $(this).parent().attr('data-title')
			$('.health-content .health-rural-list .big .tips').text(str);
		});
