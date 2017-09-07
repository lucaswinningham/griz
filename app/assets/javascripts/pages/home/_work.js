/* global $ */
/* global pxGutter */
/* global sectionInitialize */
/* global responsiveEvents */
/* global burgerEvents */
/* global cardEvents */
/* global contactEvents */

$( document ).on('turbolinks:load', function() {
  var work = 'section#work';
    var container = work + ' div#work-container';
      var cards = container + ' div#work-cards';
        var card = cards + ' .card';
          var contact = card + ' .btn-contact';
      var toggle = container + ' div#work-menu-toggle';
        var burger = toggle + ' div.burger';
      var menu = container + ' div#work-menu';
        var petalContainer = menu + ' div#work-menu-petal-container';
          var petal = petalContainer + ' div.work-menu-petal';
  
  var $work = $(work);
    var $container = $(container);
        var $card = $(card);
          var $contact = $(contact);
      var $toggle = $(toggle);
        var $burger = $(burger);
      var $menu = $(menu);
        var $petalContainer = $(petalContainer);
          var $petal = $(petal);
  
  $petal.first().addClass('active');
  
  var petalContainerDeg = 0;
  var menuTimeout;
  
  sectionInitialize($work, $container);
  
  // var focusToggle = function(focus) {
  //   focus = focus || $toggle.hasClass('focus');
    
  //   var containerHeight = $container.height();
  //   var containerWidth =  $container.width();
  //   var boundingLength = (containerHeight > containerWidth ? containerWidth : containerHeight);
    
  //   // var centerRatio = 0.075;
  //   var toggleRatio = 0.1;
  //   var toggleRadius = boundingLength * toggleRatio;
    
  //   $toggle.css({
  //     width: toggleRadius * 2,
  //     height: toggleRadius * 2,
  //   });
    
  //   if (focus) {
  //     $toggle.css({
  //       top: containerHeight / 2,
  //       left: containerWidth / 2,
  //     });
  //   } else {
  //     $toggle.css({
  //       top: containerHeight - toggleRadius - pxGutter * 2,
  //       left: containerWidth - toggleRadius - pxGutter * 2,
  //     });
  //   }
  // };
  
  // focusToggle();
  
  var positionMenu = function() {
    var containerHeight = $container.height();
    var containerWidth =  $container.width();
    var boundingLength;
    
    if (containerHeight > containerWidth) {
      boundingLength = containerWidth;
      
      $menu.css({
        height: containerWidth - 2 * pxGutter,
        width: containerWidth - 2 * pxGutter,
        // top: containerHeight / 2 - containerWidth / 2 + pxGutter,
        // right: pxGutter,
      });
    } else {
      boundingLength = containerHeight;
      
      $menu.css({
        height: containerHeight - 2 * pxGutter,
        width: containerHeight - 2 * pxGutter,
        // top: pxGutter,
        // right: containerWidth / 2 - containerHeight / 2 + pxGutter,
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
      // focusToggle();
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
    
    $petal.eq(newCardIndex).addClass('active');
    
    movePetals(newCardIndex);
  });
  
  contactEvents($contact, 1000);
  
  responsiveEvents($petal, focusPetal);
  
  burgerEvents($burger, 300, 150, {
    onOpening: function() {
      $toggle.addClass('focus');
      // focusToggle(true);
    },
    
    onOpened: function() {
      $menu.addClass('focus');
    },
    
    onClosing: function() {
      $menu.removeClass('focus');
    },
    
    onClosed: function() {
      $toggle.removeClass('focus');
      // focusToggle(false);
    },
  });
  
  // responsiveEvents($toggle, function() {
  //   window.clearTimeout(menuTimeout);
    
  //   if ($menu.hasClass('opened') || $menu.hasClass('opening')) {
  //     $menu.removeClass('closed opening opened').addClass('closing');
  //     $toggle.addClass('focus');
  //     focusToggle(true);
      
  //     menuTimeout = window.setTimeout(function() {
  //       $menu.removeClass('closing opening opened').addClass('closed');
  //       $toggle.removeClass('focus');
  //       focusToggle(false);
        
  //       window.clearTimeout(menuTimeout);
  //     }, 500);
  //   } else if ($menu.hasClass('closed') || $menu.hasClass('closing')) {
  //     $menu.removeClass('opened closing closed').addClass('opening');
  //     $toggle.addClass('focus');
  //     focusToggle(true);
      
  //     menuTimeout = window.setTimeout(function() {
  //       $menu.removeClass('opening closing closed').addClass('opened');
        
  //       window.clearTimeout(menuTimeout);
  //     }, 1000);
  //   }
  // });
});
