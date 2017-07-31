/* global $ */

$.fn.animateRotate = function(angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(this, arguments);
    };
    
    $({deg: 0}).animate({deg: angle}, args);
  });
};

$( document ).on('turbolinks:load', function() {
  var work = 'section#work';
    var menu = work + ' div#work-menu';
      var center = menu + ' div#work-menu-center';
      var petalContainer = menu + ' div#work-menu-petal-container';
        var petal = petalContainer + ' div.work-menu-petal';
  
  var $work = $(work);
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
    {
      head: '',
      body: '',
    },
    {
      head: '',
      body: '',
    },
  ];
  
  content.forEach(function(val, i) {
    $petalContainer.append('<div class="work-menu-petal"></div>');
  });
  
  var $petal = $(petal);
  
  var $responsive = $([center, petal].join(', '));
  
  var petalContainerDeg = 0;
  
  var sectionFill = function() {
    $work.css({
      'height': $( window ).height(),
    });
  };
  
  sectionFill();
  
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
    positionMenu();
  });
  
  var focusPetal = function() {
    // console.log('last')
    // console.log(petalContainerDeg)
    
    var degTarget = $(this).index() * (360 / $petal.length);
    // Damn js and its quirks
    // https://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
    var degDelta = degTarget - (((petalContainerDeg % 360) + 360) % 360);
    
    // if (petalContainerDeg < 0) {
    //   degDelta = degTarget - (petalContainerDeg % 360);
    // } else {
    //   degDelta = degTarget + (petalContainerDeg % -360);
    // }
    
    if (degDelta > 180) {
      degDelta -= 360;
    } else if (degDelta < -180) {
      degDelta += 360;
    }
    
    console.log({
    last: petalContainerDeg,
    index: $(this).index(),
    target: degTarget,
    mod: petalContainerDeg % 360,
    delt: $(this).index() * (360 / $petal.length) - petalContainerDeg % 360,
    clamp: degDelta,
    deg: petalContainerDeg + degDelta,
    })
    
    // console.log('degTarget')
    // console.log(degTarget)
    // console.log('degDelta')
    // console.log(degDelta)
    
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
  }
  
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
