const getEl = (el) => document.querySelector(el);
const plus = getEl('.plus');
const minus = getEl('.minus');
const countBox = getEl('#count-box');
const actualNumberHolder = getEl('.actual');
const lessNumberHolder = getEl('.less');
const moreNumberHolder = getEl('.more');
const priceHolder = getEl('.total-price p');

let nItems = Number(actualNumberHolder.innerHTML);

const oneItemPrice = 35;
const changePrice = (n) => priceHolder.innerHTML = `$${n * oneItemPrice}`;


plus.addEventListener('click',()=>{
  if(countBox.classList.contains('transitioning')) return
  countBox.classList.add('transitioning-plus')
})

minus.addEventListener('click',()=>{
  if(countBox.classList.contains('transitioning')) return
  countBox.classList.add('transitioning-minus')
})

actualNumberHolder.addEventListener('transitionend',(e)=>{ 
  nItems += (countBox.classList.value == 'transitioning-minus')?-1:1;
  
  if(nItems == 2){
    minus.classList.remove('unclickable')
  }else if(nItems == 1){
    minus.classList.add('unclickable')
  }
  
  countBox.classList = '';
  changePrice(nItems)
  actualNumberHolder.innerHTML = nItems
  lessNumberHolder.innerHTML = nItems - 1
  moreNumberHolder.innerHTML = nItems + 1
})

/* Inspired by https://dribbble.com/shots/3285887-Daily-UI-Responsive-Buy-Button */