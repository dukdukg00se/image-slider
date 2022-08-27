/* eslint-disable */



const sliderBtns = document.querySelectorAll('.slider-btn');
const sliderWrapper = document.getElementById('slider-wrapper');
const frames = sliderWrapper.querySelectorAll('.slide-frame');

let size = sliderWrapper.offsetWidth;
let counter = 1;

sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';




sliderBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    if (btn.textContent === 'arrow_forward_ios') {
      if (counter > 5) return;

      counter++;
      sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
      sliderWrapper.style.transition = 'transform .5s';
    }

    if (btn.textContent === 'arrow_back_ios') {
      if (counter < 0) return;

      counter--;
      sliderWrapper.style.transition = 'transform .5s';
      sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
    }

  })
})


// The "resize" event is only on the window object, not the document object
window.addEventListener('resize', () => {

  size = sliderWrapper.offsetWidth;
  sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
  sliderWrapper.style.transition = 'none';

})


sliderWrapper.addEventListener('transitionend', () => {

  if (counter >= 6) {
    counter = 1;
    sliderWrapper.style.transition = 'none';
    sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
  }

  if (counter <= 0) {
    counter = 5;
    sliderWrapper.style.transition = 'none';
    sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
  }

});



