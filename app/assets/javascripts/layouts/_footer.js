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
    // var ratioIcon = $icon.width() / $icons.width();
    var pxSpace = $icons.width() - $icon.outerWidth() * $icon.length;
    var pxMarginLeft = Math.floor(pxSpace / ($icon.length + 1));
    console.log($icons.width())
    console.log($icon.outerWidth())
    console.log($icon.length)
    console.log(pxSpace)
    console.log(pxMarginLeft)
    
    $icon.css({marginLeft: pxMarginLeft});
    
    // $icon.each(function(i) {
    //   $(this).css({
    //     left: (100 * ((i + 1) / ($icon.length + 2) - (i * ratioIcon) - (ratioIcon / 2))) + '%',
    //     // left: (100 * ((i + 1) / ($icon.length + 1))) + '%',
    //   });
    // });
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
