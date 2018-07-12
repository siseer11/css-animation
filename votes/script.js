/* STILL HAVE TO WORK ON IT, THE PROBLEM IS THAT IT DOES NOT WORK FOR 
   NUMBERS LIKE 99 -> 100 , 9 -> 10, different length numbers */

const getEl = (el, all = false) => all ? document.querySelectorAll(el) : document.querySelector(el);

let votes = 35;

const wrapper = getEl('#wrapper');
const moreVotesHolder = getEl('.more-votes');
const lessVotesHolder = getEl('.less-votes');
const actualVotesHolder = getEl('.actual-votes');
const upArrow = getEl('.icon-up');
const downArrow = getEl('.icon-down');
const allSpans = getEl('span', true);

let votedFor = 0; //Keep track what the user has voted for (values: 1 / 0 / -1)

/* EVENT LISTENERS */
upArrow.addEventListener('click', upListener);
downArrow.addEventListener('click', downListener);

/* Add a new class to an array of elements, cleaning the old one */
const cleanAndAdd = (elements, clas) => {
  elements.forEach(el => {
    el.classList = '';
    el.classList.add(clas);
  })
}

/* Function called when the user change his vote */
const changeStatus = (to) => {
  if (to == '') {
    wrapper.classList = ''
  } else {
    cleanAndAdd([wrapper], to)
  }
}

/* Populate the dom with the number of votes/number of votes + 1 / number of votes - 1 */
const populate = (n, el) => {
  el.innerHTML = '';
  String(n).split('').forEach(number => {
    let span = document.createElement('span');
    span.innerHTML = number;
    el.appendChild(span);
  })
}
populate(votes, actualVotesHolder)
populate(votes - 1, lessVotesHolder)
populate(votes + 1, moreVotesHolder)


/*Function that get called when the upArrow is beig pressed*/
function upListener() {

  if (votedFor == 1) { //if the user has alredy voted for Up , restore to neutral
    votedFor = 0;
    [...getEl('span', true)].forEach(el => el.classList = '')
    changeStatus('');
    return
  }
  //Change the status of the app and animate
  changeStatus('up');
  //Get each number span from all the holders
  let upNumbers = getEl('.more-votes span', true)
  let actualNumbers = getEl('.actual-votes span', true)
  let lessVotes = getEl('.less-votes span', true)


  upNumbers.forEach((el, idx, arr) => {
    //if this peace of number / span is not equal with the one that has to be replaced with then animate , if not , do nothing
    if (el.innerHTML != String(votes)[idx]) {
      cleanAndAdd([el, actualNumbers[idx], lessVotes[idx]], 'transition-more')
    }
    //fake callback, at the end of the forEach, if the last vote was negative, upp the number by 2 if not just by 1
    if (idx == arr.length - 1) {
      votes += (votedFor == -1) ? 2 : 1
      votedFor = 1;
    }
  });
}


function downListener() {
  if (votedFor == -1) {
    votedFor = 0;
    [...getEl('span', true)].forEach(el => el.classList = '');
    changeStatus('');
    return
  }

  let upNumbers = getEl('.more-votes span', true);
  let actualNumbers = getEl('.actual-votes span', true);
  let lessNumbers = getEl('.less-votes span', true);

  changeStatus('down');
  lessNumbers.forEach((el, idx, arr) => {

    if (el.innerHTML != String(votes)[idx]) {
      cleanAndAdd([el, actualNumbers[idx], upNumbers[idx]], 'transition-less');
    }

    if (idx == arr.length - 1) {
      votes -= (votedFor == 1) ? 2 : 1;
      votedFor = -1;
    }
  });
}