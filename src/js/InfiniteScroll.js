import throttle from 'lodash.throttle';

// Своя реализация
export default class InfiniteScroll {
  constructor(callback, height, throttleDelay) {
    this.callback = callback;
    this.height = height;
    this.throttleCallBack = throttle(
      this.checkScroll.bind(this),
      throttleDelay
    );
  }

  checkScroll() {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight > scrollHeight - this.height) this.callback();
  }

  stop() {
    window.removeEventListener('scroll', this.throttleCallBack);
  }

  start() {
    window.addEventListener('scroll', this.throttleCallBack);
  }
}
