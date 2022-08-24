import displayImgSlider from './components/img-slider/slider';


(() => {
  const content = document.getElementById('content');
  content.append(displayImgSlider());
})();