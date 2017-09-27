/* global $ */
/* global sectionEvents */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
  var $card = $(about + ' .container .cards .card');
  
  sectionEvents(about);
  
  // Disable the first card focus for dramatic intro
  $card.first().removeClass('focus').addClass('right');
  
  // Dramatic intro for first card
  (function() {
    var timeout = window.setTimeout(function() {
      $card.first().removeClass('right').addClass('focus');
      
      window.clearTimeout(timeout);
    }, 500);
  }());
});
