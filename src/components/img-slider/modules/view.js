import 'material-symbols/rounded.css';
import '../styles/styles.css';

const createSlider = (imgsObj) => {
  const sliderContainer = document.createElement('section');
  const slideWrapper = document.createElement('div');
  const dotWrapper = document.createElement('div');
  const nxtBtn = document.createElement('button');
  const prevBtn = document.createElement('button');
  sliderContainer.id = 'image-slider';
  slideWrapper.id = 'slider-wrapper';
  dotWrapper.id = 'dot-wrapper';
  nxtBtn.textContent = 'arrow_forward_ios';
  nxtBtn.type = 'button';
  nxtBtn.classList.add('material-symbols-rounded');
  nxtBtn.classList.add('slider-btn');
  prevBtn.textContent = 'arrow_back_ios';
  prevBtn.type = 'button';
  prevBtn.classList.add('material-symbols-rounded');
  prevBtn.classList.add('slider-btn');
  const createSlide = (imgInfo, imgNmbr) => {
    const slide = document.createElement('div');
    const slideImg = document.createElement('img');
    const index = document.createElement('div');
    slide.classList.add('slide-frame');
    slideImg.alt = imgInfo[0].replace(/.webp/i, '').replace(/\d+/, '-$&');
    slideImg.src = imgInfo[1];
    slideImg.classList.add('image');
    index.classList.add('slide-nmbr');
    index.textContent = `${imgNmbr} / ${Object.keys(imgsObj).length}`;
    slide.append(slideImg, index);
    return slide;
  };
  const createDot = (imgNmbr) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.img = imgNmbr;
    dotWrapper.append(dot);
    return dot;
  };
  // Create slide and dot for each img
  let counter = 1;
  Object.entries(imgsObj).forEach((entry) => {
    slideWrapper.append(createSlide(entry, counter));
    dotWrapper.append(createDot(counter));
    counter += 1;
  });
  /**
   * To loop slides -
   * duplicate first img and set as last slide
   * duplicate last img and set as first slide
   */
  slideWrapper.append(createSlide(Object.entries(imgsObj)[0], 1));
  slideWrapper.prepend(
    createSlide(
      Object.entries(imgsObj)[Object.entries(imgsObj).length - 1],
      Object.entries(imgsObj).length
    )
  );
  sliderContainer.append(slideWrapper, dotWrapper, nxtBtn, prevBtn);
  return sliderContainer;
};

// Used to highlight dot indicators
const highlight = (index) => {
  const indicators = document.querySelectorAll('.dot');
  indicators.forEach((dot) => {
    if (+dot.dataset.img === index) {
      dot.classList.add('displayed');
    } else if (index === 6) {
      indicators[0].classList.add('displayed');
      indicators[4].classList.remove('displayed');
    } else if (index === 0) {
      indicators[4].classList.add('displayed');
      indicators[0].classList.remove('displayed');
    } else {
      dot.classList.remove('displayed');
    }
  });
};

const setWidth = () => {
  const slider = document.getElementById('image-slider');

  slider.style.width = `${Math.round(window.innerWidth * 0.7)}px`;
};

const showSlide = (index, transitnProps = 'none') => {
  const sliderWrapper = document.getElementById('slider-wrapper');
  const slideWidth = sliderWrapper.offsetWidth;

  sliderWrapper.style.transition = transitnProps;
  sliderWrapper.style.transform = `translateX(${-slideWidth * index}px)`;
};

const setFrame = () => {
  const index = document.querySelector('.displayed').dataset.img;

  setWidth();
  showSlide(index);
};

const updateDisplay = (index, transitnProps) => {
  highlight(index);
  showSlide(index, transitnProps);
};

export { createSlider, highlight, setFrame, updateDisplay };
