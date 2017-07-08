/* global $ */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
    var hero = about + ' div#hero';
    var pull = about + ' div#about-pull';
      var pullhandle = pull + ' div#about-pull-handle';
    var contact = about + ' a#about-contact';
  
  var $about = $(about);
    var $hero = $(hero);
    var $pull = $(pull);
      var $pullhandle = $(pullhandle);
    var $contact = $(contact);
  
  var $responsive = $([pullhandle, contact].join(', '));
  
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
  
  heroFill();
  contactSize();
  
  $( window ).resize(heroFill);
  $( window ).resize(contactSize);
  
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
  
  $responsive.on('mousedown', function() {
    $(this).addClass('mousedown');
  });
  
  $pullhandle.on('mouseup touchend touchcancel', togglePull);
  
  $contact.on('mouseup touchend touchcancel', function() {
    $contact.removeClass('mousedown hover');
  });
  
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
