(function($) {
	
	"use strict";
	
	// Cache Selectors
	var mainWindow			=$(window),
		mainDocument		=$(document),
		myLoader			=$(".loader"),
		pageBody			=$('.canvas'),
		fullScrNav			=$("#fullscr-nav"),
		fullSrcClose		=$("#fullscr-close"),
		fullSrcOpen			=$("#fullscr-open"),
		sideBarNav			=$(".sidenav"),
		sideBarClose		=$("#sidenav-close"),
		sideBarOpen			=$("#sidenav-open"),
		scSideBar			=$("#shopping-cart-sidebar"),
		scOpen				=$("#shc-side-open"),
		usrSideBar			=$("#user-profile-sidebar"),
		usrSideOpen			=$("#usr-side-open"),
		over				=$(".overlay-black");

	
	// Loader
	mainWindow.on('load', function () {
		myLoader.fadeOut("slow");
	});
	
	
	//Full Screen Navigation		
	fullSrcOpen.on('click', function(e) {
		e.stopPropagation();
		fullScrNav.toggleClass('to-top-toggle')
	});
	
	fullSrcClose.on('click', function(e) {
		e.stopPropagation();
		fullScrNav.toggleClass('to-top-toggle')
	});

	//Sidebar Navigation
	$(document).on('click',"#sidenav-open",function(e){
        e.stopPropagation();
        //sideBarNav.toggleClass('to-left-toggle')
        $(".sidenav").toggleClass('to-left-toggle')
        over.css('visibility', 'visible')
	});

	$(document).on('click',"#sidenav-close",function(e){
        e.stopPropagation();
        $(".sidenav").toggleClass('to-left-toggle')
        $(".overlay-black").css('visibility', 'hidden')
	})
	
	
	//Shopping Cart Sidebar	
	scOpen.on('click', function(e) {
		e.stopPropagation();
		scSideBar.toggleClass('to-right-toggle')
		over.css('visibility', 'visible')
	});
	
	
	//User Sidebar
	$(document).on('click',"#usr-side-open",function(e){
        e.stopPropagation();
        $("#user-profile-sidebar").toggleClass('to-right-toggle')
        $(".overlay-black").css('visibility', 'visible')
	});
	/*usrSideOpen.on('click', function(e) {
		e.stopPropagation();
		usrSideBar.toggleClass('to-right-toggle')
		over.css('visibility', 'visible')
	});*/
	
	
	pageBody.on('click', function(e) {
		
	  if ($(".sidenav").hasClass('to-left-toggle')) {
          $(".sidenav").toggleClass('to-left-toggle')
		over.css('visibility', 'hidden')
	  }
	  
	  else if (scSideBar.hasClass('to-right-toggle')) {
		scSideBar.toggleClass('to-right-toggle')
		over.css('visibility', 'hidden')
	  }
	  
	  else if (usrSideBar.hasClass('to-right-toggle')) {
		usrSideBar.toggleClass('to-right-toggle')
		over.css('visibility', 'hidden')
	  }
	})

})(jQuery);