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
  
  // todo
  // probably remove this entirely and individually select responsive elements
  var $responsive = $([slider, track].join(', '));
  
  var fixedBuffer = 200;
  var originalUserPosition;
  var detentIncrementRatio;
  var sliderRatio;
  
  var sectionFill = function() {
    $history.css({
      'height': (window.innerHeight + fixedBuffer) + 'px',
      'padding-bottom': fixedBuffer + 'px',
    });
    
    $container.css({
      'height': window.innerHeight + 'px',
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
  
  detentIncrementRatio = 1 / ($detent.length + 1);
  
  $detent.each(function(i) {
    $(this).css({top: ((i + 1) * detentIncrementRatio * 100) + '%'});
  });
  
  $( window ).resize(function() {
    sectionFill();
    handleFixed();
  });
  
  $( window ).scroll(handleFixed);
  
  var setContent = function(index) {
    $card.each(function(i) {
      if (i == index) {
        $(this).removeClass('away').addClass('focus');
      } else if (i < index) {
        $(this).removeClass('focus').addClass('away');
      } else {
        $(this).removeClass('away focus');
      }
    });
  };
  
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
      	
        setContent(Math.round(sliderRatio / detentIncrementRatio));
      }
    }
  };
  
  cardEvents($card, function(newCardIndex, forward) {
	  setContent(newCardIndex);
	  
	  sliderRatio = newCardIndex * detentIncrementRatio;
	  $slider.stop();
	  detentSlider();
  });
  
  contactEvents($contact, 2000, function() {
    var windowScrollTop = $( window ).scrollTop();
    var sectionTop = $history.offset().top;
    var sectionSnapTop = sectionTop + fixedBuffer;
    if (windowScrollTop > sectionTop && windowScrollTop < sectionSnapTop) {
      $( window ).scrollTop(sectionSnapTop);
    }
    
    // enableCardTransitionDuration(true);
    // detentCard($contactCard);
    $contactCard.removeClass('hover mousedown');
  });
  
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
  
  $( window ).on('mousemove', function(e) {
    e.preventDefault();
    trackSlider(e.pageY);
  });
  
  $mechanism.on('touchmove', function(e) {
    trackSlider(e.originalEvent.touches[0].pageY);
  });
  
  $( window ).on('mouseup', function() {
    $mechanism.removeClass('mousedown hover');
    detentSlider();
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
  
  $responsive.on('mouseenter', function() {
    $(this).addClass('hover');
  });
  
  $contact.on('mouseleave', function() {
    $contact.removeClass('hover mousedown');
  });
  
  $contact.on('touchstart', function(e) {
    e.preventDefault();
    $(this).addClass('hover mousedown');
  });
});
