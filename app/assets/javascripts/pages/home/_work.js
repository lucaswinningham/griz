/* global $ */

$( document ).on('turbolinks:load', function() {
  var work = 'section#work';
    var menu = work + ' div#work-menu';
      var center = menu + ' div#work-menu-center';
      var petal = menu + ' div.work-menu-petal';
  
  var $work = $(work);
    var $menu = $(menu);
      var $center = $(center);
  
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
  ];
  
  content.forEach(function(val, i) {
    $menu.append('<div class="work-menu-petal"></div>');
  });
  
  var $petal = $(petal);
  
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
});
