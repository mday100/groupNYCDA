/* Put all code that should be run once the page has been loaded in here */

var $ = jQuery;

$(document).ready(function() {
    // Captify images
    $('img.captify').captify({});
});

function openLink(href, target) {
    window.open(href, target);
    return false;
}