const md5 = require('md5');
// const fetch = require('node-fetch');

const appKey = '2d8e89a6fd072117';
const secretKey = 'HiX7rGmYRad3ISMLYexRLfpkJi2taMPh';

// map standard language tags into youdao language tags
const map = {
    auto: 'auto',
    zh: 'zh-chs',
    en: 'en',
    ja: 'ja'
};
// map youdao language tags into standard language tags
const map_inverse = {
    auto: 'auto',
    'zh-chs': 'zh',
    en: 'en',
    ja: 'ja'
};
const youdao = (text, from, to) => {
    from = map[from];
    to = map[to];
    if (from === undefined || to === undefined)
        throw new Error(`youdao: unsupported source/destination: from ${from} to ${to}`);

    // construct the request
    const salt = new Date().getTime();
    const sign = md5(appKey + text + salt + secretKey).toUpperCase();
    const url = `http://openapi.youdao.com/api?appKey=${appKey}&q=${text}&from=${from}&to=${to}&salt=${salt}&sign=${sign}`;

    return fetch(encodeURI(url))
        .then(res => res.text())
        .then(body => {
            const json = JSON.parse(body);

            let parts = [];
            try {
                parts = json['basic']['explains'];
            } catch (e) {
                // parts of speech may not exist, such as sentences
                parts = [];
            }

            return {
                from: map_inverse[json['l'].slice(0, json['l'].indexOf('2')).toLowerCase()],
                to: map_inverse[json['l'].slice(json['l'].indexOf('2') + 1).toLowerCase()],
                src: json['query'],
                dst: json['translation'][0],
                parts: parts,
                sentence: []
            };
        });
};

export default youdao;

// youdao('这是一个句子', 'zh', 'en')
//     .then(result => {
//         console.log(result);
//     });