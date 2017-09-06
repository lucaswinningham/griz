/* global $ */
/* global sectionInitialize */
/* global responsiveEvents */

$( document ).on('turbolinks:load', function() {
  var contact = 'section#contact';
    var container = contact + ' div#contact-container';
      var content = container + ' div#contact-content';
        var anon = content + ' div#contact-anon';
          var anonstatus = anon + ' div#contact-anon-status';
        var response = content + ' input#contact-response';
        // var message = content + ' textarea#contact-message';
  
  var $contact = $(contact);
    var $container = $(container);
      // var $content = $(content);
        var $anon = $(anon);
          var $anonstatus = $(anonstatus);
        var $response = $(response);
        // var $message = $(message);
  
  sectionInitialize($contact, $container);
  
  responsiveEvents($anon, function() {
    if ($anon.hasClass('anonymous')) {
      $anonstatus.html('RESPONSE');
    } else {
      $anonstatus.html('ANONYMOUS');
    }
    
    $response.prop('disabled', function(i, v) { return !v; });
    $anon.toggleClass('anonymous');
  });
  
  // // experiment
  // var $burger = $(container + ' div#burger-container div');
  // burgerEvents($burger);
});
