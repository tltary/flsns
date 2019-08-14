# flsns - Simple Native Slider

### JavaScript source in /flsns.js

[Demo](https://tltary.github.io/flsns/index.html)

```js
'use strict';
const slider_main = document.querySelector('.js-slider-main');
const slider_arrow = document.querySelectorAll('.js-slider-arrow');
const slider_item = slider_main.children;
const slider_length = slider_item.length;
const slider_container = slider_main.parentElement;
const slider_bullet = document.querySelectorAll('.js-slider-bullet');
for (let i = 0; i < slider_arrow.length; i = i + 1) {
    slider_arrow[i].addEventListener('click', function() {
        slider('', this)
    }, false);
}
for (let i = 0; i < slider_bullet.length; i = i + 1) {
    slider_bullet[i].addEventListener('click', function() {
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
let handleSwipe = () => {
    let calc = touchstartX - touchendX;
    if ((calc) >= 100) {
        slider('right')
    };
    if ((calc) <= -100) {
        slider('left')
    };
}
let sliderBullet = (item) => {
    let item_active;
    let item_width;
    let item_translate;
    let item_next = parseInt(item) - 1;
    slider_arrow[0].classList.remove('disabled');
    slider_arrow[1].classList.remove('disabled');
    for (let i = 0; i < slider_item.length; i = i + 1) {
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
    slider_main.setAttribute('style', `transform: translate(-${item_translate}px, 0px);`);
    item_active = item_width = item_translate = item_next = null;
}
let slider = (dir, el) => {
    let item_active;
    let item_width;
    let item_translate;
    let item_next;
    for (let i = 0; i < slider_item.length; i = i + 1) {
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
        for (let i = 0; i < slider_bullet.length; i = i + 1) {
            slider_bullet[i].classList.remove('active')
        }
        item_translate = item_next * item_width;
        slider_bullet[item_next].classList.add('active')
        slider_item[item_active].classList.remove('active');
        slider_item[item_next].classList.add('active');
        slider_main.setAttribute('style', `transform: translate(-${item_translate}px, 0px);`);
    }
}
```

```scss
body {
    background: {
        color: #fff;
    }
}

.title {
    font-size: 24px;
    margin-bottom: 15px;
    margin-top: 10px;
}

.annotation {
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: bold;
}

.link {
    color: #4a76a8;
    &__github {
        float: right;
        font-size: 16px;
        vertical-align: bottom;
    }
}

.code {
    margin-top: 30px;
    &__pre {
        border: none !important;
        padding: 15px;
    }
}

.slider {
    width: 100%;
    overflow: hidden;
    &__arrow {
        padding: 25px;
        font-size: 0px;
        margin: 0px 15px;
        transition: opacity .3s ease-in-out;
        position: relative;
        display: inline-block;
        cursor: pointer;
        &.disabled {
            opacity: 0.5;
            cursor: no-drop;
        }
        &__block {
            text-align: center;
        }
        &--left {
            &:before {
                content: '';
                position: absolute;
                width: 15px;
                height: 2px;
                background-color: #000;
                transform: rotate(-45deg);
                top: calc(50% - (12px / 2));
            }
            &:after {
                content: '';
                position: absolute;
                width: 15px;
                height: 2px;
                background-color: #000;
                transform: rotate(45deg);
                bottom: calc(50% - (12px / 2));
            }
        }
        &--right {
            &:before {
                content: '';
                position: absolute;
                width: 15px;
                height: 2px;
                background-color: #000;
                transform: rotate(45deg);
                top: calc(50% - (12px / 2));
            }
            &:after {
                content: '';
                position: absolute;
                width: 15px;
                height: 2px;
                background-color: #000;
                transform: rotate(-45deg);
                bottom: calc(50% - (12px / 2));
            }
        }
    }
    &__bullet {
        padding: 5px;
        font-size: 0px;
        margin: 0px 5px;
        background-color: #3e3e3e;
        transition: background-color .3s ease-in-out;
        display: inline-block;
        border-radius: 50%;
        cursor: pointer;
        &.active {
            background-color: #e3e3e3;
            cursor: default;
        }
        &__block {
            text-align: center;
        }
        &__content {

        }

    }
    &__container {
        width: 100%;
    }
    &__content {
        display: flex;
        transition: transform .3s ease-in-out;
    }
    &__item {
        border: 2px #3e3e3e solid;
        border-radius: 5px;
    }
    &__img {
        img {
            width: 100%;
        }
    }
    &__text {
        padding: 10px;
        &__description {
            font-size: 14px;
            margin-bottom: 10px;

        }
        &__title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        &__link {
            font-size: 16px;
            color: #4a76a8;
        }
    }

}
```
