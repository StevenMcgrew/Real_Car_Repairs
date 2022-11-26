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

export const toTitleCase = (str) => {
  return str.toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
};