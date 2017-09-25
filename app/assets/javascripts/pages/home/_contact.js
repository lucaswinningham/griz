/* global $ */
/* global sectionInitialize */
/* global responsiveEvents */

$( document ).on('turbolinks:load', function() {
  var contact = 'section#contact';
    var container = contact + ' div#contact-container';
      var content = container + ' div#contact-content';
        var address = content + ' input#contact-address';
        var message = content + ' textarea#contact-message';
        var send = content + ' a.btn';
          var sendtext = send + ' div.btn-txt-wrapper span.btn-txt';
        var confirmation = content + ' div#contact-confirmation';
  
  var $contact = $(contact);
    var $container = $(container);
      // var $content = $(content);
        var $address = $(address);
        var $message = $(message);
        var $send = $(send);
          var $sendtext = $(sendtext);
        var $confirmation = $(confirmation);
  
  sectionInitialize($contact, $container);
  
  var pendingTimeout;
  var msPendingDuration = 5000;
  var pendingText = 'CANCEL';
  var originalSendText = $sendtext.html();
  
  var sendSuccess = function() {
    $message.val('');
    $confirmation.html('Thanks for reaching out! Your message has been sent.');
    $confirmation.css({opacity: '1'});
  };
  
  var sendError = function() {
    $confirmation.html('Whoops! There was a problem. Please refresh and try sending again.');
    $confirmation.css({opacity: '1'});
  };
  
  var addressError = function() {
    $confirmation.html('Sorry! Please enter a valid email address and try sending again.');
    $confirmation.css({opacity: '1'});
  };
  
  var messageError = function() {
    $confirmation.html('Sorry! Please enter a message and try sending again.');
    $confirmation.css({opacity: '1'});
  };
  
  // http://emailregex.com/
  var validAddress = function() {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = $address.val().match(regex);
    
    if (!valid) {
      $address.on('keypress', function() {
        resetConfirmation();
        $address.off('keypress');
      });
      
      addressError();
    }
    
    return valid;
  };
  
  var validMessage = function() {
    var valid = $message.val().trim() != '';
    
    if (!valid) {
      $message.on('keypress', function() {
        resetConfirmation();
        $message.off('keypress');
      });
      
      messageError();
    }
    
    return valid;
  };
  
  var validForm = function() {
    return validAddress() && validMessage();
  };
  
  var resetConfirmation = function() {
    $confirmation.html('').css({opacity: '0'});
  };
  
  responsiveEvents($send, function() {
    if ($send.hasClass('pending')) {
      $send.removeClass('mousedown pending');
      $sendtext.html(originalSendText);
      window.clearTimeout(pendingTimeout);
    } else {
      if (!validForm()) return;
      
      $send.addClass('mousedown pending');
      $sendtext.html(pendingText);
      resetConfirmation();
      
      pendingTimeout = window.setTimeout(function() {
        $send.removeClass('mousedown pending');
        $sendtext.html(originalSendText);
        window.clearTimeout(pendingTimeout);
        
        $.ajax({
          method: 'POST',
          url: '/emails/',
          dataType: 'JSON',
          data: {
            email: {
              address: $address.val(),
              message: $message.val()
            }
          },
          success: sendSuccess,
          error: sendError,
        });
      }, msPendingDuration);
    }
  });
});
