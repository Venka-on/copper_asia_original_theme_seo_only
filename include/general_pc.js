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



jQuery(document).ready(function(){
  $('.navbar-toggle').on('click', function() {
	   
        $('body').toggleClass('menu-open');
		
		
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


jQuery(document).ready(function(){
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
		$( "#overlay-menu" ).click(function() {
        $( ".overlay" ).addClass('overlay-open');
      });
    
    $( ".overlay-close" ).click(function() {
      $( ".overlay" ).removeClass( 'overlay-open' ); 
      });

});
