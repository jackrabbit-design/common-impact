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

function showMoreOrLess(thisObj,bonusContent){
    var caption = thisObj.innerHTML;
    //alert(caption);
    if ( caption == "...Read more" ) {
        document.getElementById(bonusContent).style.display = "inline";
        thisObj.innerHTML = " Read less";
    } else {
        document.getElementById(bonusContent).style.display = "none";
        thisObj.innerHTML = "...Read more";
    }
};

$(window).resize(function(){
	if( $(window).innerWidth() > 767 ){
		$("#mobile-menu-wrap").removeAttr("style");
		$('#toggle_menu_btn').removeClass('active');
	}
});


// number counting function

(function ($) {
  var CountTo = function (element, options) {
    this.$element = $(element);
    this.options  = $.extend({}, CountTo.DEFAULTS, this.dataOptions(), options);
    this.init();
  };

  CountTo.DEFAULTS = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 1,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };

  CountTo.prototype.init = function () {
    this.value     = this.options.from;
    this.loops     = Math.ceil(this.options.speed / this.options.refreshInterval);
    this.loopCount = 0;
    this.increment = (this.options.to - this.options.from) / this.loops;
  };

  CountTo.prototype.dataOptions = function () {
    var options = {
      from:            this.$element.data('from'),
      to:              this.$element.data('to'),
      speed:           this.$element.data('speed'),
      refreshInterval: this.$element.data('refresh-interval'),
      decimals:        this.$element.data('decimals')
    };

    var keys = Object.keys(options);

    for (var i in keys) {
      var key = keys[i];

      if (typeof(options[key]) === 'undefined') {
        delete options[key];
      }
    }

    return options;
  };

  CountTo.prototype.update = function () {
    this.value += this.increment;
    this.loopCount++;

    this.render();

    if (typeof(this.options.onUpdate) == 'function') {
      this.options.onUpdate.call(this.$element, this.value);
    }

    if (this.loopCount >= this.loops) {
      clearInterval(this.interval);
      this.value = this.options.to;

      if (typeof(this.options.onComplete) == 'function') {
        this.options.onComplete.call(this.$element, this.value);
      }
    }
  };

  CountTo.prototype.render = function () {
    var formattedValue = this.options.formatter.call(this.$element, this.value, this.options);
    this.$element.text(formattedValue);
  };

  CountTo.prototype.restart = function () {
    this.stop();
    this.init();
    this.start();
  };

  CountTo.prototype.start = function () {
    this.stop();
    this.render();
    this.interval = setInterval(this.update.bind(this), this.options.refreshInterval);
  };

  CountTo.prototype.stop = function () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  CountTo.prototype.toggle = function () {
    if (this.interval) {
      this.stop();
    } else {
      this.start();
    }
  };

  function formatter(value, options) {
    return value.toFixed(options.decimals);
  }

  $.fn.countTo = function (option) {
    return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('countTo');
      var init    = !data || typeof(option) === 'object';
      var options = typeof(option) === 'object' ? option : {};
      var method  = typeof(option) === 'string' ? option : 'start';

      if (init) {
        if (data) data.stop();
        $this.data('countTo', data = new CountTo(this, options));
      }

      data[method].call(data);
    });
  };
}(jQuery));


jQuery(function ($) {

      // custom formatting example
      $('#hours').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });


     $('#completed').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });

   $('#raised').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed((2))/1;
        }
      });

   $('#volunteers').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });

      // start all the timers
      $('.timer').each(count);

      function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
      }
    });

