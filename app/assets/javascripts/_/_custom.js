/* global $ */

function BurgerEvents (selector) {
  this.onOpening = function() {};
  this.onOpened = function() {};
  this.onClosing = function() {};
  this.onClosed = function() {};
  
  this.msClose = 300;
  this.msOpen = 150;
  
  this.selector = selector;
  
  this.addListeners = function() {
    var $burger = $(this.selector);
    
    $burger.addClass('closed');
    
    $burger.on('mouseenter', function() {
      $burger.addClass('hover');
    });
    
    $burger.on('mouseleave', function() {
      $burger.removeClass('hover mousedown');
    });
    
    $burger.on('mousedown', function() {
      $burger.addClass('mousedown');
    });
    
    $burger.on('touchstart', function(e) {
      e.preventDefault();
      $burger.addClass('mousedown');
    });
    
    $burger.on('mouseup touchend touchcancel', function() {
      if ($burger.hasClass('mousedown')) {
        $burger.removeClass('mousedown');
        
        window.clearTimeout($burger.timeout);
        
        if ($burger.hasClass('opened') || $burger.hasClass('opening') ) {
          $burger.removeClass('opening').addClass('closing');
          
          this.onClosing();
          
          $burger.timeout = window.setTimeout(function() {
            $burger.removeClass('closing opened').addClass('closed');
            
            this.onClosed();
            
            window.clearTimeout($burger.timeout);
          }.bind(this), this.msClose);
        } else  if ($burger.hasClass('closed') || $burger.hasClass('closing') ) {
          $burger.removeClass('closing').addClass('opening');
          
          this.onOpening();
          
          $burger.timeout = window.setTimeout(function() {
            $burger.removeClass('opening closed').addClass('opened');
            
            this.onOpened();
            
            window.clearTimeout($burger.timeout);
          }.bind(this), this.msOpen);
        }
      }
    }.bind(this));
  }.bind(this);
}

function ContactEvents (selector, msScroll, onClick) {
  this.selector = (selector === undefined ? '#contact' : selector);
  
  this.onClick = (onClick === undefined ? function() {} : onClick);
  
  this.msScroll = (msScroll === undefined ? 2000 : msScroll);
  
  (function() {
    var $contact = $(this.selector);
    
    $contact.on('mouseenter', function() {
      $contact.addClass('hover');
    });
    
    $contact.on('mouseleave', function() {
      $contact.removeClass('hover mousedown');
    });
    
    $contact.on('mousedown', function() {
      $contact.addClass('mousedown');
    });
    
    $contact.on('touchstart', function(e) {
      e.preventDefault();
      $contact.addClass('mousedown');
    });
    
    $contact.on('mouseup', function() {
      $contact.removeClass('hover');
    });
    
    // On desktop: bug
    // Despite preventing default, screen actually follows link when mouseup event used instead of click
    $contact.on('click touchend touchcancel', function(e) {
      if ($contact.hasClass('mousedown')) {
        e.preventDefault();
        
        $contact.removeClass('mousedown hover');
        
        this.onClick();
        
        // var windowScrollTop = $( window ).scrollTop();
        // var sectionTop = $history.offset().top;
        // var sectionSnapTop = sectionTop + fixedBuffer;
        // if (windowScrollTop > sectionTop && windowScrollTop < sectionSnapTop) {
        //   $( window ).scrollTop(sectionSnapTop);
        // }
        
        var userScrollEvents = 'scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove';
        
        var autoScrollStop = function() {
          $('html, body').stop();
          $('html, body').off(userScrollEvents, autoScrollStop);
        };
        
        $('html, body').on(userScrollEvents, function() {
          $('html, body').stop();
          $('html, body').off(userScrollEvents, autoScrollStop);
        });
        
        $('html, body').animate({scrollTop: $('#contact').offset().top}, this.msScroll, function() {
          $('html, body').off(userScrollEvents, autoScrollStop);
        });
        
        this.callback();
        
        // // Reset card properties
        // enableCardTransitionDuration(true);
        // detentCard($contactCard);
        // $contactCard.removeClass('mousedown hover');
        
        return false;
      }
    }.bind(this));
  }.bind(this)());
}
