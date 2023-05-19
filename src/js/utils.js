export function appendMarkup(markup, el) {
  el.insertAdjacentHTML('beforeend', markup);
}
export function clearMarkup(el) {
  el.innerHTML = '';
}
