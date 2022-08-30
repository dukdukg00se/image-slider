/* eslint-disable */


const slider = document.getElementById('image-slider');
const sliderWrapper = document.getElementById('slider-wrapper');
const sliderBtns = slider.querySelectorAll('.slider-btn');
const frames = slider.querySelectorAll('.slide-frame');

// Chrome doesn't round px values
// Leads to occasional image bleeding when resizing
// Fixed by manually setting slider width to 70% vw and round to whole number
slider.style.width = Math.round(window.innerWidth * .7) + 'px';

let size = sliderWrapper.offsetWidth;
let counter = 1;

updateIndicator(counter);


sliderWrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';


sliderBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    if (btn.textContent === 'arrow_forward_ios') {
      if (counter > 5) return;

      counter++;
      sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
      sliderWrapper.style.transition = 'transform .5s ease-in';

    }

    if (btn.textContent === 'arrow_back_ios') {
      if (counter < 1) return;

      counter--;
      sliderWrapper.style.transition = 'transform .5s ease-in';
      sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';
    }

    updateIndicator(counter);

  })
})


// The "resize" event is only on the window object, not the document object
window.addEventListener('resize', () => {
  slider.style.width = Math.round(window.innerWidth * .7) + 'px';

  size = sliderWrapper.offsetWidth;
  sliderWrapper.style.transition = 'none';
  sliderWrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';
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




function updateIndicator(count) {
  let imgIndicators = document.querySelectorAll('.dot');

  hlIndicator(count);

  imgIndicators.forEach(indicator => {

    indicator.addEventListener('click', (e) => {

      counter = e.target.dataset.img;

      hlIndicator(counter);

      sliderWrapper.style.transition = 'transform .5s';
      sliderWrapper.style.transform = 'translateX('+ (-size * counter) + 'px)';

    });
    
  })
}

function hlIndicator(count) {
  let imgIndicators = document.querySelectorAll('.dot');
  imgIndicators.forEach(indicator => {
    if (indicator.dataset.img == count) {
      indicator.classList.add('displayed');
    } else if (count === 6) {
    
      imgIndicators[0].classList.add('displayed');
      imgIndicators[4].classList.remove('displayed')
    
    } else if (count === 0) {
    
      imgIndicators[4].classList.add('displayed');
      imgIndicators[0].classList.remove('displayed');
    
    
    } else {
      indicator.classList.remove('displayed');
    }
  })
}
