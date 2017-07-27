/* global $ */

$( document ).on('turbolinks:load', function() {
  var work = 'section#work';
  
  var $work = $(work);
  
  var sectionFill = function() {
    $work.css({
      'height': $( window ).height(),
    });
  };
  
  sectionFill();
  
  $( window ).resize(function() {
    sectionFill();
  });
});
