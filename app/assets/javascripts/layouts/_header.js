/* global $ */

$( document ).on('turbolinks:load', function() {
  var header = 'header#navigation';
    var navbar = header + ' nav#menu';
      var navlink = navbar + ' a';
      var navtext = navbar + ' span';
    var burger = header + ' div#burger';
  
  var $header = $(header);
    var $navbar = $(navbar);
      var $navlink = $(navlink);
      var $navtext = $(navtext);
    var $burger = $(burger);
  
  var $responsive = $([burger, navlink].join(', '));
  
  var toggleMenu = function() {
    window.clearTimeout(window.menuTimeout);
    $responsive.removeClass('mousedown');
    
    var open = function() {
      $burger.addClass('opening');
      $header.removeClass('closed');
      $header.addClass('opened');
      window.menuTimeout = window.setTimeout(function() {
        $burger.removeClass('opening closing lines');
        $burger.addClass('cross');
      }, 150);
    };
    
    var close = function() {
      $burger.addClass('closing');
      $header.removeClass('opened');
      $header.addClass('closed');
      window.menuTimeout = window.setTimeout(function() {
        $burger.removeClass('opening closing cross');
        $burger.addClass('lines');
      }, 300);
    };
    
    if ($burger.hasClass('opening')) {
      $burger.removeClass('opening');
      close();
    } else if ($burger.hasClass('closing')) {
      $burger.removeClass('closing');
      open();
    } else if ($burger.hasClass('lines')) {
      open();
    } else if ($burger.hasClass('cross')) {
      close();
    } else {
      alert('awry');
    }
  };
  
  var handleAnchor = function(e) {
    if ($(this).hasClass('mousedown')) {
      e.preventDefault();
      
      $navlink.removeClass('active');
      $(this).addClass('active');
      
      var $anchor = $($(this).attr('href'));
      var top = $anchor.offset().top;
      var border = parseInt($anchor.css("border-top-width"));
      $('html,body').animate({scrollTop: top + border},0);
      
      toggleMenu();
      
      return false;
    }
  };
  
  $responsive.on('mousedown', function() {
    $(this).addClass('mousedown');
  });
  
  $burger.on('mouseup touchend touchcancel', function() {
    if ($(this).hasClass('mousedown')) {
      toggleMenu();
    }
  });
  
  // Screen actually follows link when mouseup event used instead of click
  $navlink.on('click touchend touchcancel', handleAnchor);
  
  $responsive.on('mouseenter', function() {
    $(this).addClass('hover');
  });
  
  $responsive.on('mouseleave', function() {
    $(this).removeClass('hover mousedown');
  });
  
  $responsive.on('touchstart', function(e) {
    e.preventDefault();
    $(this).addClass('mousedown');
  });
});
