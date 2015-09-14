(function(){
	var bodyEl = document.body;
	var gridItems = document.querySelectorAll('.grid-item');
	var gridContainer = document.querySelector('.grid-content');
	var transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
	var transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];
	init();
	function init(){
		[].slice.call(gridItems).forEach(function(item, pos){
			
			item.addEventListener('click', function(){
				classie.addClass(item, 'grid-loading');
				setTimeout(function(){
					classie.addClass(item, 'grid-animate');
					setTimeout(function(){
						loadContent(item);
					},500)
				},1000);
			});

		});
	}


	
	function loadContent(item){
		var placeholder = document.createElement('div');
		placeholderplaceholder.className = 'placeholder';
		placeholder.style.WebkitTransform = 'translate3d('+ item.offsetLeft +','+item.offsetTop+ ',0)' + 'scale3d(' + item.offsetWidth/ gridContainer.offsetWidth +',' + 
		  item.offsetHeight / gridContainer.offsetHeight +'1)';
		placeholder.style.transform = 'translate3d('+ item.offsetLeft +','+item.offsetTop+ ',0)' + 'scale3d(' + item.offsetWidth/ gridContainer.offsetWidth +',' + 
		  item.offsetHeight / gridContainer.offsetHeight +'1)';
		classie.addClass(placeholder, "tran-in");
		gridContainer.appendChild(placeholder);
		classie.addClass(bodyEl, "overlay");
		setTimeout(function(){
			placeholder.style.WebkitTransform = 'translate3d(0px,' + scrollY()+ 'px, 0px)';
			placeholder.style.transform = 'translate3d(0px,' + scrollY()+ 'px, 0px)';
		},25);
	}

	var onEndTransiton = function(el, callback){
		var onEndCallbackFn = function(ev){
			if(support.transitions){
				if(ev.target != this) return;
				this.removeEventListener(transEndEventName, onEndCallbackFn);
			}
			if(callback && typeof callback == 'function') {callback.call(this);}
		};
		if(support.transitions){
			el.addEventListener(transEndEventName, onEndCallbackFn);
		}else{
			onEndCallbackFn();
		}
	}	
})()