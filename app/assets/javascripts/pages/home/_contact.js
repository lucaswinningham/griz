/* global $ */
/* global sectionInitialize */
/* global responsiveEvents */

$( document ).on('turbolinks:load', function() {
  var contact = 'section#contact';
    var container = contact + ' div#contact-container';
      var content = container + ' div#contact-content';
        // var message = content + ' textarea#contact-message';
        var send = content + ' a.btn';
          var sendtext = send + ' div.btn-txt-wrapper span.btn-txt';
        var confirmation = content + ' div#contact-confirmation';
  
  var $contact = $(contact);
    var $container = $(container);
      // var $content = $(content);
        // var $message = $(message);
        var $send = $(send);
          var $sendtext = $(sendtext);
        var $confirmation = $(confirmation);
  
  sectionInitialize($contact, $container);
  
  var pendingTimeout;
  var msPendingDuration = 5000;
  var pendingText = 'CANCEL';
  var originalSendText = $sendtext.html();
  
  var sendSuccess = function() {
    $confirmation.html('Thanks for reaching out! Your message has been sent');
    $confirmation.css({opacity: '1'});
  };
  
  responsiveEvents($send, function(e) {
    e.preventDefault();
    
    if ($send.hasClass('pending')) {
      $send.removeClass('mousedown pending');
      $sendtext.html(originalSendText);
      window.clearTimeout(pendingTimeout);
    } else {
      $send.addClass('mousedown pending');
      $sendtext.html(pendingText);
      $confirmation.html('').css({opacity: '0'});
      
      pendingTimeout = window.setTimeout(function() {
        $send.removeClass('mousedown pending');
        $sendtext.html(originalSendText);
        window.clearTimeout(pendingTimeout);
        
        // send email
          // success
          sendSuccess();
          // error
          
        
        $confirmation.css({opacity: '1'});
      }, msPendingDuration);
    }
    
    return false;
  }, 'click touchend touchcancel');
});
