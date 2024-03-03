// 防抖函数
/*
  防抖：n秒后执行的事件，在n秒内重复触发，则重新计时
*/
export function debounce(fn, delay) {
  let timer = null;

  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}
