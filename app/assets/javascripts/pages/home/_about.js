/* global $ */

$( document ).on('turbolinks:load', function() {
  var about = 'section#about';
    var hero = about + ' div#hero';
    var pull = about + ' div#about-pull';
      var pullHandle = pull + ' div#about-pull-handle';
      var pullTondo = pull + ' div#about-pull-tondo';
      var pullContent = pull + ' div#about-pull-content';
        var pullTease = pullContent + ' div.about-pull-tease';
        var pullInfo = pullContent + ' div.about-pull-info';
        var pullSummary = pullContent + ' div.about-pull-summary';
      var pullBreadcrumbs = pull + ' div#about-pull-breadcrumbs';
        var pullBreadcrumb = pullBreadcrumbs + ' span';
    var contact = about + ' a#about-contact';
  
  var $about = $(about);
    var $hero = $(hero);
    var $pull = $(pull);
      var $pullHandle = $(pullHandle);
      var $pullTondo = $(pullTondo);
      var $pullContent = $(pullContent);
        var $pullTease = $(pullTease);
        var $pullInfo = $(pullInfo);
        var $pullSummary = $(pullSummary);
      var $pullBreadCrumbs = $(pullBreadcrumbs);
    var $contact = $(contact);
  
  var content = [
    {
      tease: 'I AM GRIZ',
      info: 'I enjoy creating beautifully designed experiences',
      summary: 'Contact me for your next website or job',
    },
    {
      tease: 'FEAR THE PUP MILLIE',
      info: 'Rescued and sassy, she loves playing with bones and howling at strangers',
      summary: 'Will demand play before cuddles',
    },
    {
      tease: 'LEARNING AND LISTENING',
      info: 'I am a tinkerer by nature and love solving problems with new tools',
      summary: 'I am always up for a challenge',
    },
  ];
    
  $pullBreadCrumbs.html('<span class="active"></span>');
  content.forEach(function(val, i) {
    if (i > 0) {
      $pullBreadCrumbs.append('<span></span>');
    }
  });
  
  var $pullBreadcrumb = $(pullBreadcrumb);
  
  var $responsive = $([pullHandle, contact, pullTondo, pullBreadcrumb].join(', '));
  
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
  
  var setContent = function(index) {
    var newContent = content[index];
    $pullTease.html('<span>' + newContent.tease + '</span>');
    $pullInfo.html('<span>' + newContent.info + '</span>');
    $pullSummary.html('<span>' + newContent.summary + '</span>');
  };
  
  setContent(0);
  
  var updateContent = function() {
    if ($(this).hasClass('mousedown')) {
      $(this).removeClass('mousedown hover');
      
      if (!$(this).hasClass('active')) {
        setContent($(this).index());
        $pullBreadcrumb.removeClass('active');
        $(this).addClass('active');
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
  
  $pullBreadcrumb.on('mouseup touchend touchcancel', updateContent);
  
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
