/* global $ */

// Prevent turbolinks from reloading on hash links
// https://github.com/turbolinks/turbolinks/issues/75
$( document ).on('turbolinks:click', function(e) {
  if (e.target.getAttribute('href').charAt(0) === '#') {
    return e.preventDefault();
  }
});