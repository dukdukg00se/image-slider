import * as view from './view';

// This module initializes the slider and controls slider functions
const initSlider = (imgsObj) => {
  const sliderBtns = document.querySelectorAll('.slider-btn');
  const sliderWrapper = document.getElementById('slider-wrapper');
  const indicators = document.querySelectorAll('.dot');
  const nmbrOfImgs = Object.entries(imgsObj).length;
  let slideNmbr = 1;
  let transition;

  const sliderController = (e) => {
    transition = 'transform .5s ease-in';

    // For auto scrolling and slider btns click
    // Add transitionend listener to loop slides
    if (!e || e.target.classList.contains('slider-btn')) {
      if (!e) {
        slideNmbr += 1;
      } else if (e.target.textContent === 'arrow_forward_ios') {
        if (slideNmbr > nmbrOfImgs) return;
        slideNmbr += 1;
      } else if (e.target.textContent === 'arrow_back_ios') {
        if (slideNmbr < 1) return;
        slideNmbr -= 1;
      }

      sliderWrapper.addEventListener('transitionend', sliderController);
    } else if (e.target.classList.contains('dot')) {
      slideNmbr = +e.target.dataset.img;
    } else if (e.type === 'transitionend') {
      /**
       * Check slideNmbr at end of transition
       * Reset slideNmbr when greater/less than nmbr of imgs
       * This "loops" the slides when scrolling through
       */
      if (slideNmbr > nmbrOfImgs || slideNmbr < 1) {
        transition = 'none';
        if (slideNmbr > nmbrOfImgs) {
          slideNmbr = 1;
        } else {
          slideNmbr = nmbrOfImgs;
        }
      }
    }

    view.updateDisplay(slideNmbr, transition);
  };

  // Add "displayed" class to highlightDot indicator first
  // This class then used to show the correct slide on start
  view.highlightDot(slideNmbr);
  view.setFrame();
  setInterval(sliderController, 4000);
  window.addEventListener('resize', view.setFrame);
  sliderBtns.forEach((btn) => {
    btn.addEventListener('click', sliderController);
  });
  indicators.forEach((dot) => {
    dot.addEventListener('click', sliderController);
  });
};

export default initSlider;
