window.addEventListener('DOMContentLoaded', () => {
    //header navigation
    const nav = document.querySelectorAll('.navigation__list-link'),
          navParent = document.querySelector('.navigation__list');
        
    function hideNavActive() {

        nav.forEach(item => {
            item.classList.remove('navigation__list-link_active');
        });
    }

    function showNavActive(i = 0) {
        nav[i].classList.add('navigation__list-link_active');
    }

    hideNavActive();
    showNavActive();

    navParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('navigation__list-link')) {
            nav.forEach((item, i) => {
                if (target === item) {
                    hideNavActive();
                    showNavActive(i);
                }
            });
        }
    });

    //slider
    const slides = document.querySelectorAll('.product__list'),
          slider = document.querySelector('.product__wrapper'),
          prev = document.querySelector('.product__slider-direction_left'),
          next = document.querySelector('.product__slider-direction_right'),
          slidesWrapper = document.querySelector('.product__list-wrapper'),
          slidesField = document.querySelector('.product__list-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + "%";

    slides.forEach(slide => {
        slide.style.width = width;
    });

    const indicators = document.createElement('ol'),
          dots = [];
    
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        margin: 0 auto;
        margin-top: 60px;
        display: flex;
        width: 115px;
        height: 25px;
        justify-content: space-between;
        align-items: center;
        list-style-type: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            width: 15px;
            height: 15px;
            border-radius: 100%;
            background: #D9D9D9;
            border-style: none;
            cursor: pointer;
            margin: 5px;
        `;
        if (i === 0) {
            dot.style.cssText = `
            width: 25px;
            height: 25px;
            border-radius: 100%;
            background: #5699CD;
            transition: all 0.6s;
            margin: 0;
        `;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        dots.forEach(dot => dot.style.cssText = `
            width: 15px;
            height: 15px;
            border-radius: 100%;
            // background: #D9D9D9;
            border-style: none;
            cursor: pointer;
            margin: 5px;
        `);
        dots[slideIndex - 1].style.cssText = `
            width: 25px;
            height: 25px;
            background: #5699CD;
            transition: all 0.5s;
            margin: 0;
        `;
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        dots.forEach(dot => dot.style.cssText = `
            width: 15px;
            height: 15px;
            border-radius: 100%;
            // background: #D9D9D9;
            border-style: none;
            cursor: pointer;
            margin: 5px;
        `);
        dots[slideIndex - 1].style.cssText = `
            width: 25px;
            height: 25px;
            background: #5699CD;
            transition: all 0.5s;
            margin: 0;
        `;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.cssText = `
                width: 15px;
                height: 15px;
                border-radius: 100%;
                // background: #D9D9D9;
                border-style: none;
                cursor: pointer;
                margin: 5px;
            `);
            dots[slideIndex - 1].style.cssText = `
                width: 25px;
                height: 25px;
                background: #5699CD;
                transition: all 0.5s;
                margin: 0;
            `;
        });
    })
});