/* global $ */

var sectionInitialize = function($section, $container, pxBuffer) {
  var pxBuffer = (pxBuffer === undefined ? 200 : pxBuffer);
  
  var sectionFill = function() {
    $section.css({
      'height': (window.innerHeight + pxBuffer) + 'px',
      'padding-bottom': pxBuffer + 'px',
    });
    
    $container.css({
      'height': window.innerHeight + 'px',
    });
  };
  
  sectionFill();
  
  var handleFixed = function() {
    var scrollPosition = Math.round($( document ).scrollTop());
    var fixedTop = $section.offset().top;
    var fixedBottom = $section.offset().top + pxBuffer;
    
    if (scrollPosition < fixedTop) {
      $container.css({
        'position': 'absolute',
        'top': '0px',
      });
    } else if (scrollPosition > fixedBottom) {
      $container.css({
        'position': 'absolute',
        'top': pxBuffer + 'px',
      });
    } else {
      $container.css({
        'position': 'fixed',
        'top': '0px',
      });
    }
  };
  
  handleFixed();
  
  $( window ).resize(function() {
    sectionFill();
    handleFixed();
  });
  
  $( window ).scroll(handleFixed);
};

var responsiveEvents = function($responsive, onClick, clickEvents) {
  onClick = (onClick === undefined ? function() {} : onClick);
  
  clickEvents = (clickEvents === undefined ? 'mouseup touchend touchcancel' : clickEvents);
  
  $responsive.on('mouseenter', function() {
    $(this).addClass('hover');
  });
  
  $responsive.on('mouseleave', function() {
    $(this).removeClass('hover mousedown');
  });
  
  $responsive.on('mousedown', function() {
    $(this).addClass('mousedown');
  });
  
  $responsive.on('touchstart', function(e) {
    e.preventDefault();
    $(this).addClass('mousedown');
  });
  
  $responsive.on(clickEvents, function(e) {
    if ($(this).hasClass('mousedown')) {
      $(this).removeClass('mousedown');
      
      onClick.bind(this)(e);
    }
  });
};

var burgerEvents = function($burger, msClose, msOpen, callbacks) {
  msClose = (msClose === undefined ? 300 : msClose);
  msOpen = (msOpen === undefined ? 150 : msOpen);
  
  if (callbacks === undefined) {
    callbacks = {
      onOpening: function() {},
      onOpened: function() {},
      onClosing: function() {},
      onClosed: function() {}
    };
  } else {
    callbacks.onOpening = (callbacks.onOpening === undefined ? function() {} : callbacks.onOpening);
    callbacks.onOpened = (callbacks.onOpened === undefined ? function() {} : callbacks.onOpened);
    callbacks.onClosing = (callbacks.onClosing === undefined ? function() {} : callbacks.onClosing);
    callbacks.onClosed = (callbacks.onClosed === undefined ? function() {} : callbacks.onClosed);
  }
  
  if (!$burger.hasClass('opened')) {
    $burger.addClass('closed');
  }
  
  responsiveEvents($burger, function() {
    window.clearTimeout($burger.timeout);
    
    if ($burger.hasClass('opened') || $burger.hasClass('opening') ) {
      $burger.removeClass('opening').addClass('closing');
      
      callbacks.onClosing();
      
      $burger.timeout = window.setTimeout(function() {
        $burger.removeClass('closing opened').addClass('closed');
        
        callbacks.onClosed();
        
        window.clearTimeout($burger.timeout);
      }, msClose);
    } else  if ($burger.hasClass('closed') || $burger.hasClass('closing') ) {
      $burger.removeClass('closing').addClass('opening');
      
      callbacks.onOpening();
      
      $burger.timeout = window.setTimeout(function() {
        $burger.removeClass('opening closed').addClass('opened');
        
        callbacks.onOpened();
        
        window.clearTimeout($burger.timeout);
      }, msOpen);
    }
  });
};

var contactEvents = function($contact, msScroll, onClick) {
  msScroll = (msScroll === undefined ? 2000 : msScroll);
  
  onClick = (onClick === undefined ? function() {} : onClick);
  
  // On desktop: bug
  // Despite preventing default, screen actually follows link when mouseup event used instead of click
  responsiveEvents($contact, function(e) {
    e.preventDefault();
    
    onClick();
    
    var userScrollEvents = 'scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove';
    
    var autoScrollStop = function() {
      $('html, body').stop();
      $('html, body').off(userScrollEvents, autoScrollStop);
    };
    
    $('html, body').on(userScrollEvents, function() {
      $('html, body').stop();
      $('html, body').off(userScrollEvents, autoScrollStop);
    });
    
    $('html, body').animate({scrollTop: $('#contact').offset().top}, msScroll, function() {
      $('html, body').off(userScrollEvents, autoScrollStop);
    });
    
    return false;
  }, 'click touchend touchcancel');
};

var cardEvents = function($card, onChange) {
  onChange = (onChange === undefined ? function() {} : onChange);
  
  $card.each(function(i) {
    if (i === 0) {
      $(this).addClass('focus');
    } else {
      $(this).addClass('right');
    }
  });
  
  var lastIndex = 0;
  
  var enableCardTransitionDuration = function(enable) {
    enable = (enable === undefined ? true : enable);
    
    var duration = (enable ? '' : '0s');
    
    $card.css({
      '-webkit-transition-duration': duration,
      '-moz-transition-duration': duration,
      '-o-transition-duration': duration,
      'transition-duration': duration,
    });
  };
  
  var indexCards = function(index, forward, callback) {
    if (index != lastIndex) {
      forward = (forward === undefined ? (index > lastIndex) : forward);
      
      var enter;
      var exit;
      var focus = 'focus';
      
      if (forward) {
        enter = 'right';
        exit = 'left';
      } else {
        enter = 'left';
        exit = 'right';
      }
      
      console.log(forward)
      
      enableCardTransitionDuration(false);
      
      $card.eq(index).addClass(enter).removeClass(exit);
      
      var timeout = window.setTimeout(function() {
        enableCardTransitionDuration(true);
        
        $card.eq(lastIndex).addClass(exit).removeClass(focus);
        $card.eq(index).addClass(focus).removeClass(enter);
        
        lastIndex = index;
        
        callback();
        
        window.clearTimeout(timeout);
      }, 1);
    }
  };
  
  var detentCard = function($thisCard) {
	  var cardLeftPx = parseInt($thisCard.css('left'), 10);
	  var cardIndex = $thisCard.index();
	  var newCardIndex = cardIndex;
	  var forward;
	  
	  // Assume 96px = 1in
	  if (cardLeftPx < -96) {
	    newCardIndex  = cardIndex + 1;
	    
	    forward = true;
	    
      if (newCardIndex >= $card.length) {
        newCardIndex = 0;
      }
	  } else if (cardLeftPx > 96) {
	    newCardIndex  = cardIndex - 1;
	    
	    forward = false;
	   
	    if (newCardIndex < 0) {
	      newCardIndex = $card.length - 1;
	    }
	  }
  	
  	if (newCardIndex != lastIndex) {
  	  indexCards(newCardIndex, forward, function() {
  	    $thisCard.css({left: ''});
  	  });
  	  
  	  onChange(newCardIndex, forward);
  	} else {
  	  $thisCard.css({left: ''});
  	}
  };
  
  var originalUserPosition;
  
  $card.on('mouseenter', function() {
    $(this).addClass('hover');
  });
  
  $card.on('mouseleave', function() {
    $(this).removeClass('hover mousedown');
  });
  
  $card.on('mousedown', function(e) {
    $(this).addClass('mousedown');
    enableCardTransitionDuration(false);
    originalUserPosition = {x: e.pageX, y: e.pageY};
  });
  
  $card.on('touchstart', function(e) {
    $(this).addClass('mousedown');
    enableCardTransitionDuration(false);
    originalUserPosition = {
      x: e.originalEvent.touches[0].pageX,
      y: $(window).scrollTop()
    };
  });
  
  $card.on('mousemove', function(e) {
  	if ($(this).hasClass('mousedown')) {
  	  var userPosition = {x: e.pageX, y: e.pageY};
    	$(this).css({left: userPosition.x - originalUserPosition.x});
    }
  });
  
  // Reset if user most likely scrolling
  // Force touchend and touchstart to reenable
  $card.on('touchmove', function(e) {
    if ($(this).hasClass('mousedown')) {
      var userPosition = {
        x: e.originalEvent.touches[0].pageX,
        y: $(window).scrollTop()
      };
      
      var deltaPosition = {
        x: Math.abs(userPosition.x - originalUserPosition.x),
        y: Math.abs(userPosition.y - originalUserPosition.y)
      };
      
    	if (deltaPosition.x > deltaPosition.y) {
      	$(this).css({left: userPosition.x - originalUserPosition.x});
      } else {
        // Assume 96px = 1in
        if (deltaPosition.y > 96) {
          $(this).removeClass('mousedown');
        }
        
        enableCardTransitionDuration();
        detentCard($(this));
      }
    }
  });
  
  $card.on('mouseup touchend touchcancel', function() {
    if ($(this).hasClass('mousedown')) {
      $(this).removeClass('mousedown');
      enableCardTransitionDuration();
      detentCard($(this));
    }
  });
  
  // Return ability to remotely call card indexing
  return indexCards;
};
