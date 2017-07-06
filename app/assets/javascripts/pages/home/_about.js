/* global $ */

$( document ).on('turbolinks:load', function() {
  var heroFill = function() {
    $('section#about').css({
      'height': $( window ).height(),
      'padding-top': $( window ).height() / 4,
    });
  };
  
  heroFill();
  
  $( window ).resize(heroFill);
});
