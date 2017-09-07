/* global $ */
/* global sectionInitialize */
/* global responsiveEvents */
/* global cardEvents */
/* global contactEvents */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
    var container = about + ' div#about-container';
      var card = container + ' div#about-cards .card';
        var contact = card + ' .btn-contact';
      var breadcrumbs = container + ' div#about-breadcrumbs';
        var breadcrumb = breadcrumbs + ' div.about-breadcrumb';
  
  var $about = $(about);
    var $container = $(container);
      var $card = $(card);
        var $contact = $(contact);
      var $breadcrumbs = $(breadcrumbs);
        var $breadcrumb = $(breadcrumb);
  
  // Dramatic intro for first card
  (function() {
    var timeout = window.setTimeout(function() {
      $card.first().addClass('focus');
      
      window.clearTimeout(timeout);
    }, 500);
  }());
  
  // Throw breadcrumbs out
  (function() {
    var ratioBreadcrumb = $breadcrumb.width() / $breadcrumbs.width();
    var ratioUsableWidth = 1 - ratioBreadcrumb;
    
    var timeout = window.setTimeout(function() {
      $breadcrumb.each(function(i) {
        $(this).css({
          left: (100 * ratioUsableWidth * (i / ($breadcrumb.length - 1))) + '%',
        });
      });
      
      window.clearTimeout(timeout);
    }, 1500);
  }());
  
  $breadcrumb.first().addClass('active');
  
  sectionInitialize($about, $container);
  
  var updateContent = function() {
    $(this).removeClass('mousedown hover');
    
    if (!$(this).hasClass('active')) {
      indexCards($(this).index());
      $breadcrumb.removeClass('active');
      $(this).addClass('active');
    }
  };
  
  var indexCards = cardEvents($card, function(newCardIndex) {
    $breadcrumb.removeClass('active');
    
    $breadcrumb.eq(newCardIndex).addClass('active');
  });
  
  // Disable the first card focus for dramatic intro
  $card.first().removeClass('focus');
  
  contactEvents($contact, 3000);
  
  responsiveEvents($breadcrumb, updateContent);
});
