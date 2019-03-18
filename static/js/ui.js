$(function(){
	
	/* ==============================
	 * common
	 * ============================== */
	headerUI();
	footerUI();
	tabUI();
	layerpopup();
	scrollAnimation();
	scrollAnimation2(); //다른타입
	typedEffect();
	etcUI();
	$(window).load(function(){
		countUp();
	});

	/* ==============================
	 * content 
	 * ============================== */
	main();
	htmlInclude();
	
});

var headerUI = function(){
	$(window).scroll(function(){
		var h = $(window).scrollTop();
		if(h > 500){
			$('#headerWrap').addClass('on');
		}else{
			$('#headerWrap').removeClass('on');
		}
	});

	//gnb
	$('.btnGnbOpen').on('click',function(e){
		e.preventDefault();
		$('body').addClass('gnbOpen');
	});
	$('.btnGnbClose').on('click',function(e){
		e.preventDefault();
		$('body').removeClass('gnbOpen');
	});
	$('#gnb .inSub').on('click',function(e){
		e.preventDefault();
		$(this).next('ul').stop().slideToggle();
		$(this).parent().toggleClass('on').siblings().removeClass('on').find('ul').slideUp();
	});
};
var footerUI = function(){
	//btnTop
	$('.btnTop').on('click',function(e){
		e.preventDefault();
		$('html,body').animate({'scrollTop':0},500);
	});
};

var tabUI = function(){
	var $onText = '<span class="blind">현재위치</span>';

	$(document).on('click','.ui-tabmenu a',function(e) {
		e.preventDefault();
		if(!$(this).parent().hasClass('on')){
			var href = $(this).attr('href');
			$(href).addClass('on').siblings('.tab-cont').removeClass('on');
			$(this).prepend($onText).parent().addClass('active').siblings().removeClass('active').find('.blind').remove();
		}

		//웹 접근성 보완
		var $role = $(this).attr('role');
		if($role == 'tab'){
			var $tabpanel = $(this).attr('aria-controls');
			$(this).attr('aria-selected',true).closest('li').siblings().find('[role=tab]').attr('aria-selected',false);
			$('#'+$tabpanel).attr('aria-expanded',true).siblings('[role=tabpanel]').attr('aria-expanded',false);
		}
	});

	$(window).load(function(){
		if($('.ui-tabmenu').length > 0){
			$('.ui-tabmenu').each(function(index, element) {
				var $this = $(this);
				$this.find('li').eq(0).find('a').trigger('click');
			});
		}
		if($('.tabmenu').length > 0){
			$('.tabmenu').each(function(index, element) {
				var $this = $(this),
					$on = $this.find('li.on'),
					$left = ($on.position().left - $(window).width()/2) + ($on.width()/2);
				$this.animate({'scrollLeft':$left},500);
			});
		}
	});
};

function main(){
	section01();
	
	function section01(){
		var target = $('.mainSec01 [class*=slideImg]');
		var idx = 0;
		var length = target.length -1;
		var delay = 5000;
		// var timer = setInterval(function(){
			// idx == length ? idx = 0 : idx++;
			// target.eq(idx).addClass('on').siblings().removeClass('on');
			// typedEffect();
		// },delay)
		
		$('.mainSec01 .btnGroup .btnLeft').click(function(){
			idx == 0 ? idx = length : idx--;
			target.eq(idx).addClass('on').siblings().removeClass('on');
			
			typedEffect();
			return false;
		});
		
		$('.mainSec01 .btnGroup .btnRight').click(function(){
			idx == length ? idx = 0 : idx++;
			target.eq(idx).addClass('on').siblings().removeClass('on');
			
			typedEffect();
			return false;
		});
	}
	
}

function scrollAnimation2(){
	$(window).load(function(){
		var $elements = $( '*[data-scroll]' );
		var h = $(window).height();
		$elements.each( function( i, el ) {
			var $el = $( el ),
			    $animationClass = $el.data('scroll'),
			    $delay = $el.data('delay'),
				$duration = $el.data('duration'),
				$timeOut = $el.data('time-out');
			
			$(this).addClass('scroll-' + $animationClass).addClass('scroll-animation');
			
			if($delay>0){
				$el.css({
					'-webkit-transition-delay':$delay+'ms',
					'transition-delay':$delay+'ms'
				});
			}
			
			if($duration>0){
				$el.css({
					'-webkit-transition-duration':$duration+'ms',
					'transition-duration':$duration+'ms'
				});
			}
			$el.waypoint(function(e){
				if(e == 'down'){
					$(this).addClass('scrollActive');
				}else{
					$(this).removeClass('scrollActive');
				}
			}, { offset: '75%'});
		});
	});
}


function countUp(){
	$(".countup").each(function(){
		var $el = $(this);
		var rn = $(this).text();
		$el.waypoint(function(){
			$({ val : 0 }).animate({ val : rn }, {
				duration: 1500,
				step: function() {
				  $el.text(comma(Math.floor(this.val)));
				},
				complete: function() {
				  $el.text(comma(Math.floor(this.val)));
				}
			});
		}, { offset: '100%', triggerOnce: true });
	});
	function comma(x) {
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}

function typedEffect(){
	$('.typedEffect').each(function(e){
		$(this).addClass('typed' + e);
		var target = '.typed' + e + ' .view';
		var stringE = '.typed' + e + ' .typedStrings';
		var stringsText = [];
		$(stringE).children().each(function(){
			stringsText.push($(this).html());
		}).hide();
		$('.typed' + e).waypoint(function(){
			$(target).typed({
				strings: stringsText,
				typeSpeed: 20,
			    backSpeed: 0,
			    backDelay: 50,
			    startDelay: 1000,
				loop: false,
				showCursor: false
			});
		}, { offset: '100%', triggerOnce: true });
	});
}

/* parallax scrolling motion */
function scrollAnimation(){
	$(window).load(function(){
		var $elements = $( '*[data-animation]' );
		var h = $(window).height();
		$elements.each( function( i, el ) {
			var $el = $( el ),
			    $animationClass = $el.data('animation'),
			    $delay = $el.data('delay'),
				$duration = $el.data('duration'),
				$timeOut = $el.data('time-out'),
				check = true;
			
			if($delay>0){
				if($animationClass != 'on'){
					$el.css({
						'-webkit-animation-delay':$delay+'ms',
						'animation-delay':$delay+'ms'
					});
				}else{
					$el.css({
						'-webkit-transition-delay':$delay+'ms',
						'transition-delay':$delay+'ms'
					});
				}
			}
			if($duration>0){
				if($animationClass != 'on'){
					$el.css({
						'-webkit-animation-duration':$duration+'ms',
						'animation-duration':$duration+'ms'
					});
				}else{
					$el.css({
						'-webkit-transition-duration':$duration+'ms',
						'transition-duration':$duration+'ms'
					});
				}
			}

			if($animationClass != 'on'){
				var t = $el.offset().top;
				if(t > h){
					$el.addClass('wait-animation');
				}
				$el.addClass('animated '+$animationClass);
			}

			$el.waypoint(function(e){
				if(check){
					check = false;
					$el.removeClass('wait-animation');
				}else{
					$el.toggle();
				}
			}, { offset: '100%'});
		});
	});
}


/* 레이어 팝업 */
function layerpopup(){
	$('.layerPopOpen').click(function(){
		var href = $(this).attr('href');
		layerPopOpen(href);
		return false;
	});
	
	layerPopClose();
}

function layerPopOpen(target){
	var winH = $(window).outerHeight(),popH;
	var cont = $(target).find('.layerPopCont');
	$(target).addClass('on');
	popContposition();
	$(window).resize(function(){popContposition();});
	
	function popContposition(){
		popH = cont.outerHeight();
		winH = $(window).outerHeight();
		if(popH > winH){
			cont.css({'top':'0','margin-top':0});
		}else{
			cont.css({'top':'50%','margin-top':-popH/2});
		}	
	}
	$('body').addClass('hidden');
	
	
	if($(target).find('video').length){
		var t = $(target).find('video').attr('id');
		var video = document.getElementById(t);
		video.play();
	}
}

function layerPopClose(){
	$(document).on('click','.btnPopClose',function(){
		$(this).closest('.layerPopWrap').removeClass('on');
		$('body').removeClass('hidden');
		
		if($(this).closest('.layerPopWrap').find('video').length){
			var t = $(this).closest('.layerPopWrap').find('video').attr('id');
			var video = document.getElementById(t);
			video.pause();
			video.currentTime = 0;
		}
		
		return false;
	});
}

/* 모바일 에이전트 구분 */
var isMobile = {
	Android: function () {
			 return navigator.userAgent.match(/Android/i) == null ? false : true;
	},
	BlackBerry: function () {
			 return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
	},
	IOS: function () {
			 return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
	},
	Opera: function () {
			 return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
	},
	Windows: function () {
			 return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
	},
	any: function () {
			 return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows());
	}
};

var etcUI = function(){
	$('.searchWrap .btnOption').click(function(e){
		e.preventDefault();
		$(this).closest('.searchWrap').toggleClass('on');
	});
	$('.searchWrap .opt .checkbox input').click(function(){
		$(this).closest('.searchWrap').removeClass('on');
	});
};
var htmlInclude = function(){
	var $elements = $.find('*[data-include-html]');
	if($elements.length){
		$.each($elements, function() {
			var $this =  $(this),
				$html = $this.data('include-html'),
				$htmlAry = $html.split('/'),
				$htmlLast = $htmlAry[$htmlAry.length - 1];
			
			$this.load($html,function(res,sta,xhr){
				if(sta == "success"){
					console.log('Include '+$htmlLast+'!');
					$this.children().unwrap();
					if($htmlLast == 'header.html')headerUI();
					if($htmlLast == 'footer.html')footerUI();
				}
			});  
		});
	}
};