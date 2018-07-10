let z= document.querySelector('.loader_wrapper');
let allBubles = z.querySelectorAll('li.buble')

function change(){
  allBubles.forEach((el,idx)=>{
  const actualClass= el.classList[1];
  const newClass = actualClass=='buble1'?'buble6':'buble'+(Number(actualClass.match(/[0-9]/))-1);
    window.setTimeout(()=>{
      el.classList.remove(actualClass);
      el.classList.add(newClass);      
    },150*idx)

})
}

window.setInterval(change,1500)
change()