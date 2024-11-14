/**
 * Delay for a given amount of milliseconds.
 * @param {number} ms
 * @return {Promise<void>}
 */
exports.delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 获取文件夹
 * @returns
 */
exports.getDir = () => {
  return process.cwd();
};

exports.debounce = (fn, delay = 300) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
