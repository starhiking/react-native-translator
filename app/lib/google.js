/**
 * Author: Yan Nan
 * Description:
 *     Google translation: https://translate.google.cn
 *     (It's .cn but not .com, Chinese network can not reach google.com without a proxy)
 *     Google translation requires a encrypted token, which is hard to analyse.
 *     The request is made by the 'google-module'(see google-translate-api.js for more comment)
 *     But the return JSON is parsed by myself, since Google doesn't provide a free API.

Usage:
    google([string]source text, [string]source language(standard tag), [string]destination language(standard tag))
        .then(result => {});

    [object]result: {
        engine: '谷歌(Google)',
        from: [string]source language(standard tag),
        to: [string]destination language(standard tag),
        src: [string]source text,
        dst: [string]destination text,
        dict: [
            0: [string]part of speech and meaning,
            1: [string]part of speech and meaning,
            ...
        ],
        sentence: [
            0: [
                0: [string]example sentence source part,
                1: [string]example sentence destination part
            ],
            1: [
                0: [string]example sentence source part,
                1: [string]example sentence destination part
            ],
            ...
        ]
        src_pron: [string]source pronunciation,
        dst_pron: [string]destination pronunciation,
        synonyms: [
            0: [string]a synonyms,
            1: [string]a synonyms,
            ...
        ]
 */

const translate = require('./google-module/google-translate-api');

// map standard language tags into google language tags
const map = {
    auto: 'auto',
    zh: 'zh-CN',
    en: 'en',
    ja: 'ja',
    fr: 'fr'
};
// map google language tags into standard language tags
const map_inverse = {
    auto: 'auto',
    'zh-CN': 'zh',
    en: 'en',
    ja: 'ja',
    fr: 'fr'
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

            let sentences = [];
            try {
                sentences = json[13][0].map(sentence => [
                    sentence[0].replace(/<\/?b>/g, ''),
                    ''
                ]);
            } catch (e) {
                // 'sentences' may not exist, such as when query is a sentence
                sentences = [];
            }

            let synonyms = new Set();
            try {
                json[1].forEach(part => {
                    part[2].forEach(means => {
                        means[1].forEach(mean => {
                            synonyms.add(mean);
                        });
                    });
                });
                synonyms = [...synonyms];
            } catch (e) {
                synonyms = [];
            }

            let src_pron = '', dst_pron = '';
            try {
                src_pron = json[0][1][3];
                dst_pron = json[0][1][2];
            } catch (e) {
                src_pron = '';
                dst_pron = '';
            }

            return {
                engine: '谷歌(Google)',
                from: map_inverse[json[2]],
                to: map_inverse[to],
                src: json[0][0][1],
                dst: json[0][0][0],
                parts: parts,
                sentences: sentences,
                src_pron: src_pron,
                dst_pron: dst_pron,
                synonyms: synonyms
            };
        });
};

module.exports = google;