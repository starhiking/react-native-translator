const develop_config = require('../cfg/develop_config');
if (develop_config['node-fetch'])
    var fetch = require('node-fetch');

const translate = require('./google-module/google-translate-api');

// map standard language tags into google language tags
const map = {
    auto: 'auto',
    zh: 'zh-cn',
    en: 'en',
    ja: 'ja'
};
// map google language tags into standard language tags
const map_inverse = {
    auto: 'auto',
    'zh-cn': 'zh',
    en: 'en',
    ja: 'ja'
};

const google = (text, from, to) => {
    from = map[from];
    to = map[to];
    if (from === undefined || to === undefined || from === to)
        throw new Error(`google: unsupported source/destination: from ${from} to ${to}`);

    return translate(text, { from: from, to: to, raw: true })
        .then(res => {
            const json = JSON.parse(res.raw);

            let parts = [];
            try {
                parts = json[1].map((value, index) => `${value[0]}: ${value[1].join('; ')}`);
            } catch (e) {
                // 'parts' of speech may not exist, such as sentences
                parts = [];
            }

            return {
                from: map_inverse[json[2]],
                to: map_inverse[to],
                src: json[0][0][1],
                dst: json[0][0][0],
                parts: parts,
                sentences: []
            };
        });
};

module.exports = google;