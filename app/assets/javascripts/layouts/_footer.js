/* global $ */
/* global responsiveEvents */

$( document ).on('turbolinks:load', function() {
  var footer = 'footer#footer';
    var icons = footer + ' div#footer-icons';
      var icon = icons + ' div.footer-icon';
  
  // var $footer = $(footer);
    var $icons = $(icons);
      var $icon = $(icon);
  
  var placeIcons = function() {
    var ratioIcon = $icon.width() / $icons.width();
    var ratioUsableWidth = 1 - ratioIcon;
    var percentUsableWidth = 100 * ratioUsableWidth;
    
    $icon.each(function(i) {
      $(this).css({
        left: (percentUsableWidth * ((i + 1) / ($icon.length + 1))) + '%',
      });
    });
  };
  
  placeIcons();
  
  $( window ).resize(function() {
    var timeout = window.setTimeout(function() {
      placeIcons();
      window.clearTimeout(timeout);
    }, 500);
  });
  
  responsiveEvents($icon, function(e) {
    window.location.href = $(this).children('a').attr('href'); 
  });
});
