/* global $ */

$( document ).on('turbolinks:load', function() {
  var work = 'section#work';
    var container = work + ' div#work-container';
      var menu = container + ' div#work-menu';
        var center = menu + ' div#work-menu-center';
        var petalContainer = menu + ' div#work-menu-petal-container';
          var petal = petalContainer + ' div.work-menu-petal';
      var cards = container + ' div#work-cards';
        var card = cards + ' div.work-card';
        var contactCard = cards + ' div#work-card-contact';
              var contact = contactCard + ' div div.work-card-body a#work-contact';
  
  var $work = $(work);
    var $container = $(container);
      var $menu = $(menu);
        var $center = $(center);
        var $petalContainer = $(petalContainer);
          var $petal = $(petal);
      var $cards = $(cards);
        var $contactCard = $(contactCard);
              var $contact = $(contact);
  
  $petal.first().addClass('active');
  
  var content = [
    {
      head: 'My Work',
      body: 'You can find all of the source code at the github link below.',
    },
    {
      head: 'AutoLisp',
      body: 'During my time as a Controls Engineer, I programmed several time saving tools to be used with AutoCAD. I learned Lisp for all it was, good and bad. The bad parts I didn\'t like so much compared to the Ruby programming language so I decided to implement some of Ruby\'s usefulness for Lisp by creating a code interpreter that not only found and replaced some functionality, such as rest parameters, but also injected pseudo object oriented paradigms for lists to act like Ruby array objects.',
    },
    {
      head: 'Bashful',
      body: 'I attempted learning Ruby on Rails four separate times, failing the first three. I wasn\'t (and still amn\'t) good at the command line which was my biggest fear and pitfall for getting started. After making several apps using Rails in the Cloud9 environment, I made a couple bash scripts to completely automate the process from creating a new workspace in C9 to a live running app in Heroku and backed up on Github.',
    },
  ];
  
  // content.forEach(function(val, i) {
  //   $petalContainer.append('<div class="work-menu-petal">' + i + '</div>');
  // });
  
  content.forEach(function(val, i) {
    var cardHead = '<div class="work-card-head"><span>' + val.head + '</span></div>';
    var cardBody = '<div class="work-card-body"><span>' + val.body + '</span></div>';
    var card = '<div class="work-card"><div>' + cardHead + cardBody + '</div></div>';
    $(card).insertBefore($contactCard);
  });
  
  var $card = $(card);
  
  $card.first().addClass('focus');
  
  var $responsive = $([center, petal].join(', '));
  
  var petalContainerDeg = 0;
  var fixedBuffer = 200;
  var originalUserPosition;
  
  var sectionFill = function() {
    $work.css({
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
    var fixedTop = $work.offset().top;
    var fixedBottom = $work.offset().top + fixedBuffer;
    
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
  
  var positionMenu = function() {
    var windowHeight = $( window ).height();
    var windowWidth =  $( window ).width();
    var boundingLength;
    var gutter = 15;
    
    if (windowHeight > windowWidth) {
      boundingLength = windowWidth;
      
      $menu.css({
        height: windowWidth - 2 * gutter,
        width: windowWidth - 2 * gutter,
        top: windowHeight / 2 - windowWidth / 2 + gutter,
        right: gutter,
      });
    } else {
      boundingLength = windowHeight;
      
      $menu.css({
        height: windowHeight - 2 * gutter,
        width: windowHeight - 2 * gutter,
        top: gutter,
        right: windowWidth / 2 - windowHeight / 2 + gutter,
      });
    }
    
    var centerRatio = 0.05;
    var petalRatio = 0.1;
    var centerRadius = boundingLength * centerRatio;
    var petalRadius = boundingLength * petalRatio;
    
    $center.css({
      top: '50%',
      left: '50%',
      width: centerRadius * 2,
      height: centerRadius * 2,
    });
    
    $petal.each(function(i) {
      var theta = (-i * 360 / $petal.length + 90) * Math.PI / 180;
      var y = Math.sin(theta) * (1 - petalRatio * 2);
      var x = Math.cos(theta) * (1 - petalRatio * 2);
      var top =  100 * (0.5 - y / 2);
      var left = 100 * (0.5 - x / 2);
      
      $(this).css({
        top: top + '%',
        left: left + '%',
        width: petalRadius * 2,
        height: petalRadius * 2,
      });
    });
  };
  
  positionMenu();
  
  $( window ).resize(function() {
    sectionFill();
    handleFixed();
    positionMenu();
  });
  
  $( window ).scroll(handleFixed);
  
  var setContent = function(index, clockwise) {
    var enterLeft;
    var exitLeft;
    
    if (clockwise) {
      enterLeft = '-110%';
      exitLeft = '110%';
    } else {
      enterLeft = '110%';
      exitLeft = '-110%';
    }
    
    enableCardTransitionDuration(false);
    
    $card.each(function() {
      if (!$(this).hasClass('focus')) {
        $(this).css({left: enterLeft});
        // OK, somehow console logging the css here causes the following bug to go away
        // On very first card swipe, if counterclockwise (index 0 to len - 1), contact card comes in from wrong side or wrong left
        // TODO figure out why the hell this is
        console.log($(this).css('left'));
      }
    });
    
    enableCardTransitionDuration(true);
    
    $card.each(function(i) {
      if ($(this).hasClass('focus')) {
        $(this).removeClass('focus').css({left: exitLeft});
      } else if (i == index) {
        $(this).addClass('focus').css({left: ''});
      }
    });
  };
  
  var movePetals = function(index) {
    var degTarget = index * (360 / $petal.length);
    // Damn js and its quirks
    // https://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
    var degDelta = degTarget - (((petalContainerDeg % 360) + 360) % 360);
    
    if (degDelta > 180) {
      degDelta -= 360;
    } else if (degDelta < -180) {
      degDelta += 360;
    }
    
    var deg = petalContainerDeg + degDelta;
    petalContainerDeg = deg;
    
    $petalContainer.css({
      '-webkit-transform': 'rotate(' + deg + 'deg)',
      '-moz-transform': 'rotate(' + deg + 'deg)',
      '-o-transform': 'rotate(' + deg + 'deg)',
      'transform': 'rotate(' + deg + 'deg)',
    });
    
    $petal.css({
      '-webkit-transform': 'translate(-50%,-50%) rotate(' + (deg * -1) + 'deg)',
      '-moz-transform': 'translate(-50%,-50%) rotate(' + (deg * -1) + 'deg)',
      '-o-transform': 'translate(-50%,-50%) rotate(' + (deg * -1) + 'deg)',
      'transform': 'translate(-50%,-50%) rotate(' + (deg * -1) + 'deg)',
    });
    
    return degDelta > 0;
  };
  
  var focusPetal = function() {
    if ($(this).hasClass('mousedown')) {
      $(this).removeClass('hover mousedown');
      
      $petal.removeClass('active');
      $(this).addClass('active');
      
      var clockwise = movePetals($(this).index());
    
      setContent($(this).index(), clockwise);
    }
  };
  
  var enableCardTransitionDuration = function(enable) {
    var duration = (enable ? '' : '0s');
    
    $card.css({
      '-webkit-transition-duration': duration,
      '-moz-transition-duration': duration,
      '-o-transition-duration': duration,
      'transition-duration': duration,
    });
  };
  
  var detentCard = function($thisCard) {
	  var cardLeftPx = parseInt($thisCard.css('left'), 10);
	  var cardIndex = $thisCard.index();
	  
	  // Assume 96px = 1in
	  if (cardLeftPx < -96) {
	    cardIndex -= 1;
	    if (cardIndex < 0) {
	      cardIndex = $card.length - 1;
	    }
	    
	    setContent(cardIndex, false);
  	  
      $petal.removeClass('active');
      
      $petal.each(function(i) {
        if (i == cardIndex) {
          $(this).addClass('active');
        }
      });
      
      movePetals(cardIndex);
	  } else if (cardLeftPx > 96) {
	    cardIndex += 1;
	    if (cardIndex >= $card.length) {
	      cardIndex = 0;
	    }
	    
	    setContent(cardIndex, true);
  	  
      $petal.removeClass('active');
      
      $petal.each(function(i) {
        if (i == cardIndex) {
          $(this).addClass('active');
        }
      });
      
      movePetals(cardIndex);
	  } else {
	    $thisCard.css({left: ''});
	  }
  };
  
  $card.on('mousedown', function(e) {
    $(this).addClass('mousedown');
    enableCardTransitionDuration(false);
    originalUserPosition = {x: e.pageX, y: e.pageY};
  });
  
  $card.on('mouseup touchend touchcancel', function() {
    enableCardTransitionDuration(true);
    detentCard($(this));
    $(this).removeClass('mousedown hover');
  });
  
  $card.on('mousemove', function(e) {
    // e.preventDefault();
    var userPosition = {x: e.pageX, y: e.pageY};
    
  	if ($(this).hasClass('mousedown')) {
    	$(this).css({left: userPosition.x - originalUserPosition.x});
    }
  });
  
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
        // Reset if user most likely scrolling
        // Force touchend and touchstart to reenable
        // Assume 96px = 1in
        if (deltaPosition.y > 96) {
          $(this).removeClass('hover mousedown');
          enableCardTransitionDuration(true);
          detentCard($(this));
        }
        
        enableCardTransitionDuration(true);
        detentCard($(this));
      }
    }
  });
  
  $card.on('mouseleave', function() {
    $card.removeClass('mousedown hover');
    originalUserPosition = null;
  });
  
  $card.on('touchstart', function(e) {
    $(this).addClass('hover mousedown');
    enableCardTransitionDuration(false);
    originalUserPosition = {
      x: e.originalEvent.touches[0].pageX,
      y: $(window).scrollTop()
    };
  });
  
  $responsive.on('mousedown', function() {
    $(this).addClass('mousedown');
  });
  
  // $center.on('mouseup touchend touchcancel', doSomething);
  
  $petal.on('mouseup touchend touchcancel', focusPetal);
  
  $responsive.on('mouseenter', function() {
    $(this).addClass('hover');
  });
  
  $responsive.on('mouseleave', function() {
    $(this).removeClass('hover mousedown');
  });
  
  $responsive.on('touchstart', function(e) {
    e.preventDefault();
    $(this).addClass('hover mousedown');
  });
});
