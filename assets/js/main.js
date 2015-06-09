
/* Init Skrollr */
$(document).ready(function() {
	var s = null;
	var options = { forceHeight: false };

	if ($(window).width() > 767) {
		s = skrollr.init(options);
	}
	
  //Disable Skrollr when on small screen
	$(window).on('resize', function() {
		if ($(window).width() <= 767 && s !== null) {
			s.destroy();
			s = null;
		}
		else if ($(window).width() > 767 && s === null) {
			s = skrollr.init(options);
		}
	});
});

/* Init Sticky Navigation */
$(document).ready(function() {
	$('.navbar .navbar-collapse').waypoint('sticky');
});