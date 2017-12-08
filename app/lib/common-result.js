/**
 * Author: Yan Nan
 * Description:
 *     An independent interface returns common translation result.
 *     - example sentences: most from Baidu translation,
 *           And the most supported (by Baidu & Google) language is English. Others supported few.
 *     - pronunciation & synonyms: only Google provide them.
 */

const baidu = require('./baidu');
const google = require('./google');

module.exports = (text, from, to) => {
    return Promise.all([
        baidu(text, from, to),
        google(text, from, to)
    ]).then(results => {
        return {
            sentences: results[0]['sentences'].concat(results[1]['sentences']),
            src_pron: results[1].src_pron,
            dst_pron: results[1].dst_pron,
            synonyms: results[1].synonyms
        };
    });
};