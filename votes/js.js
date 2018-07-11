const getEl = (el,all=false) => all?document.querySelectorAll(el):document.querySelector(el);

let votes = 35;

const wrapper = getEl('#wrapper');
const moreVotesHolder = getEl('.more_votes');
const lessVotesHolder = getEl('.less_votes');
const actualVotesHolder = getEl('.actual_votes');
const upArrow = getEl('.icon-up');
const downArrow = getEl('.icon-down');
const allSpans = getEl('span',true);

let votedFor = 0; //1 up 0 neutral -1 down

upArrow.addEventListener('click',upListener);
downArrow.addEventListener('click',downListener);

const cleanAndAdd = (elements,clas) => {
  elements.forEach(el=>{
      el.classList = '';
      el.classList.add(clas);
  })
}

const changeStatus = (to)=>{
   if(to==''){
     wrapper.classList = ''
   }else{
     cleanAndAdd([wrapper],to)
   }
   
}

const populate = (n,el) => {
  el.innerHTML = '';
  String(n).split('').forEach(number=>{
    let span = document.createElement('span');
    span.innerHTML = number;
    el.appendChild(span);
  })
}

populate(votes , actualVotesHolder)
populate(votes-1 , lessVotesHolder)
populate(votes+1 , moreVotesHolder)

function upListener(){
  /*check the diferences between the actual num and the coming one */
  if(votedFor==1){
    votedFor = 0;
    [...getEl('span',true)].forEach(el=>el.classList='')
    changeStatus('');
    return
  }
  changeStatus('up');
  let upNumbers = getEl('.more_votes span' , true)
  let actualNumbers = getEl('.actual_votes span', true)
  let lessVotes = getEl('.less_votes span' , true)
  /*must do something for case like 100 -> 99 */
  
  upNumbers.forEach((el,idx,arr)=>{
    let thisUpperNumber = el.innerHTML;
    
    if(thisUpperNumber != String(votes)[idx]){
      cleanAndAdd([el,actualNumbers[idx],lessVotes[idx]],'transition-more')
    }
    if(idx==arr.length-1){
      votes += (votedFor==-1)?2:1
      votedFor = 1;
    }
  })
  
}
function downListener(){
/*check the diferences between the actual num and the coming one */
  if(votedFor == -1){
    votedFor = 0;
    [...getEl('span',true)].forEach(el=>el.classList='')
    changeStatus('')
    return
  }
  
  let upNumbers = getEl('.more_votes span' , true)
  let actualNumbers = getEl('.actual_votes span', true)
  let lessNumbers = getEl('.less_votes span' , true)
  /*must do something for case like 100 -> 99 */
  changeStatus('down');
  lessNumbers.forEach((el,idx,arr)=>{
    let thisUpperNumber = el.innerHTML;
    
    if(thisUpperNumber != String(votes)[idx]){
      cleanAndAdd([el,actualNumbers[idx],upNumbers[idx]],'transition-less')
    }
    
    if(idx==arr.length-1){
      votes-=(votedFor==1)?2:1
      votedFor = -1;
    }
  })
}