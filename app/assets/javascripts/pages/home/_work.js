/* global $ */
/* global sectionInitialize */
/* global responsiveEvents */
/* global cardEvents */
/* global contactEvents */

$( document ).on('turbolinks:load', function() {
  var work = 'section#work';
    var container = work + ' div#work-container';
      var toggle = container + ' div#work-menu-toggle';
      var menu = container + ' div#work-menu';
        var petalContainer = menu + ' div#work-menu-petal-container';
          var petal = petalContainer + ' div.work-menu-petal';
      var cards = container + ' div#work-cards';
        var card = cards + ' .card';
          var contact = card + ' .btn-contact';
  
  var $work = $(work);
    var $container = $(container);
      var $toggle = $(toggle);
      var $menu = $(menu);
        var $petalContainer = $(petalContainer);
          var $petal = $(petal);
        var $card = $(card);
          var $contact = $(contact);
  
  $petal.first().addClass('active');
  
  var petalContainerDeg = 0;
  var pxBuffer = 200;
  var menuTimeout;
  
  sectionInitialize($work, $container, pxBuffer);
  
  var focusToggle = function(focus) {
    focus = focus || $toggle.hasClass('focus');
    
    var containerHeight = $container.height();
    var containerWidth =  $container.width();
    var boundingLength = (containerHeight > containerWidth ? containerWidth : containerHeight);
    var gutter = 15;
    
    // var centerRatio = 0.075;
    var toggleRatio = 0.1;
    var toggleRadius = boundingLength * toggleRatio;
    
    $toggle.css({
      width: toggleRadius * 2,
      height: toggleRadius * 2,
    });
    
    if (focus) {
      $toggle.css({
        top: containerHeight / 2,
        left: containerWidth / 2,
      });
    } else {
      $toggle.css({
        top: containerHeight - toggleRadius - gutter * 2,
        left: containerWidth - toggleRadius - gutter * 2,
      });
    }
  };
  
  focusToggle();
  
  var positionMenu = function() {
    var containerHeight = $container.height();
    var containerWidth =  $container.width();
    var boundingLength;
    var gutter = 15;
    
    if (containerHeight > containerWidth) {
      boundingLength = containerWidth;
      
      $menu.css({
        height: containerWidth - 2 * gutter,
        width: containerWidth - 2 * gutter,
        top: containerHeight / 2 - containerWidth / 2 + gutter,
        right: gutter,
      });
    } else {
      boundingLength = containerHeight;
      
      $menu.css({
        height: containerHeight - 2 * gutter,
        width: containerHeight - 2 * gutter,
        top: gutter,
        right: containerWidth / 2 - containerHeight / 2 + gutter,
      });
    }
    
    var petalRatio = 0.1;
    var petalRadius = boundingLength * petalRatio;
    
    $petal.each(function(i) {
      // var theta = (-i * 360 / $petal.length + 90) * Math.PI / 180;
      var theta = (i * 360 / $petal.length + 90) * Math.PI / 180;
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
    var timeout = window.setTimeout(function() {
      focusToggle();
      positionMenu();
      window.clearTimeout(timeout);
    }, 1100);
  });
  
  var movePetals = function(index) {
    var degTarget = -index * (360 / $petal.length);
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
    
    return degDelta < 0;
  };
  
  var focusPetal = function() {
    $petal.removeClass('active');
    $(this).addClass('active');
    
    var clockwise = movePetals($(this).index());
    
    indexCards($(this).index(), clockwise);
  };
  
  var indexCards = cardEvents($card, function(newCardIndex, forward) {
    $petal.removeClass('active');
    
    $petal.each(function(i) {
      if (i == newCardIndex) {
        $(this).addClass('active');
      }
    });
    
    movePetals(newCardIndex);
  });
  
  contactEvents($contact, 1000, function() {
    var windowScrollTop = $( window ).scrollTop();
    var sectionTop = $work.offset().top;
    var sectionSnapTop = sectionTop + pxBuffer;
    if (windowScrollTop > sectionTop && windowScrollTop < sectionSnapTop) {
      $( window ).scrollTop(sectionSnapTop);
    }
    
    // enableCardTransitionDuration(true);
    // detentCard($contactCard);
  });
  
  responsiveEvents($petal, focusPetal);
  
  responsiveEvents($toggle, function() {
    window.clearTimeout(menuTimeout);
    
    if ($menu.hasClass('opened') || $menu.hasClass('opening')) {
      $menu.removeClass('closed opening opened').addClass('closing');
      $toggle.addClass('focus');
      focusToggle(true);
      
      menuTimeout = window.setTimeout(function() {
        $menu.removeClass('closing opening opened').addClass('closed');
        $toggle.removeClass('focus');
        focusToggle(false);
        
        window.clearTimeout(menuTimeout);
      }, 500);
    } else if ($menu.hasClass('closed') || $menu.hasClass('closing')) {
      $menu.removeClass('opened closing closed').addClass('opening');
      $toggle.addClass('focus');
      focusToggle(true);
      
      menuTimeout = window.setTimeout(function() {
        $menu.removeClass('opening closing closed').addClass('opened');
        
        window.clearTimeout(menuTimeout);
      }, 1000);
    }
  });
});
