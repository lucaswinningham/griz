/* global $ */
/* global sectionInitialize */

$( document ).on('turbolinks:load', function() {
  var contact = 'section#contact';
    var container = contact + ' div#contact-container';
  
  var $contact = $(contact);
    var $container = $(container);
  
  sectionInitialize($contact, $container);
  
  // // experiment
  // var $burger = $(container + ' div#burger-container div');
  // burgerEvents($burger);
});
