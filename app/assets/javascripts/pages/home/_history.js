/* global $ */
/* global sectionInitialize */
/* global cardEvents */
/* global contactEvents */

$( document ).on('turbolinks:load', function() {
  var history = 'section#history';
    var container = history + ' div#history-container';
      var cards = container + ' div#history-cards';
        var card = cards + ' .card';
          var contact = card + ' .btn-contact';
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
    $(this).css({top: ((i + 1) * detentIncrementRatio * 100) + '%'});
  });
  
  var sliderRatio;
  
  sectionInitialize($history, $container);
  
  var detentSlider = function() {
  	var detentNumber = Math.round(sliderRatio / detentIncrementRatio);
  	
    sliderRatio = detentNumber / ($detent.length + 1);
    
    $slider.animate({top: (sliderRatio * 100) + '%'}, 500);
  };
  
  var trackSlider = function(userPosition) {
  	if ($mechanism.hasClass('mousedown')) {
      var sliderTopPx = userPosition - $track.offset().top;
      
      if (sliderTopPx > 0 && sliderTopPx < $track.outerHeight()) {
        sliderRatio = sliderTopPx / $track.outerHeight();
        
      	$slider.css({top: (sliderRatio * 100) + '%'});
      	
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
  
  $mechanism.on('mouseenter', function() {
    $mechanism.addClass('hover');
  });
  
  $mechanism.on('mouseleave', function() {
    $mechanism.removeClass('hover');
  });
  
  $mechanism.on('mousedown', function(e) {
    $mechanism.addClass('mousedown');
    $slider.stop();
    trackSlider(e.pageY);
  });
  
  $mechanism.on('touchstart', function(e) {
    e.preventDefault();
    $slider.stop();
    $mechanism.addClass('mousedown');
    trackSlider(e.originalEvent.touches[0].pageY);
  });
  
  $( window ).on('mousemove', function(e) {
    e.preventDefault();
    trackSlider(e.pageY);
  });
  
  $mechanism.on('touchmove', function(e) {
    trackSlider(e.originalEvent.touches[0].pageY);
  });
  
  $( window ).on('mouseup touchend touchcancel', function() {
    $mechanism.removeClass('mousedown');
    detentSlider();
  });
});
