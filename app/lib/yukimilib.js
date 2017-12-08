const dir = o => {
    let s = '';
    for (let k in o) {
        s += `${k}: ${typeof o[k] === 'function' ? '[function]' : o[k]}\n`;
    }
    return s;
};

// http://bbs.csdn.net/topics/390547495
function printf() {
    var as = [].slice.call(arguments), fmt = as.shift(), i = 0;
    return fmt.replace(/%(\w)?(\d)?([dfsx])/ig, function (_, a, b, c) {
        var s = b ? new Array(b - 0 + 1).join(a || '') : '';
        if (c == 'd') s += parseInt(as[i++]);
        return b ? s.slice(b * -1) : s;
    });
}

const isalpha = char => /^[-A-Za-z]$/.test(char);

module.exports = {
    'dir': dir,
    'printf': printf,
    'isalpha': isalpha
};