export const getCurrentYear = () => {
  let date = new Date();
  return date.getFullYear();
};

export const range = (min, max, step = 1) => {
  let arr = [];
  for (let i = min; i <= max; i = i + step) {
    arr.push(i);
  }
  return arr;
};