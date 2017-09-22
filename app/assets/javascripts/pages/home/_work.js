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
          var contact = card + ' a.btn';
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
  var pxPetalSide = $petal.height();
  
  sectionInitialize($work, $container);
  
  var positionMenu = function() {
    var containerHeight = $container.height();
    var containerWidth =  $container.width();
    var pxMenuSide = (containerHeight > containerWidth ? containerWidth : containerHeight) - 4 * pxGutter;
    
    $menu.css({
      height: pxMenuSide,
      width: pxMenuSide,
    });
    
    var percentHalfPetal = 100 * pxPetalSide / pxMenuSide / 2;
    var ratioPetal = pxPetalSide / pxMenuSide;
    
    $petal.each(function(i) {
      var theta = (i * 360 / $petal.length + 90) * Math.PI / 180;
      
      var y = Math.sin(theta) * (1 - ratioPetal);
      var x = Math.cos(theta) * (1 - ratioPetal);
      
      var percentTop =  50 * (1 - y) - percentHalfPetal;
      var percentLeft = 50 * (1 - x) - percentHalfPetal;
      
      $(this).css({
        top: percentTop + '%',
        left: percentLeft + '%',
      });
    });
  };
  
  positionMenu();
  
  $( window ).resize(function() {
    var timeout = window.setTimeout(function() {
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
      '-webkit-transform': 'rotate(' + (deg * -1) + 'deg)',
      '-moz-transform': 'rotate(' + (deg * -1) + 'deg)',
      '-o-transform': 'rotate(' + (deg * -1) + 'deg)',
      'transform': 'rotate(' + (deg * -1) + 'deg)',
    });
    
    return degDelta < 0;
  };
  
  var indexCards = cardEvents($card, function(newCardIndex, forward) {
    $petal.removeClass('active');
    
    $petal.eq(newCardIndex).addClass('active');
    
    movePetals(newCardIndex);
  });
  
  contactEvents($contact);
  
  responsiveEvents($petal, function() {
    $petal.removeClass('active');
    $(this).addClass('active');
    
    var clockwise = movePetals($(this).index());
    
    indexCards($(this).index(), clockwise);
  });
  
  burgerEvents($burger, 300, 150, {
    onOpening: function() {
      $toggle.addClass('focus');
    },
    
    onOpened: function() {
      $menu.addClass('focus');
    },
    
    onClosing: function() {
      $menu.removeClass('focus');
    },
    
    onClosed: function() {
      $toggle.removeClass('focus');
    },
  });
});
