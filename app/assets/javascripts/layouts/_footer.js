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
    var pxSpace = $icons.width() - $icon.outerWidth() * $icon.length;
    var pxMarginLeft = Math.floor(pxSpace / ($icon.length + 1));
    
    $icon.css({marginLeft: pxMarginLeft});
  };
  
  (function() {
    var timeout = window.setTimeout(function() {
      placeIcons();
      
      window.clearTimeout(timeout);
    }, 100);
  }());
  
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
