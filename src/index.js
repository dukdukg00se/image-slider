import { createSlider } from './components/img-slider/modules/view';
import initSlider from './components/img-slider/modules/controller';

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
const imgs = importAll(
  // Create own context
  // Get image files from "./images" dir
  require.context(
    './components/img-slider/images',
    false,
    /\.(png|jpe?g|webp|svg)$/
  )
);

const content = document.getElementById('content');
content.append(createSlider(imgs));
initSlider(imgs);
