const getEl = (el) => document.querySelector(el);

/* All the elements used */
const shopingButton = getEl('.shoping-button');
const cartSvg = getEl('svg.shoping-cart');
const cartHolder = getEl('.shopingcart-wrapper');
const buttonTxt = getEl('p.button-text');
const completedEl = getEl('.completed');

/* Flag to keep track if the mouse was pressed or not */
let mouseDown = false;

/*Prefixes for css*/
function setVendor(element, prop, value) {
  element.style[`webkit${prop}`] = value;
  element.style[`moz${prop}`] = value;
  element.style[`ms${prop}`] = value;
  element.style[`o${prop}`] = value;
}

/* When mouse is pressed change flag, and move the cart */
shopingButton.addEventListener('mousedown', (e) => {
  mouseDown = true;
  cartSvg.style.transform = 'translateX(-10px)'
})

/* If the user keep the click but leave the page, reset */
shopingButton.addEventListener('mouseleave', (e) => {
  if (!mouseDown) return;
  cartSvg.style.transform = 'translateX(0px)';
})

/* When mouse is released, complete animation */
shopingButton.addEventListener('mouseup', (e) => {
  if (!mouseDown) return;
  setVendor(buttonTxt, 'Transform', 'translateX(100%)')
  window.setTimeout(() => {
    buttonTxt.style.display = 'none';
    cartHolder.style.width = '200%';
    cartSvg.style.opacity = '0';
    window.setTimeout(() => completedEl.classList.add('done'), 150)
  }, 200)
})

/* inspired by https://www.pinterest.se/pin/160159330483121387/ */