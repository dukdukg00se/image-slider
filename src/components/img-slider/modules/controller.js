import * as view from './view';

const initSlider = () => {
  const sliderBtns = document.querySelectorAll('.slider-btn');
  const sliderWrapper = document.getElementById('slider-wrapper');
  const indicators = document.querySelectorAll('.dot');
  let slideNmbr = 1;
  let transition = 'none';

  const loopSlide = () => {
    if (slideNmbr > 5 || slideNmbr < 1) {
      transition = 'none';

      if (slideNmbr > 5) {
        slideNmbr = 1;
      } else {
        slideNmbr = 5;
      }
    }

    view.updateDisplay(slideNmbr, transition);
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
    view.updateDisplay(slideNmbr, transition);
  };

  const showSelectImg = (e) => {
    transition = 'transform .5s ease-in';
    slideNmbr = +e.target.dataset.img;

    view.updateDisplay(slideNmbr, transition);
  };

  const autoScroll = () => {
    slideNmbr += 1;
    transition = 'transform .5s ease-in';

    sliderWrapper.addEventListener('transitionend', loopSlide);
    view.updateDisplay(slideNmbr, transition);
  };

  view.highlight(slideNmbr);
  view.setFrame();
  setInterval(autoScroll, 4000);

  window.addEventListener('resize', view.setFrame);

  sliderBtns.forEach((btn) => {
    btn.addEventListener('click', scrollSlider);
  });

  indicators.forEach((dot) => {
    dot.addEventListener('click', showSelectImg);
  });
};

export default initSlider;
