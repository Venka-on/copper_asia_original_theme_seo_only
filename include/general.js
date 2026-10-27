window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  
  return check;
}
		
	if(window.mobilecheck() == true){
		//$('#bootstrapcss').remove();
		//$('head').append('<link rel="stylesheet" type="text/css" href="css/mobile.css" />');
		//$('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1');
	}


// Display page active
$(document).ready(function(){
	var str=location.href.toLowerCase();
 
 $('#navmenu-h li a').each(function() {
  if (str.indexOf(this.href.toLowerCase()) > -1 && $(this).attr('href') != '#') {
    $(this).parents('li').addClass("active"); 
    }
  });

	
	// Clearfield
	$('.clearfield').clearField();
	 
	 
	 
	// Banner slider - nivo	 
	if($('#banner').length){
		$('#slider').nivoSlider({
			  effect:'fade', // Specify sets like: 'fold,fade,sliceDown,random'
			  slices:30, // For slice animations
			  boxCols: 30, // For box animations
			  boxRows: 30, // For box animations
			  animSpeed:800, // Slide transition speed
			  pauseTime: 7000, // How long each slide will show
			  startSlide:0, // Set starting Slide (0 index)
			  directionNav:true, // Next & Prev navigation
			  directionNavHide:false, // Only show on hover
			  controlNav: true, // 1,2,3... navigation
			  controlNavThumbs:false, // Use thumbnails for Control Nav
			  controlNavThumbsFromRel:false, // Use image rel for thumbs
			  controlNavThumbsSearch: '.jpg', // Replace this with...
			  controlNavThumbsReplace: '_thumb.jpg', // ...this in thumb Image src
			  keyboardNav:false, // Use left & right arrows
			  pauseOnHover:false, // Stop animation while hovering
			  manualAdvance:false, // Force manual transitions
			  captionOpacity:0.8, // Universal caption opacity
			  prevText: 'Prev', // Prev directionNav text
			  nextText: 'Next', // Next directionNav text
			 
			  slideshowEnd: function(){}, // Triggers after all slides have been shown
			  lastSlide: function(){}, // Triggers when last slide is shown
			  afterLoad: function(){} // Triggers when slider has loaded
		  });
		  $(window).resize(function() {
		  centerSliderImg();
		});
	}
	
	setTimeout(function(){centerSliderImg();}, 0.5);
  
})
// Centeralizing the banner function
function centerSliderImg() {
	
	var bodyWd = $('body').width();
	var sliderWd = $('.nivo-main-image').width();
	if(sliderWd > bodyWd) {
		$('.nivoSlider').css('margin-left','-'+(sliderWd - bodyWd)/2+'px');	
	}
}



$(document).ready(function(){
  $('.toggle').on('click', function() {
	   
        $('body, .nav_wrapper, .nav_overlay').toggleClass('active');	
		
    });
	
	$('.nav_overlay').click(function(){
		$('body, .nav_wrapper, .nav_overlay').toggleClass('active');	
	});
	$('body').click(function(evt){    
       
		  if(evt.target.id == "content")
          return;
       //For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
       if($(evt.target).closest('#wrapper').length)
          return;             
		$("button.navbar-toggle").addClass("collapsed");
		$("button").attr("aria-expanded","false");
		$("div").attr("aria-expanded","false");
		$(".navbar-collapse").removeClass('in');
		 $('body').removeClass('menu-open');
      //Do processing of click event here for every element except with id menu_content

});
	
	
});


$(document).ready(function(){
  $('.navbar-toggle').on('click', function() {
	   
        $('body').toggleClass('menu-open');
		
		
    });
	
	
});


// Scroll to top
$(function () {
	$.scrollUp({
		scrollDistance: 10,         // Distance from top/bottom before showing element (px)
		scrollFrom: 'top',           // 'top' or 'bottom'
		scrollSpeed: 400,            // Speed back to top (ms)
		easingType: 'linear',        // Scroll to top easing (see http://easings.net/)
		animation: 'fade',           // Fade, slide, none   Button’s transition
		animationSpeed: 400,         // Animation speed (ms)
		scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
		scrollTarget: false,         // Set a custom target element for scrolling to. Can be element or number
		scrollText: '', // Text for element, can contain HTML
		scrollTitle: false,          // Set a custom <a> title if required.
		scrollImg: false,            // Set true to use image
		activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
		zIndex: 2147483647,          // Z-Index for the overlay
		scrollImg: {
			active: true,
			type: 'background',
			src: '/images/top.png'
		}
	});
});

jQuery(document).ready(function () {
	$(".sidebar-nav").hide();
    $('.navbar-toggle').on('click', function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $('body').toggleClass('menu-open');
		$(".sidebar-nav").fadeToggle( "fast","linear"  );

    });

    $('body').click(function (evt) {

        if (evt.target.id == "content")
            return;
        //For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
        if ($(evt.target).closest('#wrapper').length)
            return;
        $("#wrapper").removeClass("toggled");
        $('body').removeClass('menu-open');
		$(".sidebar-nav").fadeOut("fast");
        //Do processing of click event here for every element except with id menu_content

    });
    $('#content').click(function (event) {
        event.stopPropagation();
    });
	
	$('.icon_dropdown .dropdown').hide();
		
		$('.icon_dropdown').hover(function() {
		  $(this).find('.dropdown').show();
			},
			function() {
			  $(this).find('.dropdown').hide();
			}
		);
		
		$( "#overlay-menu" ).click(function() {
        $( ".overlay" ).addClass('overlay-open');
      });
    
    $( ".overlay-close" ).click(function() {
      $( ".overlay" ).removeClass( 'overlay-open' ); 
      });
		
	 /*$('a[href="#search"]').on('click', function(event) {
        event.preventDefault();
       
    });
    
    $('#search, #search button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });*/
});
