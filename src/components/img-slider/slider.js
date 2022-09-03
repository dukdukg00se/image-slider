import 'material-symbols/rounded.css';
import './styles/styles.css';

/**
 * Use to import slider images
 * More on importAll(), require.context: https://webpack.js.org/guides/dependency-management/#require-context
 * @param {*} r - request
 * @returns - images obj w/ keys edited to remove "./" */
function importAll(r) {
  const images = {};

  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });

  return images;
}
const imgsObj = importAll(
  // Create own context
  // Get image files from "./images" dir
  require.context('./images', false, /\.(png|jpe?g|webp|svg)$/)
);

// Add imgsObj parameter later
const createSlider = () => {
  const sliderContainer = document.createElement('section');
  const slideWrapper = document.createElement('div');
  const dotWrapper = document.createElement('div');
  const nxtBtn = document.createElement('button');
  const prevBtn = document.createElement('button');

  sliderContainer.id = 'image-slider';
  slideWrapper.id = 'slide-wrapper';
  dotWrapper.id = 'dot-wrapper';
  nxtBtn.textContent = 'arrow_forward_ios';
  nxtBtn.type = 'button';
  nxtBtn.classList.add('material-symbols-rounded');
  nxtBtn.classList.add('slider-btn');
  prevBtn.textContent = 'arrow_back_ios';
  prevBtn.type = 'button';
  prevBtn.classList.add('material-symbols-rounded');
  prevBtn.classList.add('slider-btn');

  const createSlideFrame = (imgInfo, imgNmbr) => {
    const slideFrame = document.createElement('div');
    const slideImg = document.createElement('img');
    const slideNmbr = document.createElement('div');

    slideFrame.classList.add('slide-frame');
    slideImg.alt = imgInfo[0].replace(/.webp/i, '').replace(/\d+/, '-$&');
    slideImg.src = imgInfo[1];
    slideImg.classList.add('image');
    slideNmbr.classList.add('slide-nmbr');
    slideNmbr.textContent = `${imgNmbr} / ${Object.keys(imgsObj).length}`;
    slideFrame.append(slideImg, slideNmbr);

    return slideFrame;
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
    slideWrapper.append(createSlideFrame(entry, counter));
    dotWrapper.append(createDot(counter));

    counter++;
  });

  // To loop slides -
  // duplicate first img and set as last slide
  // duplicate last img and set as first slide
  slideWrapper.append(createSlideFrame(Object.entries(imgsObj)[0], 1));
  slideWrapper.prepend(
    createSlideFrame(
      Object.entries(imgsObj)[Object.entries(imgsObj).length - 1],
      Object.entries(imgsObj).length
    )
  );

  sliderContainer.append(slideWrapper, dotWrapper, nxtBtn, prevBtn);
  return sliderContainer;
};

// const createSlider = () => {
//   const sliderContainer = document.createElement('section');
//   const slideWrapper = document.createElement('div');
//   const dotWrapper = document.createElement('div');
//   const nxtBtn = document.createElement('button');
//   const prevBtn = document.createElement('button');

//   let counter = 1;
//   Object.keys(imgsObj).forEach((key) => {
//     const slideFrame = document.createElement('div');
//     const slideImg = document.createElement('img');
//     const slideNmbr = document.createElement('div');
//     slideFrame.classList.add('slide-frame');
//     slideImg.src = imgsObj[key];
//     slideImg.alt = key.replace(/.webp/i, '').replace(/\d+/, '-$&');
//     slideImg.classList.add('image');
//     slideNmbr.classList.add('slide-nmbr');
//     slideNmbr.textContent = `${counter} / 5`;
//     slideFrame.append(slideImg, slideNmbr);
//     slideWrapper.append(slideFrame);

//     const dot = document.createElement('span');
//     dot.classList.add('dot');
//     dot.dataset.img = counter;
//     dotWrapper.append(dot);

//     counter += 1;
//   });

//   sliderContainer.id = 'image-slider';
//   slideWrapper.id = 'slide-wrapper';
//   dotWrapper.id = 'dot-wrapper';
//   nxtBtn.textContent = 'arrow_forward_ios';
//   nxtBtn.type = 'button';
//   nxtBtn.classList.add('material-symbols-rounded');
//   nxtBtn.classList.add('slider-btn');
//   prevBtn.textContent = 'arrow_back_ios';
//   prevBtn.type = 'button';
//   prevBtn.classList.add('material-symbols-rounded');
//   prevBtn.classList.add('slider-btn');
//   sliderContainer.append(slideWrapper, dotWrapper, nxtBtn, prevBtn);

//   return sliderContainer;
// };

export default createSlider;
