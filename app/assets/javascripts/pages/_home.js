/* global $ */

$( document ).on('turbolinks:load', function() {
  var burger = 'header#navigation div#nav-burger-container div.burger';
  var about = 'section#about';
  var history = 'section#history';
  var work = 'section#work';
  var contact = 'section#contact';
  var footer = 'footer#footer';
  
  var $burger = $(burger);
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
    
    sectionInformation.forEach(function(info, i) {
      if (i > 0) {
        var sectionPosition = info.position;
        var sectionHeight = info.height;
        
        var sectionBreak = sectionPosition + sectionHeight * sectionBreakRatio;
        
        if (windowBottomPosition > sectionBreak) {
          sectionIndex = i;
        }
      }
    });
    
    if (sectionIndex < sectionInformation.length - 1) $burger.trigger('track', [sectionIndex + '']);
    
    window.clearTimeout(timeout);
    
    var msDelay = 100;
    
    var targetSection = sectionInformation[sectionIndex];
    
    var autoScrollStop = function() {
      $('html, body').stop();
      $('html, body').off(userScrollEvents, autoScrollStop);
    };
    
    timeout = window.setTimeout(function() {
      $('html, body').on(userScrollEvents, autoScrollStop);
      
      $('html, body').animate({scrollTop: targetSection.position}, 200, autoScrollStop);
      
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
