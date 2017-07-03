/* global $ */

$( document ).on('turbolinks:load', function() {
  var header = "header#navigation";
  var navbar = header + " nav#menu";
  var navlink = navbar + " a";
  var navtext = navbar + " span";
  var burger = header + " div#burger";

  var $header = $(header);
  var $navbar = $(navbar);
  var $navlink = $(navlink);
  var $navtext = $(navtext);
  var $burger = $(burger);

  var $navactions = $(burger + ", " + navlink);

  var toggleMenu = function() {
    if ($(this).hasClass('mousedown')) {
      window.clearTimeout(window.menuTimeout);
      $navactions.removeClass('mousedown');

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
        alert("awry");
      }

      if ($(this).is(navlink)) {
        $navlink.removeClass('active');
        $(this).addClass('active');
      }
    }
  };

  $navactions.on('mousedown', function() {
    $(this).addClass('mousedown');
  });

  $navactions.on('mouseup touchend touchcancel', toggleMenu);

  $navactions.on('mouseenter', function() {
    $(this).addClass('hover');
  });

  $navactions.on('mouseleave', function() {
    $(this).removeClass('hover mousedown');
  });

  $navactions.on('touchstart', function(e) {
    e.preventDefault();
    $(this).addClass('mousedown');
  });
});
