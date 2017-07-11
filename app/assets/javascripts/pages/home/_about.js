/* global $ */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
    var hero = about + ' div#hero';
    var pull = about + ' div#about-pull';
      var pullHandle = pull + ' div#about-pull-handle';
      var pullTondo = pull + ' div#about-pull-tondo';
      var pullAboutMe = pull + ' div#about-me';
      var pullAboutMillie = pull + ' div#about-millie';
      var pullAboutLearning = pull + ' div#about-learning';
        var pullTease = pull + ' div div.about-pull-tease';
        var pullInfo = pull + ' div div.about-pull-info';
        var pullSummary = pull + ' div div.about-pull-summary';
    var contact = about + ' a#about-contact';
  
  var $about = $(about);
    var $hero = $(hero);
    var $pull = $(pull);
      var $pullHandle = $(pullHandle);
      var $pullTondo = $(pullTondo);
      
      var $pullAboutMe = $(pullAboutMe);
      var $pullAboutMillie = $(pullAboutMillie);
      var $pullAboutLearning = $(pullAboutLearning);
      
        var $pullTease = $(pullTease);
        var $pullInfo = $(pullInfo);
        var $pullSummary = $(pullSummary);
        
    var $contact = $(contact);
  
  var $responsive = $([pullHandle, contact, pullTondo].join(', '));
  
  var heroFill = function() {
    $about.css({
      'height': $( window ).height(),
    });
  };
  
  var contactSize = function() {
    $contact.css({
      'height': $( window ).height() / 12,
      'font-size': $( window ).height() / 24,
    });
  };
  
  var tondoPosition = function() {
    var windowHeight = $( window ).height();
    var windowWidth =  $( window ).width();
    
    if (windowHeight > windowWidth) {
      $pullTondo.css({
        height: windowWidth - 30,
        width: windowWidth - 30,
        top: $( window ).height() / 2 - windowWidth / 2 - $pull.offset().top + 15,
        right: 15,
      });
    } else {
      $pullTondo.css({
        height: windowHeight - 30,
        width: windowHeight - 30,
        top: 15 - $pull.offset().top,
        right: $( window ).width() / 2 - windowHeight / 2 + 15,
      });
    }
  };
  
  heroFill();
  contactSize();
  
  $( window ).resize(function() {
    heroFill();
    contactSize();
    if ($pullTondo.hasClass('focus')) {
      tondoPosition();
    }
  })
  
  var togglePull = function() {
    if ($(this).hasClass('mousedown')) {
      $pullHandle.removeClass('mousedown hover');
      
      if ($pull.hasClass('show')) {
        $pull.removeClass('show');
        $pullHandle.html('<span>></span>');
        $hero.removeClass('shrink');
      } else {
        $pull.addClass('show');
        $pullHandle.html('<span><</span>');
        $hero.addClass('shrink');
        
        $pullAboutMillie.addClass('show');
      }
    }
  };
  
  var toggleTondo = function() {
    if ($pullTondo.hasClass('mousedown')) {
      $pullTondo.removeClass('mousedown hover');
      
      if ($pullTondo.hasClass('focus')) {
        $pullTondo.removeClass('focus');
        $pullTondo.css({
          height: '',
          width: '',
          top: '',
          right: '',
        });
      } else {
        $pullTondo.addClass('focus');
        tondoPosition();
      }
    }
  };
  
  $responsive.on('mousedown', function() {
    $(this).addClass('mousedown');
  });
  
  $pullHandle.on('mouseup touchend touchcancel', togglePull);
  
  $contact.on('mouseup touchend touchcancel', function() {
    $contact.removeClass('mousedown hover');
  });
  
  $pullTondo.on('mouseup touchend touchcancel', toggleTondo);
  
  $responsive.on('mouseenter', function() {
    $(this).addClass('hover');
  });
  
  $responsive.on('mouseleave', function() {
    $(this).removeClass('hover mousedown');
  });
  
  $responsive.on('touchstart', function(e) {
    e.preventDefault();
    $(this).addClass('mousedown');
  });
});
