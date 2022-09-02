// view module
const displayController = (() => {
  const highlight = (nmbr, list) => {
    list.forEach((item) => {
      if (+item.dataset.img === nmbr) {
        item.classList.add('displayed');
      } else if (nmbr === 6) {
        list[0].classList.add('displayed');
        list[4].classList.remove('displayed');
      } else if (nmbr === 0) {
        list[4].classList.add('displayed');
        list[0].classList.remove('displayed');
      } else {
        item.classList.remove('displayed');
      }
    });
  };

  const setWidth = () => {
    const slider = document.getElementById('image-slider');

    slider.style.width = `${Math.round(window.innerWidth * 0.7)}px`;
  };

  const shiftSlideTo = (nmbr, transitnProps) => {
    const sliderWrapper = document.getElementById('slider-wrapper');
    const slideWidth = sliderWrapper.offsetWidth;

    sliderWrapper.style.transition = transitnProps;
    sliderWrapper.style.transform = `translateX(${-slideWidth * nmbr}px)`;
  };

  const setSliderSize = (nmbr, transitnProps) => {
    setWidth();
    shiftSlideTo(nmbr, transitnProps);
  };

  const updateDisplay = (nmbr, transitnProps, list) => {
    shiftSlideTo(nmbr, transitnProps);
    highlight(nmbr, list);
  };

  return {
    highlight,
    setSliderSize,
    updateDisplay,
  };
})();

// controller module
const sliderController = (() => {
  const sliderWrapper = document.getElementById('slider-wrapper');
  const imgIndicators = document.querySelectorAll('.indicator');
  const sliderBtns = document.querySelectorAll('.slider-btn');
  let slideNmbr;
  let transition;

  const loopSlide = () => {
    if (slideNmbr > 5 || slideNmbr < 1) {
      transition = 'none';

      if (slideNmbr > 5) {
        slideNmbr = 1;
      } else {
        slideNmbr = 5;
      }
    }

    displayController.updateDisplay(slideNmbr, transition, imgIndicators);
  };

  const scrollSlider = (e) => {
    transition = 'transform .5s ease-in';

    if (e.target.textContent === 'arrow_forward_ios') {
      if (slideNmbr > 5) return;
      slideNmbr += 1;
    } else if (e.target.textContent === 'arrow_back_ios') {
      if (slideNmbr < 1) return;
      slideNmbr -= 1;
    }

    sliderWrapper.addEventListener('transitionend', loopSlide);

    displayController.updateDisplay(slideNmbr, transition, imgIndicators);
  };

  const showSelectImg = (e) => {
    transition = 'transform .5s ease-in';
    slideNmbr = +e.target.dataset.img;

    displayController.updateDisplay(slideNmbr, transition, imgIndicators);
  };

  const initSlider = () => {
    slideNmbr = 1;
    transition = 'none';

    displayController.setSliderSize(slideNmbr);
    displayController.highlight(slideNmbr, imgIndicators);

    window.addEventListener('resize', displayController.setSliderSize);

    sliderBtns.forEach((btn) => {
      btn.addEventListener('click', scrollSlider);
    });

    imgIndicators.forEach((dot) => {
      dot.addEventListener('click', showSelectImg);
    });

    setInterval(() => {
      slideNmbr += 1;
      transition = 'transform .5s ease-in';

      sliderWrapper.addEventListener('transitionend', loopSlide);

      displayController.updateDisplay(slideNmbr, transition, imgIndicators);
    }, 4000);
  };

  return { initSlider };
})();

sliderController.initSlider();
