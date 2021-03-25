(function ($) {
	"use strict"

	///////////////////////////
	// Preloader
	$(window).on('load', function () {
		$("#preloader").delay(600).fadeOut();
	});

	///////////////////////////
	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	///////////////////////////
	// Smooth scroll
	$("#nav .main-nav a[href^='#']").on('click', function (e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$('#back-to-top').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	///////////////////////////
	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function () {
		$('#nav').toggleClass('open');
	});

	///////////////////////////
	// Mobile dropdown
	$('.has-dropdown a').on('click', function () {
		$(this).parent().toggleClass('open-drop');
	});

	///////////////////////////
	// On Scroll
	$(window).on('scroll', function () {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	///////////////////////////
	// magnificPopup
	$('.work').magnificPopup({
		delegate: '.lightbox',
		type: 'image'
	});

	///////////////////////////
	// Owl Carousel
	$('#about-slider').owlCarousel({
		items: 1,
		loop: true,
		margin: 15,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		dots: true,
		autoplay: true,
		animateOut: 'fadeOut'
	});

	$('#testimonial-slider').owlCarousel({
		loop: true,
		margin: 15,
		dots: true,
		nav: false,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			992: {
				items: 2
			}
		}
	});

	///////////////////////////
	// Input mask
	$('input[type="tel"]').mask("+9 (999) 999-99-99");

	///////////////////////////
	// Form

	$("form").on("submit", function (event) {

		event.preventDefault();

		var inp = $(this).find('input');
		var form = $(this).data('form');

		$.ajax({
			type: "POST",
			url: 'php/mail.php',
			data: $(this).serialize(),
			dataType: "json",
			beforeSend: function () {
				$(inp).prop("disabled", true);
			},
			success: function (data) {
				if (data.type == 'error') {
					$('form[data-form=' + form + ']').parent().addClass('error');
					$('form[data-form=' + form + ']').hide();
					$('form[data-form=' + form + ']').parent().html('<p>' + data.text + '</p>');
				}
				if (data.type == 'complete') {
					$('form[data-form=' + form + ']').parent().addClass('success');
					$('form[data-form=' + form + ']').hide();
					$('form[data-form=' + form + ']').parent().html('<p>' + data.text + '</p>');
				}
			},
			error: function (data) {
				console.log('error.');
				console.log(data);
			}
		});

	});

})(jQuery);