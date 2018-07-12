/* inspired by https://www.pinterest.se/pin/160159330483121397/ */
const getEl = (el, all = false) => all ? document.querySelectorAll(el) : document.querySelector(el)

/* ELEMENTS */
const wrapper = getEl('#wrapper');
const links = getEl('.navigation h2', true);
const triangle = getEl('.triangle');
const form = getEl('form')

/* LISTENER FOR CLICK ON NAVIGATION */
const linkListener = (e) => {
  const el = e.target;

  if (el.classList.contains('active')) return; //if the clicked el is active return

  getEl('.navigation h2.active').classList.remove('active');
  el.classList.add('active');

  wrapper.classList = '';
  wrapper.classList.add(el.id);

  // Move the triangle
  const [elWidth, elLeft, formLeft] = [el.offsetWidth, el.offsetLeft, form.offsetLeft];
  console.log(elWidth, elLeft, formLeft)
  const newPos = elWidth / 2 + elLeft - formLeft - 10;
  triangle.style.transform = 'translateX(' + newPos + 'px)'

}

/* FOR EVERY LINK IN THE NAV LISTEN TO CLICK ON IT */
links.forEach(el => {
  el.addEventListener('click', linkListener)
})