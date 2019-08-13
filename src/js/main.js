'use strict';

function sliderInit() {
	const slider_main = document.querySelector('.js-slider-main');
	const slider_arrow = document.querySelectorAll('.js-slider-arrow');
	const slider_item = slider_main.children;
	const slider_length = slider_item.length;
	const slider_container = slider_main.parentElement;
	const slider_bullet = document.querySelectorAll('.js-slider-bullet');

	for (let i = 0;i < slider_arrow.length;i = i + 1) {
		slider_arrow[i].addEventListener('click',function(){
			slider('',this)
		}, false);
	}

	for (let i = 0;i < slider_bullet.length;i = i + 1) {
		slider_bullet[i].addEventListener('click',function(){
			sliderBullet(this.dataset.bullet);
		}, false);
	}

	let touchstartX = 0;
	let touchendX = 0;
	let touchstartY = 0;
	let touchendY = 0;

	slider_container.addEventListener('touchstart', function(e) {
	    touchstartX = e.changedTouches[0].screenX;
	    touchstartY = e.changedTouches[0].screenY;
	}, false);

	slider_container.addEventListener('touchend', function(e) {
	    touchendX = e.changedTouches[0].screenX;
	    touchendY = e.changedTouches[0].screenY;
	    handleSwipe();
	}, false); 

	slider_container.addEventListener('mousedown', function(e) {
	    touchstartX = e.screenX;
	    touchstartY = e.screenY;
	}, false);

	slider_container.addEventListener('mouseup', function(e) {
	    touchendX = e.screenX;
	    touchendY = e.screenY;
	    handleSwipe();
	}, false); 



	function handleSwipe() {
		if ((!touchendY <= touchstartY) || (!touchendY >= touchstartY) || (!touchendY === touchstartY)) {
		    if (touchendX <= touchstartX) {
		        slider('right')
		    }
		    if (touchendX >= touchstartX) {
		        slider('left')
		    }
		}
	}

	function sliderBullet(item) {
		let item_active;
		let item_width;
		let item_translate;
		let item_next = parseInt(item) - 1;
		slider_arrow[0].classList.remove('disabled');
		slider_arrow[1].classList.remove('disabled');
		for (let i = 0;i < slider_item.length;i = i + 1) {
			slider_item[i].classList.remove('active')
			slider_bullet[i].classList.remove('active')
		}
		item_width = slider_item[item_next].offsetWidth;
		item_translate = item_next * item_width;
		slider_item[item_next].classList.add('active');
		slider_bullet[item_next].classList.add('active');
		if (item_next === 0) {
			slider_arrow[0].classList.add('disabled');
		} else if (item_next === (slider_length - 1)) {
			slider_arrow[1].classList.add('disabled');
		}
		slider_main.setAttribute('style',`transform: translate(-${item_translate}px, 0px);`);
		item_active = item_width = item_translate = item_next = null;
	}

	function slider(dir, el) {
		let item_active;
		let item_width;
		let item_translate;
		let item_next;
		for (let i = 0;i < slider_item.length;i = i + 1) {
			if (slider_item[i].classList.contains('active')) {
				item_active = parseInt(slider_item[i].dataset.item) - 1;
				break
			}
		}
		if (el) {
			dir = el.dataset.direction;
		}
		item_width = slider_item[item_active].offsetWidth
		if (dir === 'left') {
			if (item_active !== 0) {			
				item_next = item_active - 1;
				slider_arrow[0].classList.remove('disabled');
				slider_arrow[1].classList.remove('disabled');
			}
		} else {
			if (item_active !== (slider_length - 1)) {			
				item_next = item_active + 1;
				slider_arrow[0].classList.remove('disabled');
				slider_arrow[1].classList.remove('disabled');
			}
		}
		if (item_next === 0) {
			slider_arrow[0].classList.add('disabled');
		} else if (item_next === (slider_length - 1)) {
			slider_arrow[1].classList.add('disabled');
		}
		if (item_next !== undefined) {
			for (let i = 0;i < slider_bullet.length;i = i + 1) {
				slider_bullet[i].classList.remove('active')
			}
			item_translate = item_next * item_width;
			slider_bullet[item_next].classList.add('active')
			slider_item[item_active].classList.remove('active');
			slider_item[item_next].classList.add('active');
			slider_main.setAttribute('style',`transform: translate(-${item_translate}px, 0px);`);
			item_active = item_width = item_translate = item_next = null;
		}
	}
}

let url = 'https://newsapi.org/v2/top-headlines?' +
          'country=ru&' +
          'apiKey=966af24d680a417283e608cf4cc07920';
let req = new Request(url);
fetch(req)
    .then(
    	function(req) {
    		return new Promise(function(res, rej){
    			res(req.json());
    		}).then(
		    	function(response) {
		    		let articles = response.articles;
		    		let slider_main_render = document.querySelector('.js-slider-main');
					let slider_bullet_render = document.querySelector('.js-slider-bullet-block');
		    		let render = ``;
		    		let render_bullet = ``;
		    		let it = 1;
		    		let active = '';
		    		for (let i = 0;i < articles.length;i = i + 1) {
		    			if (articles[i].urlToImage != null && articles[i].urlToImage != "" && articles[i].urlToImage != undefined && 
		    				articles[i].description != null && articles[i].description != "" && articles[i].description != undefined) {
		    				if (it === 1) { active = ' active' } else {active = ''}
			    			render += `
			    			<div class="col-lg-5 col-md-5 col-sm-8 col-xs-8 js-slider-item${active}" data-item="${it}">
			                  <div class="slider__item">
			                    <div class="slider__img">
			                    	<img src="${articles[i].urlToImage}">
			                    </div>
			                    <div class="slider__text">
			                      <p class="slider__text__title">
			                      	${articles[i].title}
			                      </p>
			                      <p class="slider__text__description">
			                        ${articles[i].description}
			                      </p>
			                      <a href="${articles[i].url}" target="_blank" class="slider__text__link">
			                      	Читать далее
			                      </a>
			                    </div>
			                  </div>
			                </div>`;
			                render_bullet += `
			                	<li class="js-slider-bullet slider__bullet${active}" data-bullet="${it}"></li>
			                `;
			                it = it + 1;
		    			}
		    		}
		    		slider_main_render.innerHTML = render;
					slider_bullet_render.innerHTML = render_bullet;
					articles = slider_main_render = slider_bullet_render = render = render_bullet = it = null;
					sliderInit();
		    	}
		    );
    	}
    )