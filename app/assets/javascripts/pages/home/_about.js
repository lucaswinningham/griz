/* global $ */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
    var hero = about + ' div#hero';
    var pull = about + ' div#about-pull';
      var pullHandle = pull + ' div#about-pull-handle';
      var pullTondo = pull + ' div#about-pull-tondo';
      var pullContent = pull + ' div#about-pull-content';
      // var pullAboutMe = pull + ' div#about-me';
      // var pullAboutMillie = pull + ' div#about-millie';
      // var pullAboutLearning = pull + ' div#about-learning';
        var pullTease = pull + ' div div.about-pull-tease';
        var pullInfo = pull + ' div div.about-pull-info';
        var pullSummary = pull + ' div div.about-pull-summary';
    var contact = about + ' a#about-contact';
  
  var $about = $(about);
    var $hero = $(hero);
    var $pull = $(pull);
      var $pullHandle = $(pullHandle);
      var $pullTondo = $(pullTondo);
      var $pullContent = $(pullContent);
      
      // var $pullAboutMe = $(pullAboutMe);
      // var $pullAboutMillie = $(pullAboutMillie);
      // var $pullAboutLearning = $(pullAboutLearning);
      
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
  
  heroFill();
  
  var contactSize = function() {
    $contact.css({
      'height': $( window ).height() / 12,
      'font-size': $( window ).height() / 24,
    });
  };
  
  contactSize();
  
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
  
  $( window ).resize(function() {
    heroFill();
    contactSize();
    if ($pullTondo.hasClass('focus')) {
      tondoPosition();
    }
  });
  
  var newContent = function(tease, info, summary) {
    return {
      tease: tease,
      info: info,
      summary: summary,
    };
  };
  
  var content = [
    newContent(
      'I AM GRIZ',
      'I enjoy creating beautifully designed experiences',
      'Contact me for your next website or job'
    ),
    newContent(
      'FEAR THE PUP MILLIE',
      'Rescued and sassy, she loves playing with bones and howling at strangers',
      'Will demand play before cuddles'
    ),
    newContent(
      'LEARNING AND LISTENING',
      'I am a tinkerer by nature and love solving problems with new tools',
      'I am always up for a challenge'
    ),
  ];
  
  var contentPointer = 2;
  
  var setContent = function(content) {
    $pullTease.html('<span>' + content.tease + '</span>');
    $pullInfo.html('<span>' + content.info + '</span>');
    $pullSummary.html('<span>' + content.summary + '</span>');
  };
  
  setContent(content[contentPointer]);
  
  var nextContent = function() {
    contentPointer += 1;
    
    if (contentPointer >= content.length) {
      contentPointer = 0;
    }
    
    setContent(content[contentPointer]);
  };
  
  var prevContent = function() {
    if (contentPointer <= 0) {
      contentPointer = content.length;
    }
    
    contentPointer -= 1;
    
    setContent(content[contentPointer]);
  };
  
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
