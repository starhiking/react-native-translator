const {
    isalpha
} = require('./yukimilib');

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
    if (from === undefined || to === undefined || from === to)
        throw new Error(`baidu: unsupported source/destination: from ${from} to ${to}`);

    // construct the request
    const url = `http://fanyi.baidu.com/v2transapi?from=${from}&to=${to}&query=${text}`;

    return fetch(encodeURI(url))
        .then(res => res.text())
        .then(body => {
            const json = JSON.parse(body);

            let sentences = [];
            try {
                sentences = JSON.parse(json['liju_result']['double']);
                // parse a complex json
                sentences = sentences.map(sentence => [
                    sentence[0].map(word => (isalpha(word[0][0]) ? ` ${word[0]}` : word[0])).join('').trim(),
                    sentence[1].map(word => (isalpha(word[0][0]) ? ` ${word[0]}` : word[0])).join('').trim(),
                ]);
            } catch (e) {
                // 'sentences' may not exist, such as when query is a sentence
                let sentences = [];
            }

            let parts = [];
            try {
                parts = json['dict_result']['simple_means']['symbols'][0]['parts'];
                if (parts[0]['part_name'] !== undefined) {
                    parts = parts[0]['means'];
                    parts = parts.map(value => `${value['part']} ${value['text']}`);
                } else {
                    parts = parts.map(value => `${value['part']} ${value['means'].join('; ')}`);
                }
            } catch (e) {
                // 'parts' of speech may not exist, such as when query is a sentence
                parts = [];
            }

            let result = {};
            try {
                result = {
                    from: map_inverse[json['trans_result']['from']],
                    to: map_inverse[json['trans_result']['to']],
                    src: json['trans_result']['data'][0]['src'],
                    dst: json['trans_result']['data'][0]['dst'],
                    parts: parts,
                    sentences: sentences
                };
            } catch (e) {
                console.log(json);
            }

            return result;
        });
};

module.exports = baidu;