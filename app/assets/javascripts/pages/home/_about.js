/* global $ */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
    var hero = about + ' div#hero';
    var pull = about + ' div#about-pull';
      var pullhandle = pull + ' div#about-pull-handle';
  
  var $about = $(about);
    var $hero = $(hero);
    var $pull = $(pull);
      var $pullhandle = $(pullhandle);
  
  var $responsive = $(pullhandle);
  
  var heroFill = function() {
    $about.css({
      'height': $( window ).height(),
    });
  };
  
  heroFill();
  
  $( window ).resize(heroFill);
  
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
