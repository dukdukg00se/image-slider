import * as view from './view';

const initSlider = (imgsObj) => {
  const sliderBtns = document.querySelectorAll('.slider-btn');
  const sliderWrapper = document.getElementById('slider-wrapper');
  const indicators = document.querySelectorAll('.dot');
  const nmbrOfImgs = Object.entries(imgsObj).length;
  let slideNmbr = 1;
  let transition;

  const sliderController = (e) => {
    transition = 'transform .5s ease-in';
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

  view.highlight(slideNmbr);
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
