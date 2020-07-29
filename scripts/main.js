import { gel, crel } from './utils.js';

window.addEventListener('resize', () => {
  resize();
});

window.addEventListener('load', () => {
  resize();
});

function resize() {
  const main = gel("main");
  const grid = gel("grid-div");
  const mainHeight = main.offsetHeight - 20;
  const gridWidth = main.offsetWidth - 40;
  const sideSize = Math.min(mainHeight, gridWidth);
  // const mainWidth = main.offsetWidth;
  // const mainMaxWidth = parseInt(main.style.maxWidth);
  // const mWidth = Math.min(mainWidth, mainMaxWidth);

  grid.style.height = (sideSize).toString().concat('px');
  grid.style.width = (sideSize).toString().concat('px');

}