// const fetch = require('node-fetch');

// map standard language tags into baidu language tags
const map = {
    auto: 'auto',
    zh: 'zh',
    en: 'en',
    ja: 'jp'
};
// map baidu language tags into standard language tags
const map_inverse = {
    auto: 'auto',
    zh: 'zh',
    en: 'en',
    jp: 'ja'
};

const baidu = (text, from, to) => {
    from = map[from];
    to = map[to];
    if (from === undefined || to === undefined)
        throw new Error(`baidu: unsupported source/destination: from ${from} to ${to}`);

    // construct the request
    const url = `http://fanyi.baidu.com/v2transapi?from=${from}&to=${to}&query=${text}`;

    return fetch(encodeURI(url))
        .then(res => res.text())
        .then(body => {
            const json = JSON.parse(body);

            let parts = [];
            try {
                parts = json['dict_result']['simple_means']['symbols'][0]['parts'];
                parts = parts.map((value, index) => `${value['part']} ${value['means'].join('; ')}`);
            } catch (e) {
                // parts of speech may not exist, such as sentences
                parts = [];
            }

            return {
                from: map_inverse[json['trans_result']['from']],
                to: map_inverse[json['trans_result']['to']],
                src: json['trans_result']['data'][0]['src'],
                dst: json['trans_result']['data'][0]['dst'],
                parts: parts,
                sentence: []
            };
        });
};

export default baidu;

// baidu('this is a sentence', 'en', 'zh')
//     .then(result => {
//         console.log(result);
//     });
