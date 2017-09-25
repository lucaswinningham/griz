/* global $ */
/* global responsiveEvents */
/* global burgerEvents */

$( document ).on('turbolinks:load', function() {
  var header = 'header#navigation';
    var menu = header + ' nav#menu';
      var navlink = menu + ' a';
      // var navtext = menu + ' span';
    var burger = header + ' div#nav-burger-container div.burger';
    // var burger = header + ' div#burger';
      var patty = burger + ' i';
  
  // var $header = $(header);
    var $menu = $(menu);
      var $navlink = $(navlink);
      // var $navtext = $(navtext);
    var $burger = $(burger);
      var $patty = $(patty);
  
  var sectionIndex = 0;
  
  responsiveEvents($navlink, function() {
    $navlink.removeClass('active');
    $(this).addClass('active');
    
    window.location.href = $(this).attr('href');
    
    $menu.removeClass('focus');
    
    // Give mousedown class back and trigger menu close for burger events
    $burger.addClass('mousedown').trigger('mouseup');
  });
  
  burgerEvents($burger, 300, 150, {
    onOpening: function() {
      $menu.addClass('focus');
      $patty.removeClass('track');
    },
    
    onClosing: function() {
      $menu.removeClass('focus');
    },
    
    onClosed: function(e) {
      burgerTrack(e, sectionIndex);
    },
  });
  
  var burgerTrack = function(e, sectionIndex) {
    sectionIndex = parseInt(sectionIndex, 10);
    
    $patty.removeClass('track');
    if (!$menu.hasClass('focus') && sectionIndex > 0) {
      $patty.eq(sectionIndex - 1).addClass('track');
    }
    
    $navlink.removeClass('active');
    $(navlink + ':nth-child(' + (sectionIndex + 1) + ')').addClass('active');
  };
  
  $burger.on('track', burgerTrack);
});
