/* eslint-disable */

// Chrome doesn't round px values
// Leads to occasional image bleeding when resizing
// Fixed by manually setting slider width to 70% vw and round to whole number
const slider = document.getElementById('image-slider');
const sliderWrapper = document.getElementById('slider-wrapper');
const frames = slider.querySelectorAll('.slide-frame');
const imgIndicators = document.querySelectorAll('.indicator');
let slideNmbr;
let slideWidth;


const hlIndicator = () => {
  imgIndicators.forEach(indicator => {
    if (indicator.dataset.img == slideNmbr) {
      indicator.classList.add('displayed');
    } else if (slideNmbr === 6) {
  
      imgIndicators[0].classList.add('displayed');
      imgIndicators[4].classList.remove('displayed')
    
    } else if (slideNmbr === 0) {
    
      imgIndicators[4].classList.add('displayed');
      imgIndicators[0].classList.remove('displayed');
    
    } else {
      indicator.classList.remove('displayed');
    }
  })
}

const activateIndicators = () => {
  imgIndicators.forEach(indicator => {
    indicator.addEventListener('click', (e) => {

      slideNmbr = e.target.dataset.img;
      hlIndicator(slideNmbr);
      shiftSlideTo(slideNmbr, 'transform .5s');

    })
  })
}


const setSliderWidth = () => {
  slider.style.width = Math.round(window.innerWidth * .7) + 'px';
  slideWidth = sliderWrapper.offsetWidth;
}

const shiftSlideTo = (nmbr, transtn) => {
  sliderWrapper.style.transition = transtn;
  sliderWrapper.style.transform = 'translateX('+ (-slideWidth * nmbr) + 'px)';
}

const sizeSlider = () => {
  setSliderWidth();
  shiftSlideTo(slideNmbr, 'none');
  window.addEventListener('resize', sizeSlider);
}

const showSlide = (e) => {

  if (e.target.textContent === 'arrow_forward_ios') {
    if (slideNmbr > 5) return;
    shiftSlideTo(++slideNmbr, 'transform .5s ease-in');
  } else if (e.target.textContent === 'arrow_back_ios') {
    if (slideNmbr < 1) return;
    shiftSlideTo(--slideNmbr, 'transform .5s ease-in');
  }
}



const activateBtns = () => {
  const sliderBtns = document.querySelectorAll('.slider-btn');
  sliderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      showSlide(e);
      hlIndicator();
    });
  });
}

const manageSlideTransition = () => {
  const resetSlider = () => {
    if (slideNmbr >= 6) {
      slideNmbr = 1;
    }
  
    if (slideNmbr <= 0) {
      slideNmbr = 5;
    }
  
    shiftSlideTo(slideNmbr, 'none');
  }

  sliderWrapper.addEventListener('transitionend', resetSlider);
}  




const initSlider = () => {
  slideNmbr = 1;


  sizeSlider( );

  hlIndicator();
  activateIndicators();
  activateBtns();
  manageSlideTransition();

  setInterval(() => {
    shiftSlideTo(++slideNmbr, 'transform .5s ease-in');
    hlIndicator();
    manageSlideTransition();


  }, 3000);
}


initSlider();





// const initSlider = () => {
//   slideNmbr = 1;
//   setSliderWidth();
//   shiftSlideTo(slideNmbr, 'none');

//   sliderBtns.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//       showSlide(e);
//       hlIndicator();
//     });
//   });

//   // The "resize" event is only on the window object, not the document object
//   window.addEventListener('resize', resizeSlider);

//   sliderWrapper.addEventListener('transitionend', resetSlider);
  
// }
// sliderBtns.forEach(btn => {
//   btn.addEventListener('click', showSlide);
// })    

// The "resize" event is only on the window object, not the document object
// window.addEventListener('resize', resizeSlider);

// sliderWrapper.addEventListener('transitionend', resetSlider);


// sliderWrapper.addEventListener('transitionend', () => {

//   if (counter >= 6) {
//     counter = 1;
//     sliderWrapper.style.transition = 'none';
//     sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
//   }

//   if (counter <= 0) {
//     counter = 5;
//     sliderWrapper.style.transition = 'none';
//     sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
//   }

// });
/** */
// updateIndicator(counter);
/** */
// window.addEventListener('resize', () => {
//   slider.style.width = Math.round(window.innerWidth * .7) + 'px';

//   size = sliderWrapper.offsetWidth;
//   sliderWrapper.style.transition = 'none';
//   sliderWrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';
// })
/** */
// sliderBtns.forEach(btn => {
//   btn.addEventListener('click', () => {

//     if (btn.textContent === 'arrow_forward_ios') {
//       if (counter > 5) return;
//       counter++;

//       sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
//       sliderWrapper.style.transition = 'transform .5s ease-in';

//     }

//     if (btn.textContent === 'arrow_back_ios') {
//       if (counter < 1) return;

//       counter--;
//       sliderWrapper.style.transition = 'transform .5s ease-in';
//       sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
//     }

//     indicatorController.hlIndicator(counter);

//   })
// })
/** */
// function updateIndicator(count) {
//   let imgIndicators = document.querySelectorAll('.dot');

//   hlIndicator(count);

//   imgIndicators.forEach(indicator => {

//     indicator.addEventListener('click', (e) => {

//       counter = e.target.dataset.img;

//       hlIndicator(counter);

//       sliderWrapper.style.transition = 'transform .5s';
//       sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';

//     });
    
//   })
// }
// function hlIndicator(count) {
//   let imgIndicators = document.querySelectorAll('.dot');
//   imgIndicators.forEach(indicator => {
//     if (indicator.dataset.img == count) {
//       indicator.classList.add('displayed');
//     } else if (count === 6) {
    
//       imgIndicators[0].classList.add('displayed');
//       imgIndicators[4].classList.remove('displayed')
    
//     } else if (count === 0) {
    
//       imgIndicators[4].classList.add('displayed');
//       imgIndicators[0].classList.remove('displayed');
    
    
//     } else {
//       indicator.classList.remove('displayed');
//     }
//   })
// }

