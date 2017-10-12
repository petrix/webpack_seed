export const debounce =  (fn: (...args: any[]) => void, delay: number) => {
  let timer: number;
  return function () {
    const args = arguments;
    clearTimeout(timer);
    timer = window.setTimeout(function () {
      console.log(args);
      fn.apply(fn, args)
    }, delay);
  };
};