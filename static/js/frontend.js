$(document).ready(function() {
	
	$('h3.position').on('click', function() {
		$(this).siblings('.jobdescription').slideToggle('fast');
		$(this).toggleClass('active');
	});
	
	$('.nav-trigger').on('click', function() {
		$('#wrapper').toggleClass('moved');
		$('.navigation').toggleClass('open');
	});
	
	$('.navigation ul li a').on('click', function() {
		$('#wrapper').removeClass('moved');
		$('.navigation').removeClass('open');
	});
	
// Smooth scroll
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();

		var target = this.hash,
	    $target = $(target);

		if ($target && $target.length > 0) {
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 500, 'swing', function () {
				window.location.hash = target;
			});
		};
	});


// Set class when scrolled to
	$.fn.visible = function(partial) {
		var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
	};
	
	
	$(window).scroll(function(event) {

		$('.skillrating li').each(function(i, el) {
			var el = $(el);
			if (el.visible(true)) {
		  		el.addClass('show'); 
		  	} 
		});
	});
	
	


	
	
	
}); //document ready