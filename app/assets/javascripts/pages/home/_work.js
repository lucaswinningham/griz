/* global $ */

$( document ).on('turbolinks:load', function() {
  var work = 'section#work';
    var container = work + ' div#work-container';
      var menu = container + ' div#work-menu';
        var center = menu + ' div#work-menu-center';
        var petalContainer = menu + ' div#work-menu-petal-container';
          var petal = petalContainer + ' div.work-menu-petal';
  
  var $work = $(work);
    var $container = $(container);
      var $menu = $(menu);
        var $center = $(center);
        var $petalContainer = $(petalContainer);
  
  var content = [
    {
      head: '',
      body: '',
    },
    {
      head: '',
      body: '',
    },
    {
      head: '',
      body: '',
    },
    // {
    //   head: '',
    //   body: '',
    // },
    // {
    //   head: '',
    //   body: '',
    // },
    // {
    //   head: '',
    //   body: '',
    // },
    // {
    //   head: '',
    //   body: '',
    // },
    // {
    //   head: '',
    //   body: '',
    // },
  ];
  
  content.forEach(function(val, i) {
    $petalContainer.append('<div class="work-menu-petal">' + i + '</div>');
  });
  
  var $petal = $(petal);
  
  var $responsive = $([center, petal].join(', '));
  
  var petalContainerDeg = 0;
  
  var fixedBuffer = 200;
  
  var sectionFill = function() {
    $work.css({
      'height': (window.innerHeight + fixedBuffer) + 'px',
      'padding-bottom': fixedBuffer + 'px',
    });
    
    $container.css({
      'height': window.innerHeight + 'px',
    });
  };
  
  sectionFill();
  
  var handleFixed = function() {
    var scrollPosition = Math.round($( document ).scrollTop());
    var fixedTop = $work.offset().top;
    var fixedBottom = $work.offset().top + fixedBuffer;
    
    if (scrollPosition < fixedTop) {
      $container.css({
        'position': 'absolute',
        'top': '0px',
      });
    } else if (scrollPosition > fixedBottom) {
      $container.css({
        'position': 'absolute',
        'top': fixedBuffer + 'px',
      });
    } else {
      $container.css({
        'position': 'fixed',
        'top': '0px',
      });
    }
  };
  
  handleFixed();
  
  var positionMenu = function() {
    var windowHeight = $( window ).height();
    var windowWidth =  $( window ).width();
    var boundingLength;
    var gutter = 15;
    
    if (windowHeight > windowWidth) {
      boundingLength = windowWidth;
      
      $menu.css({
        height: windowWidth - 2 * gutter,
        width: windowWidth - 2 * gutter,
        top: windowHeight / 2 - windowWidth / 2 + gutter,
        right: gutter,
      });
    } else {
      boundingLength = windowHeight;
      
      $menu.css({
        height: windowHeight - 2 * gutter,
        width: windowHeight - 2 * gutter,
        top: gutter,
        right: windowWidth / 2 - windowHeight / 2 + gutter,
      });
    }
    
    var centerRatio = 0.05;
    var petalRatio = 0.1;
    var centerRadius = boundingLength * centerRatio;
    var petalRadius = boundingLength * petalRatio;
    
    $center.css({
      top: '50%',
      left: '50%',
      width: centerRadius * 2,
      height: centerRadius * 2,
    });
    
    $petal.each(function(i) {
      var theta = (-i * 360 / $petal.length + 90) * Math.PI / 180;
      var y = Math.sin(theta) * (1 - petalRatio * 2);
      var x = Math.cos(theta) * (1 - petalRatio * 2);
      var top =  100 * (0.5 - y / 2);
      var left = 100 * (0.5 - x / 2);
      
      $(this).css({
        top: top + '%',
        left: left + '%',
        width: petalRadius * 2,
        height: petalRadius * 2,
      });
    });
  };
  
  positionMenu();
  
  $( window ).resize(function() {
    sectionFill();
    handleFixed();
    positionMenu();
  });
  
  $( window ).scroll(handleFixed);
  
  var focusPetal = function() {
    var degTarget = $(this).index() * (360 / $petal.length);
    // Damn js and its quirks
    // https://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
    var degDelta = degTarget - (((petalContainerDeg % 360) + 360) % 360);
    
    if (degDelta > 180) {
      degDelta -= 360;
    } else if (degDelta < -180) {
      degDelta += 360;
    }
    
    var deg = petalContainerDeg + degDelta;
    petalContainerDeg = deg;
    
    $petalContainer.css({
      '-webkit-transform': 'rotate(' + deg + 'deg)',
      '-moz-transform': 'rotate(' + deg + 'deg)',
      '-o-transform': 'rotate(' + deg + 'deg)',
      'transform': 'rotate(' + deg + 'deg)',
    });
    
    $petal.css({
      '-webkit-transform': 'translate(-50%,-50%) rotate(' + (deg * -1) + 'deg)',
      '-moz-transform': 'translate(-50%,-50%) rotate(' + (deg * -1) + 'deg)',
      '-o-transform': 'translate(-50%,-50%) rotate(' + (deg * -1) + 'deg)',
      'transform': 'translate(-50%,-50%) rotate(' + (deg * -1) + 'deg)',
    });
  };
  
  $responsive.on('mousedown', function() {
    $(this).addClass('mousedown');
  });
  
  // $center.on('mouseup touchend touchcancel', doSomething);
  
  $petal.on('mouseup touchend touchcancel', focusPetal);
  
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
