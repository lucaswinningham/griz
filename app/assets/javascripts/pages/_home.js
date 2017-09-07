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
    sectionPositions = [$about, $history, $work, $contact].map(function(section) {
      return section.offset().top;
    });
  };
  
  var updateTracking = function() {
    var timeout = window.setTimeout(function() {
      updateSectionPositions();
      sectionSnap();
      window.clearTimeout(timeout);
    }, 250);
  };
  
  updateTracking();
  
  var userScrollEvents = 'scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove';
  
  var sectionSnap = function() {
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
    
    window.clearTimeout(timeout);
    
    var msDelay = 250;
    
    // Target of 250ms scroll time per section height
    var msScroll = 500 * Math.abs(scrollPosition - sectionPositions[sectionIndex]) / window.innerHeight;
    
    // TODO: DRY this up with contact events
    
    var autoScrollStop = function() {
      $('html, body').stop();
      $('html, body').off(userScrollEvents, autoScrollStop);
    };
    
    timeout = window.setTimeout(function() {
      $('html, body').on(userScrollEvents, autoScrollStop);
      
      $('html, body').animate({scrollTop: sectionPositions[sectionIndex] + 1}, msScroll, autoScrollStop);
      
      window.clearTimeout(timeout);
    }, msDelay);
  };
  
  $( window ).resize(updateTracking);
  
  $( window ).on(userScrollEvents, sectionSnap);
  
  $('html, body').on('touchstart', function() {
    $( window ).off(userScrollEvents, sectionSnap);
  });
  
  $('html, body').on('touchend', function() {
    sectionSnap();
    $( window ).on(userScrollEvents, sectionSnap);
  });
  
  $('input, select, textarea').on('touchend', function(e) {
    e.stopPropagation();
    $( window ).off(userScrollEvents, sectionSnap);
  });
});
