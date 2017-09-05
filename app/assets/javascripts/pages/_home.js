/* global $ */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
  var history = 'section#history';
  var work = 'section#work';
  var contact = 'section#contact';
  
  var $about = $(about);
  var $history = $(history);
  var $work = $(work);
  var $contact = $(contact);
  
  var sectionPositions = [];
  
  var timeout;
  
  var updateSectionPositions = function() {
    sectionPositions = [$about, $history, $work, $contact].map(function(val) {
      return val.offset().top;
    });
  };
  
  var updateTracking = function() {
    var timeout = window.setTimeout(function() {
      updateSectionPositions();
      sectionSnap();
      window.clearTimeout(timeout);
    }, 1);
  };
  
  updateTracking();
  
  var sectionSnap = function(e) {
    var scrollPosition = $( document ).scrollTop();
    var sectionScrollBreakRatio = 0.5;
    var sectionIndex = 0;
    
    sectionPositions.forEach(function(sectionPosition, i, arr) {
      if (i > 0) {
        var lastSectionPosition = arr[i - 1];
        var sectionRange = sectionPosition - lastSectionPosition;
        var sectionBreak = sectionRange * sectionScrollBreakRatio + lastSectionPosition;
        
        if (scrollPosition > sectionBreak) {
          sectionIndex = i;
        }
      }
    });
    
    var userScrollEvents = 'scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove';
    var msScroll = 500;
    var msDelay = 500;
    
    var autoScrollStop = function() {
      $('html, body').stop();
      $('html, body').off(userScrollEvents, autoScrollStop);
    };
    
    window.clearTimeout(timeout);
    
    timeout = window.setTimeout(function() {
      $('html, body').on(userScrollEvents, autoScrollStop);
      
      $('html, body').animate({scrollTop: sectionPositions[sectionIndex]}, msScroll, autoScrollStop);
      
      window.clearTimeout(timeout);
    }, msDelay);
  };
  
  $( window ).resize(updateTracking);
  
  $( window ).scroll(sectionSnap);
});
