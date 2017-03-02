	$("document").ready(function() {

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

	    //squareThis(".news_images");

	    /*function squareThis (element, ratio, minLimit)
			{
				
			    // First of all, let's square the element
			    square(ratio, minLimit);
			 
			    // Now we'll add an event listener so it happens automatically
			    window.addEventListener('resize', function(event) {
				square(ratio, minLimit);
			    });
			    
			    // This is just an inner function to help us keep DRY
			    function square(ratio, minLimit)
			    {
				if(typeof(ratio) === "undefined")
				{
				    ratio = 1;
				}
				if(typeof(minLimit) === "undefined")
				{
				    minLimit = 0;
				}
				var viewportWidth = window.innerWidth;
				
				if(viewportWidth >= minLimit)
				{
				    var newElementHeight = $(element).width() * ratio;
				    $(element).height(newElementHeight);
				}
				else
				{
				    $(element).height('auto');
				}
			    }
			}*/


	    $("img").on( "error",function() {
	        ///$(".news_images").css("width", "100%");
	        ///$(".news_images").src('images/logo.jpg');

	        //squareThis(".news_images");
	        //alert("ASD");
	        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
	            // image was broken, replace with your new image
	            //this.src = 'http://www.tranism.com/weblog/images/broken_ipod.gif';
	            $(this).unbind("error").attr("src", "images/logo.jpg");

	        }
	        //("img").src = "images/logo.jpg";

	    });
	    /*function checkimage() {
			
		if ($('.news_images', this).attr('src') == '') {
			($('.news_images', this).attr('src') != '.../images/logo.jpg')
		}
		}*/


	    $('[data-toggle="tooltip"]').tooltip()
	    $('.btn-toggle').click(function() {

	        $(this).find('.btn').toggleClass('active');

	        if ($(this).find('.btn-primary').size() > 0) {
	            $(this).find('.btn').toggleClass('btn-default');
	        }

	        if ($(this).find('.btn-default').size() > 0) {
	            $(this).find('.btn').toggleClass('btn-primary');

	        }


	    });
	    $("#show_images").click(function() {
	        $(".news-title").hide();
	        $(".news_images").show();
	        $(".panel-heading").css("height", "auto");
	        $(".panel-heading").show();
	        //squareThis(".news_images");
	        $(".news_categories").css("margin-top", "0px");


	        $(".detail-images").show();
	          $('.flexslider ul img').css('display','block');
	          $('.flexslider .slides > li').css('min-height',240);
	    });
	    $("#hide_images").click(function() {
	        $(".news-title").show();
	        $(".detail-images").hide();
	        $(".news_images").hide();
	        $(".panel-heading").css("height", "90px");

	        $('.flexslider ul img').css('display','none');
	        $('.flexslider .slides > li').css('min-height',100);
	        ///$(".news_categories").css("font-weight","bold");
	        ///$(".panel-heading").hide();

	        if (viewportwidth > 1200 && viewportwidth < 1600) {
	            $(".news-title").css("margin-top", "3%");

	            $(".news_categories").css("padding-top", "-50px");


	        }
	        if (viewportwidth >= 1600) {

	            $(".news-title").css("margin-top", "5%	");
	            $(".news-title").css("height", "50px");
	            $(".news_categories").css("top", "-10%");

	        }



	    });



	    //------------------------------------
	       //Navigation Menu Slider
        $('#nav-expander').on('click',function(e){
      		e.preventDefault();
      		$('body').toggleClass('nav-expanded');
      	});
      	$('#nav-close').on('click',function(e){
      		e.preventDefault();
      		$('body').removeClass('nav-expanded');
      	});
      	
      	
      	// Initialize navgoco with default options
        $(".main-menu").navgoco({
            caret: '<span class="caret"></span>',
            accordion: false,
            openClass: 'open',
            save: true,
            cookie: {
                name: 'navgoco',
                expires: false,
                path: '/'
            },
            slide: {
                duration: 300,
                easing: 'swing'
            }
        });

	});