/* global $ */
/* global responsiveEvents */

$( document ).on('turbolinks:load', function() {
  var footer = 'footer#footer';
    var icons = footer + ' div#footer-icons';
      var icon = icons + ' .icon';
  
  // var $footer = $(footer);
    var $icons = $(icons);
      var $icon = $(icon);
  
  var placeIcons = function() {
    var ratioIcon = $icon.width() / $icons.outerWidth();
    var ratioUsableWidth = 1 - ratioIcon;
    var percentUsableWidth = 100 * ratioUsableWidth;
    
    var timeout = window.setTimeout(function() {
      $icon.each(function(i) {
        $(this).css({
          left: (percentUsableWidth * ((2 * i + 1) / ($icon.length * 2))) + '%',
        });
      });
      
      window.clearTimeout(timeout);
    }, 500);
  };
  
  placeIcons();
  
  $( window ).resize(function() {
    placeIcons();
  });
  
  responsiveEvents($icon, function(e) {
    window.location.href = $(this).children('a').attr('href'); 
  });
});
