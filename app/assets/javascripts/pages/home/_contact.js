/* global $ */

$( document ).on('turbolinks:load', function() {
  var contact = 'section#contact';
  
  var $contact = $(contact);
  
  var sectionFill = function() {
    $contact.css({
      'height': window.innerHeight,
    });
  };
  
  sectionFill();
  
  $( window ).resize(function() {
    sectionFill();
  });
});
