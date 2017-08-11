/* global $ */

$( document ).on('turbolinks:load', function() {
  var history = 'section#history';
    var container = history + ' div#history-container';
      var mechanism = container + ' div#history-mechanism';
        var track = mechanism + ' div#history-track';
          var detents = track + ' div#history-track-detents';
            var detent = detents + ' span';
        var slider = mechanism + ' div#history-slider';
      var cards = container + ' div#history-cards';
        var card = cards + ' div.history-card';
        var heroCard = cards + ' div#history-card-hero';
        var contactCard = cards + ' div#history-card-contact';
              var contact = contactCard + ' div div.history-card-body a#history-contact';
  
  var $history = $(history);
    var $container = $(container);
      var $mechanism = $(mechanism);
        var $track = $(track);
          var $detents = $(detents);
        var $slider = $(slider);
        var $cards = $(cards);
        var $heroCard = $(heroCard);
        var $contactCard = $(contactCard);
              var $contact = $(contact);
  
  var content = [
    {
      head: '2017',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      head: '2016',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      head: '2015',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      head: '2014',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];
  
  content.forEach(function(val, i) {
    $detents.append('<span></span>');
    
    var cardHead = '<div class="history-card-head"><span>' + val.head + '</span></div>';
    var cardBody = '<div class="history-card-body">' + val.body + '</div>';
    var card = '<div class="history-card"><div>' + cardHead + cardBody + '</div></div>';
    $(card).insertBefore($contactCard);
  });
  
  var $detent = $(detent);
  var $card = $(card);
  
  var $responsive = $([slider, track, contact].join(', '));
  
  var fixedBuffer = 200;
  
  var pxDetentIncrement;
  // var detentInflections;
  var sliderRatio;
  
  var sectionFill = function() {
    $history.css({
      'height': ($( window ).height() + fixedBuffer) + 'px',
      'padding-bottom': fixedBuffer + 'px',
    });
    
    $container.css({
      'height': $( window ).height() + 'px',
    });
  };
  
  sectionFill();
  
  var handleFixed = function() {
    var scrollPosition = Math.round($( document ).scrollTop());
    var fixedTop = $history.offset().top;
    var fixedBottom = $history.offset().top + fixedBuffer;
    
    if (scrollPosition < fixedTop) {
      $container.css({
        'position': 'absolute',
        'top': '0px',
      });
    } else if (scrollPosition > fixedBottom) {
      $container.css({
        'position': 'absolute',
        'top': fixedBuffer + 'px',
      });
    } else {
      $container.css({
        'position': 'fixed',
        'top': '0px',
      });
    }
  };
  
  handleFixed();
  
  var positionDetents = function() {
    pxDetentIncrement = $track.outerHeight() / ($detent.length + 1);
    
    $detent.each(function(i) {
      $(this).css({top: (pxDetentIncrement * (i + 1)) + 'px'});
    });
  };
  
  positionDetents();
  
  var detentSlider = function() {
  	var sliderPosition = parseInt($slider.css('top'), 10);
    var newSliderTarget = Math.round(sliderPosition / pxDetentIncrement);
    var newSliderPosition = newSliderTarget * pxDetentIncrement;
    
    $slider.animate({top: newSliderPosition + 'px'}, 500);
  };
  
  $( window ).resize(function() {
    sectionFill();
    handleFixed();
    $slider.stop();
    $slider.css({top: ($track.outerHeight() * sliderRatio) + 'px'});
    positionDetents();
    detentSlider();
  });
  
  $( window ).scroll(function() {
    handleFixed();
  });
  
  var handleCards = function() {
  	var sliderPosition = parseInt($slider.css('top'), 10);
    var newSliderTarget = Math.round(sliderPosition / pxDetentIncrement);
    
    $card.removeClass('away focus');
    
    $card.each(function(i) {
      if (i == newSliderTarget) {
        $(this).addClass('focus');
      } else if (i > newSliderTarget) {
        $(this).addClass('away');
      }
    });
  };
  
  var trackSlider = function(userPosition) {
  	if ($mechanism.hasClass('mousedown')) {
      var newSliderPosition = userPosition - $track.offset().top;
      
      if (newSliderPosition > 0 && newSliderPosition < $track.outerHeight()) {
      	$slider.css({top: newSliderPosition + 'px'});
      	
        sliderRatio = newSliderPosition / $track.outerHeight();
        
        handleCards(newSliderPosition - $track.position().top);
      }
    }
  };
  
  $mechanism.on('mousedown', function(e) {
    $mechanism.addClass('mousedown');
    $slider.stop();
    trackSlider(e.pageY);
  });
  
  $contact.on('mousedown', function() {
    $contact.addClass('mousedown');
  });
  
  $mechanism.on('touchend touchcancel', function() {
    $mechanism.removeClass('mousedown hover');
    detentSlider();
  });
  
  // Screen actually follows link when mouseup event used instead of click
  $contact.on('click touchend touchcancel', function(e) {
    e.preventDefault();
    
    $contact.removeClass('mousedown hover');
    
    // todo
    // make animate function a variable and use .off() on that var
    // do the same for every other _section.js that reused this code
    
    $('html, body').on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function() {
      $('html, body').stop();
      $('html, body').off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove');
    });
    
    var top = $('#contact').offset().top;
    var border = parseInt($('#contact').css('border-top-width'), 10);
    $('html, body').animate({scrollTop: top + border}, 2000, function() {
      $('html, body').off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove');
    });
    
    return false;
  });
  
  $( window ).on('mousemove', function(e) {
    e.preventDefault();
    trackSlider(e.pageY);
  });
  
  $mechanism.on('touchmove', function(e) {
    trackSlider(e.originalEvent.touches[0].pageY);
  });
  
  $responsive.on('mouseenter', function() {
    $(this).addClass('hover');
  });
  
  $( window ).on('mouseup', function() {
    $mechanism.removeClass('mousedown hover');
    detentSlider();
  });
  
  $contact.on('mouseleave', function() {
    $contact.removeClass('hover mousedown');
  });
  
  $mechanism.on('mouseleave', function() {
    $mechanism.removeClass('hover');
  });
  
  $mechanism.on('touchstart', function(e) {
    e.preventDefault();
    $slider.stop();
    $mechanism.addClass('mousedown');
    trackSlider(e.originalEvent.touches[0].pageY);
  });
  
  $contact.on('touchstart', function(e) {
    e.preventDefault();
    $(this).addClass('mousedown');
  });
});
