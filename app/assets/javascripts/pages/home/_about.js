/* global $ */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
    var hero = about + ' div#hero';
    var pull = about + ' div#about-pull';
      var pullhandle = pull + ' div#about-pull-handle';
      var pulltondo = pull + ' div#about-pull-tondo';
    var contact = about + ' a#about-contact';
  
  var $about = $(about);
    var $hero = $(hero);
    var $pull = $(pull);
      var $pullhandle = $(pullhandle);
      var $pulltondo = $(pulltondo);
    var $contact = $(contact);
  
  var $responsive = $([pullhandle, contact, pulltondo].join(', '));
  
  var heroFill = function() {
    $about.css({
      'height': $( window ).height(),
    });
  };
  
  var contactSize = function() {
    $contact.css({
      'height': $( window ).height() / 12,
      'font-size': $( window ).height() / 24,
    });
  };
  
  var tondoPosition = function() {
    var windowHeight = $( window ).height();
    var windowWidth =  $( window ).width();
    
    if (windowHeight > windowWidth) {
      $pulltondo.css({
        height: windowWidth - 30,
        width: windowWidth - 30,
        top: $( window ).height() / 2 - windowWidth / 2 - $pull.offset().top + 15,
        left: $( window ).width() / 2 - windowWidth / 2 + 15,
      });
    } else {
      $pulltondo.css({
        height: windowHeight - 30,
        width: windowHeight - 30,
        top: $( window ).height() / 2 - windowHeight / 2 - $pull.offset().top + 15,
        left: $( window ).width() / 2 - windowHeight / 2 + 15,
      });
    }
  };
  
  heroFill();
  contactSize();
  
  $( window ).resize(function() {
    heroFill();
    contactSize();
    if ($pulltondo.hasClass('focus')) {
      tondoPosition();
    }
  })
  
  var togglePull = function() {
    if ($(this).hasClass('mousedown')) {
      $pullhandle.removeClass('mousedown hover');
      
      if ($pull.hasClass('show')) {
        $pull.removeClass('show');
        $pullhandle.html('<span>></span>');
        $hero.removeClass('shrink');
      } else {
        $pull.addClass('show');
        $pullhandle.html('<span><</span>');
        $hero.addClass('shrink');
      }
    }
  };
  
  var toggleTondo = function() {
    if ($pulltondo.hasClass('mousedown')) {
      $pulltondo.removeClass('mousedown hover');
      
      if ($pulltondo.hasClass('focus')) {
        $pulltondo.removeClass('focus');
        $pulltondo.css({
          height: '',
          width: '',
          top: '',
          left: '',
        });
      } else {
        $pulltondo.addClass('focus');
        tondoPosition();
      }
    }
  };
  
  $responsive.on('mousedown', function() {
    $(this).addClass('mousedown');
  });
  
  $pullhandle.on('mouseup touchend touchcancel', togglePull);
  
  $contact.on('mouseup touchend touchcancel', function() {
    $contact.removeClass('mousedown hover');
  });
  
  $pulltondo.on('mouseup touchend touchcancel', toggleTondo);
  
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
