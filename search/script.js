const searchBtn = $('.search-btn');
const wrapper = $('.search-wrapper');
const input = $('input');

searchBtn.click(() => {
  wrapper.toggleClass('active');
  wrapper.hasClass('active') ? input.focus() : input.blur();
});
