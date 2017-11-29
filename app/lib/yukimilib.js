export const dir = (o) => {
    let s = '';
    for (let k in o) {
        s += `${k}: ${typeof o[k] === 'function' ? '[function]' : o[k]}\n`;
    }
    return s;
};