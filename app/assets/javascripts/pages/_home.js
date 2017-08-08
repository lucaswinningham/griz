// /* global $ */

// $( document ).on('turbolinks:load', function() {
//   var about = 'section#about';
//   var history = 'section#history';
//   var work = 'section#work';
//   var contact = 'section#contact';
  
//   var $about = $(about);
//   var $history = $(history);
//   var $work = $(work);
//   var $contact = $(contact);
  
//   var sectionTrackings = [];
  
//   var updateSectionTrackings = function() {
//     sectionTrackings = [$about, $history, $work, $contact].map(function(val) {
//       var topBorder = parseInt(val.css("border-top-width"));
//       var bottomBorder = parseInt(val.css("border-bottom-width"));
      
//       return {
//         boundTop: val.offset().top,
//         boundBottom: val.offset().top + topBorder + bottomBorder,
//         $: val,
//       };
//     });
//   };
  
//   var sectionTrack = function() {
//     var scrollPosition = $( document ).scrollTop();
    
//     sectionTrackings.forEach(function(sectionTracking) {
//       var top = sectionTracking.boundTop;
//       var bottom = sectionTracking.boundBottom;
      
//       if (scrollPosition > top && scrollPosition < bottom) {
//         sectionTracking.$.css({
//           'border-top-width': (scrollPosition - top) + 'px',
//           'border-bottom-width': (bottom - scrollPosition) + 'px',
//         });
//       }
//     });
//   };
  
//   var sectionTrackingTimeout = window.setTimeout(function() {
//     updateSectionTrackings();
//     sectionTrack();
//     window.clearTimeout(sectionTrackingTimeout);
//   });
  
//   $( window ).resize(sectionTrackingTimeout);
  
//   $( window ).scroll(sectionTrack);
// });
