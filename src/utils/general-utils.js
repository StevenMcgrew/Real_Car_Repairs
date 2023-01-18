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

export const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight });
};

export const formatAxiosError = (error) => {
    let msg = '';
    msg = error.message;
    if (error.response) {
        msg = error.response.data.warning ? error.response.data.warning : error.response.data;
    }
    return msg;
};

export const arrayMove = (arr, fromIndex, toIndex) => {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
};