/* global $ */
/* global sectionInitialize */
/* global responsiveEvents */

$( document ).on('turbolinks:load', function() {
  var contact = 'section#contact';
    var container = contact + ' div#contact-container';
      var content = container + ' div#contact-content';
        // var message = content + ' textarea#contact-message';
        var send = content + ' a.btn';
  
  var $contact = $(contact);
    var $container = $(container);
      // var $content = $(content);
        // var $message = $(message);
        var $send = $(send);
  
  sectionInitialize($contact, $container);
  
  responsiveEvents($send, function(e) {
    e.preventDefault();
    
    return false;
  }, 'click touchend touchcancel');
});
