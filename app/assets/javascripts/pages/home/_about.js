/* global $ */
/* global sectionInitialize */
/* global responsiveEvents */
/* global cardEvents */
/* global contactEvents */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
    var container = about + ' div#about-container';
      var card = container + ' div#about-cards .card';
        var contact = card + ' a.btn';
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
      $card.first().removeClass('right').addClass('focus');
      
      window.clearTimeout(timeout);
    }, 500);
  }());
  
  var placeBreadcrumbs = function() {
    var ratioBreadcrumb = $breadcrumb.width() / $breadcrumbs.width();
    var ratioUsableWidth = 1 - ratioBreadcrumb;
    var percentUsableWidth = 100 * ratioUsableWidth;
    
    var timeout = window.setTimeout(function() {
      $breadcrumb.each(function(i) {
        $(this).css({
          left: (percentUsableWidth * (i / ($breadcrumb.length - 1))) + '%',
        });
      });
      
      window.clearTimeout(timeout);
    }, 500);
  };
  
  placeBreadcrumbs();
  
  $( window ).resize(function() {
    var timeout = window.setTimeout(function() {
      placeBreadcrumbs();
      window.clearTimeout(timeout);
    }, 500);
  });
  
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
  $card.first().removeClass('focus').addClass('right');
  
  contactEvents($contact, 3000);
  
  responsiveEvents($breadcrumb, updateContent);
});
