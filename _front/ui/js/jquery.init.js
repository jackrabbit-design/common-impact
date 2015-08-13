/* ========================================================================= */
/* BE SURE TO COMMENT CODE/IDENTIFY PER PLUGIN CALL */
/* ========================================================================= */

jQuery(function($){


    // PARALLAX
/*
    $(document).scroll(function(){
        var nm = $("html").scrollTop();
        var nw = $("body").scrollTop();
        var n = (nm > nw ? nm : nw);

        $('#element').css({
            'webkitTransform' : 'translate3d(0, ' + n + 'px, 0)',
            'MozTransform'    : 'translate3d(0, ' + n + 'px, 0)',
            'msTransform'     : 'translateY('     + n + 'px)',
            'OTransform'      : 'translate3d(0, ' + n + 'px, 0)',
            'transform'       : 'translate3d(0, ' + n + 'px, 0)',
        });

        // if transform3d isn't available, use top over background-position
        //$('#element').css('top', Math.ceil(n/2) + 'px');

    });    
*/



    /* ====== Twitter API Call ============================================= 
        Note: Script Automatically adds <li> before and after template. Don't forget to setup Auth info in /twitter/index.php */
    /*
    $('#tweets-loading').tweet({       
        modpath: '/path/to/twitter/', // only needed if twitter folder is not in root
        username: 'jackrabbits',
        count: 1,
		template: '<p>{text}</p><p class="tweetlink">{time}</p>' 
	});
    */
	
	_flipBtn();
	_filpSlicer();
	_isScreen();
	_mobileMenu();
	_numbersCarousel();

});


function _flipBtn(){
	$('.flip-btn').click(function(e){
		e.preventDefault();
		$(this).closest('.flip-container').toggleClass('active');
	});
}

function _filpSlicer(){
	$('#champions').slick({
		centerMode: true,
		slidesToShow: 3,	
		dots: true,
		infinite: true,
		arrows:true,
		responsive: [
		{
		  breakpoint: 980,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
			infinite: true,
			dots: true
		  }
		},
		{
		  breakpoint: 768,
		  settings: {
			slidesToShow: 1,
			slidesToScroll:1
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			centerMode: false,
			arrows:false,
			slidesToShow: 1,
			slidesToScroll:1
		  }
		}
	  ]	 
	});
}

function _isScreen(){
	 // IS ON SCREEN
    $.fn.isOnScreen = function(){
        var win = $(window);
        var viewport = {
            top : win.scrollTop()
        };
        viewport.bottom = viewport.top + win.height();
        var bounds = this.offset();
        bounds.bottom = bounds.top + this.outerHeight();
		//console.log(viewport.bottom-100+' < '+bounds.top);
        return (!(viewport.bottom-150 < bounds.top));
    };
	
    $(document).bind('scroll ready', function(){
        /*$('#circle-numbers li').each(function(){
            if($(this).isOnScreen() === true){
                $(this).addClass('active');				
				setTimeout(function(){ 
					var mainBox = $('#circle-numbers li');
					$(mainBox).addClass('show-content');
					$('h4,p',mainBox).fadeIn(400,function(){
						 $(mainBox).addClass('show-line');
					});
				}, 600);	
            }
        });*/
		
		$('#circle-numbers').each(function(){
			if($(this).isOnScreen() === true){
				var delay = 0;
				$('.slick-active',this).each(function() {
					var $li = $(this);
					setTimeout(function() {
					  $li.addClass('active');	
						setTimeout(function(){
						   $li.addClass("show-content");
						   setTimeout(function(){
							   $li.addClass("show-line");
						   }, 1200);
					   }, 1050);
					}, delay+=250);
			  });
			}
		});
   });

}

function _mobileMenu(){
	$('#toggle_menu_btn').click(function(){
		$(this).toggleClass('active');
		$('#mobile-menu-wrap').slideToggle('fast');
	});
}

function _numbersCarousel(){
	$('#circle-numbers').slick({
		centerMode: false,
		slidesToShow: 4,	
		dots: true,
		infinite: true,
		arrows:true,
		responsive: [
		{
		  breakpoint: 1100,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: true,
			dots: true
		  }
		},
		{
		  breakpoint: 880,
		  settings: {
			slidesToShow: 2,
			slidesToScroll:2
		  }
		},
		{
		  breakpoint: 680,
		  settings: {
			slidesToShow: 1,
			slidesToScroll:1
		  }
		},
	  ]	 
	});
	
	$('#circle-numbers').on({
		afterChange: function() {
			$('#circle-numbers').each(function(){
				var delay = 0;
				$('.slick-active',this).each(function() {
					var $li = $(this);
					setTimeout(function() {
					  $li.addClass('active');	
						setTimeout(function(){
						   $li.addClass("show-content");
						   setTimeout(function(){
							   $li.addClass("show-line");
						   }, 1200);
					   }, 800);
					}, delay+=0);
			  });
			});
		}
	});
}

$(window).resize(function(){
	if( $(window).innerWidth() > 767 ){
		$("#mobile-menu-wrap").removeAttr("style");
		$('#toggle_menu_btn').removeClass('active');
	}
});