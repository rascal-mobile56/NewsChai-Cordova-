var viewportwidth;
var viewportheight;

// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

if (typeof window.innerWidth != 'undefined') {
    viewportwidth = window.innerWidth,
    viewportheight = window.innerHeight
}

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !=
    'undefined' && document.documentElement.clientWidth != 0) {
    viewportwidth = document.documentElement.clientWidth,
    viewportheight = document.documentElement.clientHeight
}

// older versions of IE
else {
    viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
    viewportheight = document.getElementsByTagName('body')[0].clientHeight
}

/*$('#slider-plugin').sliderPro({
    width: 920,
    height: 500,
    orientation: 'vertical',
    loop: false,
    arrows: true,
    buttons: false,
    thumbnailsPosition: 'right',
    thumbnailPointer: true,
    thumbnailWidth: 290,
    breakpoints: {
        800: {
            thumbnailsPosition: 'bottom',
            thumbnailWidth: 270,
            thumbnailHeight: 100
        },
        500: {
            thumbnailsPosition: 'bottom',
            thumbnailWidth: 120,
            thumbnailHeight: 50
        }
    }
});
*/
/* hiding and Showing Images */
$('.btn-toggle').click(function() {

    $(this).find('.btn').toggleClass('active');

    if ($(this).find('.btn-primary').size() > 0) {
        $(this).find('.btn').toggleClass('btn-default');

    }
});
