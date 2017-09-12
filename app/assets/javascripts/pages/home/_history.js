/* global $ */
/* global sectionInitialize */
/* global cardEvents */
/* global contactEvents */

$( document ).on('turbolinks:load', function() {
  var history = 'section#history';
    var container = history + ' div#history-container';
      var cards = container + ' div#history-cards';
        var card = cards + ' .card';
          var contact = card + ' a.btn';
      var mechanism = container + ' div#history-mechanism';
        var track = mechanism + ' div#history-track';
          var detents = track + ' div#history-track-detents';
            var detent = detents + ' span';
        var slider = mechanism + ' div#history-slider';
  
  var $history = $(history);
    var $container = $(container);
        var $card = $(card);
          var $contact = $(contact);
      var $mechanism = $(mechanism);
        var $track = $(track);
          var $detents = $(detents);
        var $slider = $(slider);
  
  $detents.append('<span></span>'.repeat($card.length - 2));
  
  var $detent = $(detent);
  var detentIncrementRatio = 1 / ($detent.length + 1);
  
  $detent.each(function(i) {
    $(this).css({left: ((i + 1) * detentIncrementRatio * 100) + '%'});
  });
  
  var sliderRatio;
  
  sectionInitialize($history, $container);
  
  var detentSlider = function() {
  	var detentNumber = Math.round(sliderRatio / detentIncrementRatio);
  	
    sliderRatio = detentNumber / ($detent.length + 1);
    
    $slider.animate({left: (sliderRatio * 100) + '%'}, 500);
  };
  
  var trackSlider = function(userPosition) {
  	if ($mechanism.hasClass('mousedown')) {
      var trackLeft = $track.offset().left;
      var trackWidth = $track.innerWidth();
      
      var sliderLeftPx = userPosition - trackLeft;
      
      if (sliderLeftPx > 0 && sliderLeftPx < trackWidth) {
        sliderRatio = sliderLeftPx / trackWidth;
        
      	$slider.css({left: (sliderRatio * 100) + '%'});
      	
        indexCards(Math.round(sliderRatio / detentIncrementRatio));
      }
    }
  };
  
  var indexCards = cardEvents($card, function(newCardIndex) {
	  sliderRatio = newCardIndex * detentIncrementRatio;
	  $slider.stop();
	  detentSlider();
  });
  
  contactEvents($contact, 2000);
  
  var desktopMoveHandler = function(e) {
    e.preventDefault();
    trackSlider(e.pageX);
  };
  
  var mobileMoveHandler = function(e) {
    e.preventDefault();
    trackSlider(e.originalEvent.touches[0].pageX);
  };
  
  var endHandler = function() {
    $mechanism.removeClass('mousedown');
    $slider.stop();
    detentSlider();
    $( window ).off('mousemove', desktopMoveHandler);
    $( window ).off('touchmove', mobileMoveHandler);
    $( window ).off('mouseup', endHandler);
    $( window ).off('touchend touchcancel', endHandler);
  };
  
  $mechanism.on('mouseenter', function() {
    $mechanism.addClass('hover');
  });
  
  $mechanism.on('mouseleave', function() {
    $mechanism.removeClass('hover');
  });
  
  $mechanism.on('mousedown', function(e) {
    $mechanism.addClass('mousedown');
    $slider.stop();
    trackSlider(e.pageX);
    $( window ).on('mousemove', desktopMoveHandler);
    $( window ).on('mouseup', endHandler);
  });
  
  $mechanism.on('touchstart', function(e) {
    // e.preventDefault();
    $mechanism.addClass('mousedown');
    $slider.stop();
    trackSlider(e.originalEvent.touches[0].pageX);
    $( window ).on('touchmove', mobileMoveHandler);
    $( window ).on('touchend touchcancel', endHandler);
  });
});
