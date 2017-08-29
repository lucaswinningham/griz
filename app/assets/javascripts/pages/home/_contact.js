/* global $ */

$( document ).on('turbolinks:load', function() {
  var contact = 'section#contact';
    var container = contact + ' div#contact-container';
  
  var $contact = $(contact);
    var $container = $(container);
  
  var fixedBuffer = 200;
  
  var sectionFill = function() {
    $contact.css({
      'height': (window.innerHeight + fixedBuffer) + 'px',
      'padding-bottom': fixedBuffer + 'px',
    });
    
    $container.css({
      'height': window.innerHeight + 'px',
    });
  };
  
  sectionFill();
  
  var handleFixed = function() {
    var scrollPosition = Math.round($( document ).scrollTop());
    var fixedTop = $contact.offset().top;
    var fixedBottom = $contact.offset().top + fixedBuffer;
    
    if (scrollPosition < fixedTop) {
      $container.css({
        'position': 'absolute',
        'top': '0px',
      });
    } else if (scrollPosition > fixedBottom) {
      $container.css({
        'position': 'absolute',
        'top': fixedBuffer + 'px',
      });
    } else {
      $container.css({
        'position': 'fixed',
        'top': '0px',
      });
    }
  };
  
  handleFixed();
  
  $( window ).resize(function() {
    sectionFill();
  });
  
  $( window ).scroll(handleFixed);
  
  // experiment
  
  var burgerEvents = new BurgerEvents(container + ' div#burger-container div');
  burgerEvents.addListeners();
});
