/* eslint-disable */

// import img1 from './images/thumbnail1.webp';
// import img2 from './images/thumbnail2.webp';
// import img3 from './images/thumbnail3.webp';
// import img4 from './images/thumbnail4.webp';
// import img5 from './images/thumbnail5.webp';




/**
 * Return array of images from images dir
 * For more info on importAll() and require.context: https://webpack.js.org/guides/dependency-management/#require-context
 * @param {*} r 
 * @returns 
 */
function importAll(r) {
  const images = [];

  r.keys().forEach((item) => {
    images.push(r(item));
  });

  return images;
}

const imgs = importAll(
  require.context('./images', false, /\.(png|jpe?g|webp|svg)$/)
);

import 'material-symbols/rounded.css';


// function importAll(r) {
//   const images = {};

//   // console.log(r)
//   // console.log(r.keys());

//   r.keys().forEach((item) => {
//     // console.log(item)
//     // console.log(r(item));
//     images[item.replace('./', '')] = r(item);

//     console.log(item)
//   });

//   return images;
// }
// const imgs = importAll(
//   require.context('./images', false, /\.(png|jpe?g|webp|svg)$/)
// );




const displayImgSlider = () => {
  const sliderContainer = document.createElement('div');

  // Object.keys(imgs).forEach(key => {
  //   let slide = document.createElement('img');
  //   slide.src = imgs[key];
  //   slide.alt = key.replace(/.webp/i, '').replace(/\d+/, '-$&');
  //   sliderContainer.append(slide);
  // })

  // const nxtBtn = document.createElement('button');
  // const prevBtn = document.createElement ('button');

  // nxtBtn.textContent = 'face'
  // nxtBtn.type = 'button';
  // nxtBtn.classList.add('material-symbols-rounded');
  // prevBtn.textContent = '&#10095';
  // prevBtn.type = 'button';

  // sliderContainer.append(nxtBtn, prevBtn);


  // for (let key in imgs) {
  //   let slide = document.createElement('img');
  //   slide.src = imgs[key];
  //   slide.alt = key.replace(/.webp/i, '').replace(/\d+/, '-$&');
  //   sliderContainer.append(slide);
  // }

  return sliderContainer;
};

export default displayImgSlider;
