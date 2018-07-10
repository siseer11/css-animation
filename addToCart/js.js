const getEl = (el) => document.querySelector(el);

/* All the elements used */
const shopingButton = getEl('.shoping_button');
const cartSvg = getEl('svg.shoping_cart');
const cartHolder = getEl('.shopingcart_wrapper');
const buttonTxt = getEl('p.button_text');
const completedEl = getEl('.completed');

/* Flag to keep track if the mouse was pressed or not */
let mouseDown = false;

/* When mouse is pressed change flag, and move the cart */
shopingButton.addEventListener('mousedown',(e)=>{
  mouseDown = true;
  cartSvg.style.transform = 'translateX(-10px)'
})

/* If the user keep the click but leave the page, reset */
shopingButton.addEventListener('mouseleave',(e)=>{
  if(!mouseDown)return;
  cartSvg.style.transform = 'translateX(0px)';
})

/* When mouse is released, complete animation */
shopingButton.addEventListener('mouseup',(e)=>{
  if(!mouseDown) return;
  buttonTxt.style.transform = 'translateX(100%)';
  window.setTimeout(()=>{
    buttonTxt.style.display='none';
    cartHolder.style.width = '200%';
    cartSvg.style.opacity = '0';
    window.setTimeout(()=>completedEl.classList.add('done'),150)
  },200)
})

/* inspired by https://www.pinterest.se/pin/160159330483121387/ */