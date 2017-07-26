/* global $ */

$( document ).on('turbolinks:load', function() {
  var history = 'section#history';
    var track = history + ' div#history-track';
      var detents = track + ' div#history-track-detents';
        var detent = detents + ' span';
    var slider = history + ' div#history-slider';
    var cards = history + ' div#history-cards';
      var card = cards + ' div.history-card';
  
  var $history = $(history);
    var $track = $(track);
    var $slider = $(slider);
    var $detents = $(detents);
    var $cards = $(cards);
  
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
    var card = '<div class="history-card">' + cardHead + cardBody + '</div>';
    $cards.append(card);
  });
  
  var $detent = $(detent);
  var $card = $(card);
  
  var $responsive = $([slider].join(', '));
  
  var mousedown;
  var trackTop;
  var trackBot;
  var pxDetentIncrement;
  var detentInflections;
  
  var sectionFill = function() {
    $history.css({
      'height': $( window ).height(),
    });
  };
  
  sectionFill();
  
  var repositionSlider = function() {
    var trackOffset = Math.floor($track.position().top);
    var sliderRatio = (parseInt($slider.css('top')) - trackOffset) / (trackBot - trackTop);
    var newSliderPosition = $track.outerHeight() * sliderRatio + trackOffset;
    console.log(sliderRatio)
    $slider.css({top: newSliderPosition + 'px'});
  };
  
  var trackExtents = function() {
    trackTop = $track.offset().top;
    trackBot = $track.offset().top + $track.outerHeight();
  };
  
  trackExtents();
  
  var positionDetents = function() {
    pxDetentIncrement = (trackBot - trackTop) / ($detent.length + 1);
  	detentInflections = [0.5 * pxDetentIncrement];
    
    $detent.each(function(i) {
      $(this).css({top: (pxDetentIncrement * (i + 1)) + 'px'});
      detentInflections.push(pxDetentIncrement * (i + 1.5));
    });
  };
  
  positionDetents();
  
  $( window ).resize(function() {
    sectionFill();
    repositionSlider();
    trackExtents();
    positionDetents();
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
          var newSliderPosition = diff + cssTop;
          
        	$slider.css({top: newSliderPosition + 'px'});
        	
        	var relativeSliderPosition = newSliderPosition - $track.position().top;
          
          $card.each(function(i) {
            if (relativeSliderPosition > detentInflections[i]) {
              if (relativeSliderPosition < detentInflections[i + 1]) {
                $(this).removeClass('away').addClass('focus');
              } else {
                $(this).removeClass('focus').addClass('away');
              }
            } else {
              $(this).removeClass('focus away');
            }
          });
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
