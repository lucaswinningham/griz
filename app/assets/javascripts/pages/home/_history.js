/* global $ */

$( document ).on('turbolinks:load', function() {
  var history = 'section#history';
    var track = history + ' div#track';
    var slider = history + ' div#slider';
  
  var $history = $(history);
    var $track = $(track);
    var $slider = $(slider);
  
  var $responsive = $([slider].join(', '));
  
  var mousedown;
  var trackTop;
  var trackBot;
  
  var trackExtents = function() {
    trackTop = $track.offset().top;
    trackBot = $track.offset().top + $track.outerHeight();
  };
  
  trackExtents();
  
  $( window ).resize(function() {
    trackExtents();
  });
  
  var trackSlider = function(userPosition) {
  	if ($slider.hasClass('mousedown')) {
  	  $slider.addClass('moving');
  	  
      var cssTop = parseInt($slider.css('top'));
      var diff = userPosition - mousedown;
      var top = $slider.offset().top;
      var bot = $slider.offset().top + $slider.outerHeight();
      var mid = (top + bot) / 2;
      
      if (userPosition > trackTop && userPosition < trackBot) {
        if ((mid + diff > trackTop) && (mid + diff < trackBot)) {
        	$slider.css({'top': userPosition - mousedown + cssTop + 'px'});
        }
      }
      
    	mousedown = userPosition;
    }
  };
  
  $responsive.on('mousedown', function() {
    $(this).addClass('mousedown');
  });
  
  $slider.on('mousedown', function(e) {
  	mousedown = e.pageY;
  });
  
  $slider.on('touchend touchcancel', function() {
    if (!$slider.hasClass('moving')) {
      $slider.removeClass('mousedown hover');
    }
  });
  
  $( window ).on('mousemove', function(e) {
    e.preventDefault();
    trackSlider(e.pageY);
  });
  
  $slider.on('touchmove', function(e) {
    trackSlider(e.originalEvent.touches[0].pageY);
  });
  
  $responsive.on('mouseenter', function() {
    $(this).addClass('hover');
  });
  
  $( window ).on('mouseup', function() {
    $slider.removeClass('mousedown hover moving');
  });
  
  $responsive.on('touchstart', function(e) {
    e.preventDefault();
    $(this).removeClass('moving').addClass('mousedown');
  	mousedown = e.originalEvent.touches[0].pageY;
  });
});
