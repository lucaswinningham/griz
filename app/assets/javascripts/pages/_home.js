/* global $ */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
  var history = 'section#history';
  var work = 'section#work';
  var contact = 'section#contact';
  var footer = 'footer#footer';
  
  var $about = $(about);
  var $history = $(history);
  var $work = $(work);
  var $contact = $(contact);
  var $footer = $(footer);
  
  var sectionInformation = [];
  
  var timeout;
  
  var updateSectionInformation = function() {
    sectionInformation = [$about, $history, $work, $contact, $footer].map(function(section) {
      return {
        position: section.offset().top,
        height: section.height()
      };
    });
  };
  
  var updateTracking = function() {
    var timeout = window.setTimeout(function() {
      updateSectionInformation();
      sectionSnap();
      window.clearTimeout(timeout);
    }, 250);
  };
  
  updateTracking();
  
  var userScrollEvents = 'scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove';
  
  var sectionSnap = function() {
    var scrollPosition = $( document ).scrollTop();
    var windowHeight = window.innerHeight;
    var windowBottomPosition = scrollPosition + windowHeight;
    var sectionBreakRatio = 0.5;
    var sectionIndex = 0;
    
    sectionInformation.forEach(function(info, i, arr) {
      if (i > 0) {
        var sectionPosition = info.position;
        var sectionHeight = info.height;
        
        var sectionBreak = sectionPosition + sectionHeight * sectionBreakRatio;
        
        if (windowBottomPosition > sectionBreak) {
          sectionIndex = i;
        }
      }
    });
    
    window.clearTimeout(timeout);
    
    var msDelay = 200;
    
    var targetSection = sectionInformation[sectionIndex];
    
    // Target of 250ms scroll max time from break point
    // var msScroll = Math.abs(scrollPosition - targetSection.position) * (250 / (targetSection.height * sectionBreakRatio));
    
    // TODO: DRY this up with contact events
    
    var autoScrollStop = function() {
      $('html, body').stop();
      $('html, body').off(userScrollEvents, autoScrollStop);
    };
    
    timeout = window.setTimeout(function() {
      $('html, body').on(userScrollEvents, autoScrollStop);
      
      // $('html, body').animate({scrollTop: targetSection.position + 1}, msScroll, autoScrollStop);
      $('html, body').animate({scrollTop: targetSection.position + 1}, 200, autoScrollStop);
      
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
