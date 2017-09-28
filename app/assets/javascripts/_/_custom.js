/* global $ */

// Ensure this is in sync with custom.scss
var pxGutter = 15;

var sectionInitialize = function($section, $container) {
  var sectionFill = function() {
    var windowHeight = $( window ).height();
    $section.height(windowHeight);
    $container.height(windowHeight);
    // $section.height(windowHeight + 200);
    // $container.height(windowHeight);
    // $container.css('margin-top', (parseInt(window.innerHeight, 10) - windowHeight) / 2);
  };
  
  sectionFill();
  
  var handleFixed = function() {
    var scrollPosition = Math.round($( document ).scrollTop());
    var fixedTop = $section.offset().top;
    
    if (scrollPosition > fixedTop) {
      $container.css({
        'position': 'fixed',
      });
    } else {
      $container.css({
        'position': '',
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
  
  responsiveEvents($burger, function(e) {
    window.clearTimeout($burger.timeout);
    
    if ($burger.hasClass('opened') || $burger.hasClass('opening') ) {
      $burger.removeClass('opening').addClass('closing');
      
      callbacks.onClosing.bind(this)(e);
      
      $burger.timeout = window.setTimeout(function() {
        $burger.removeClass('closing opened').addClass('closed');
        
        callbacks.onClosed.bind(this)(e);
        
        window.clearTimeout($burger.timeout);
      }, msClose);
    } else  if ($burger.hasClass('closed') || $burger.hasClass('closing') ) {
      $burger.removeClass('closing').addClass('opening');
      
      callbacks.onOpening.bind(this)(e);
      
      $burger.timeout = window.setTimeout(function() {
        $burger.removeClass('opening closed').addClass('opened');
        
        callbacks.onOpened.bind(this)(e);
        
        window.clearTimeout($burger.timeout);
      }, msOpen);
    }
  });
};

var cardEvents = function($card, onChange) {
  onChange = (onChange === undefined ? function() {} : onChange);
  
  $card.each(function(i) {
    if (i === 0) {
      $(this).addClass('focus');
    } else {
      $(this).addClass('right');
    }
  
    $(this).find('.card-tondo').each(function() {
      $(this).css({
        'background-image': 'url(' + $(this).data('sm-pic') + ')'
      });
    });
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
      callback = (callback === undefined ? function() {} : callback);
      
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
  
  var sizeModal = function($modal) {
    var cardHeight = $card.outerHeight();
    var cardWidth =  $card.outerWidth();
    var modalSide =  (cardHeight > cardWidth ? cardWidth : cardHeight) - 2 * pxGutter;
    
    if ($modal.hasClass('focus')) {
      $modal.css({
        height: modalSide,
        width: modalSide,
      });
    // } else {
    //   $modal.css({
    //     height: '',
    //     width: '',
    //   });
    }
  };
  
  // TODO: optimize this
  $( window ).resize(function() {
    var timeout = window.setTimeout(function() {
      // sizeAllTondos();
      $card.each(function() {
        sizeModal($(this).children('.card-modal'));
      });
      
      window.clearTimeout(timeout);
    }, 500);
  });
  
  // responsiveEvents($card.children('.card-tondo'), function(e) {
  //   e.preventDefault();
  //   $(this).toggleClass('focus');
  //   sizeTondo($(this));
  // });
  
  responsiveEvents($card.find('.card-tondo'), function() {
    var $modal = $(this).parents('.card').children('.card-modal');
    
    $modal.addClass('focus').data('index', $(this).index()).css({
      'background-image': 'url(' + $(this).data('lg-pic') + ')'
    });
    
    sizeModal($modal);
  });
  
  responsiveEvents($card.children('.card-modal-close'), function() {
    var $modal = $(this).parent('.card-modal');
    $modal.removeClass('focus').data('index', '');
    sizeModal($modal);
  });
  
  responsiveEvents($card.children('.card-modal-prev'), function() {
    var $card = $(this).parent('.card');
    var $modal = $card.children('.card-modal');
    var $tondo = $card.find('.card-tondo');
    var index = parseInt($modal.data('index'));
    
    if (index === 0) {
      index = $tondo.length - 1;
    } else {
      index -= 1;
    }
    
    var url = $tondo.eq(index).data('lg-pic');
    
    $modal.data('index', index).css({
      'background-image': 'url(' + url + ')'
    });
  });
  
  // TODO: DRY this with above function
  responsiveEvents($card.children('.card-modal-next'), function() {
    var $card = $(this).parent('.card');
    var $modal = $card.children('.card-modal');
    var $tondo = $card.find('.card-tondo');
    var index = parseInt($modal.data('index'));
    
    if (index === $tondo.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    
    var url = $tondo.eq(index).data('lg-pic');
    
    $modal.data('index', index).css({
      'background-image': 'url(' + url + ')'
    });
  });
  
  // responsiveEvents($card.children('.card-modal'), function() {
  //   var $modal = $(this);
  //   $modal.removeClass('focus');
  //   sizeModal($modal);
  // });
  
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

var uiEvents = function($card, $breadcrumbs, $icon) {
  var placeIcons = function() {
    var ratioBreadcrumb = $icon.width() / $breadcrumbs.width();
    var ratioUsableWidth = 1 - ratioBreadcrumb;
    var percentUsableWidth = 100 * ratioUsableWidth;
    
    var timeout = window.setTimeout(function() {
      $icon.each(function(i) {
        $(this).css({
          left: (percentUsableWidth * (i / ($icon.length - 1))) + '%',
        });
      });
      
      window.clearTimeout(timeout);
    }, 500);
  };
  
  placeIcons();
  
  $( window ).resize(function() {
    placeIcons();
  });
  
  $icon.first().addClass('active');
  
  var indexCards = cardEvents($card, function(newCardIndex) {
    $icon.removeClass('active');
    
    $icon.eq(newCardIndex).addClass('active');
  });
  
  responsiveEvents($icon, function() {
    $(this).removeClass('mousedown hover');
    
    if (!$(this).hasClass('active')) {
      indexCards($(this).index());
      $icon.removeClass('active');
      $(this).addClass('active');
    }
  });
};

var sectionEvents = function(section) {
  var container = section + ' .container';
    var card = container + ' .cards .card';
      var contact = card + ' .btn';
    var breadcrumbs = container + ' .breadcrumbs';
      var icon = breadcrumbs + ' .icon';
  
  var $section = $(section);
    var $container = $(container);
      var $card = $(card);
        var $contact = $(contact);
      var $breadcrumbs = $(breadcrumbs);
        var $icon = $(icon);
        
  sectionInitialize($section, $container);
  
  responsiveEvents($contact, function() {
    window.location.href = '#contact'; 
  });
  
  uiEvents($card, $breadcrumbs, $icon);
};
