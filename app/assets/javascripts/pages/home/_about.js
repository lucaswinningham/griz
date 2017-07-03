/* global $ */

$( document ).on('turbolinks:load', function() {
  var heroFill = function() {
    $('section#about').css('height', $( window ).height());
  };
  
  heroFill();
  
  $( window ).resize(heroFill);
});
