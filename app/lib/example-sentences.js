/**
 * Author: Yan Nan
 * Description:
 *     An independent interface returns example sentences, most from Baidu translation.
 *     The most supported (by Baidu & Google) language is English. Others supported few.
 */

const baidu = require('./baidu');
const google = require('./google');

module.exports = (text, from, to) => {
    return Promise.all([
        baidu(text, from, to).then(result => result['sentences']),
        google(text, from, to).then(result => result['sentences'])
    ]).then(results => results[0].concat(results[1]));
};