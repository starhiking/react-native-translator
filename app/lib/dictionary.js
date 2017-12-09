/**
 * Author: Yan Nan
 * Description:
 *     Our application includes an Oxford English-Chinese dictionary (app/dat/oxford.json),
 *     which is downloaded as a .txt file (with lots of error) and parsed by myself.
 *
 *     These code separate words into 26 parts to accelerate search,
 *     but actually there's no significant effect, because words in dictionary are too few for a device's processor.
 *
 *     When dictionary goes larger and larger, I think I should create an AC-Automata here, haha.
 */

const oxford = require('../dat/oxford.json');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

let dictionary = { undefined: [] };

for (let i = alphabet.length; i >= 0; --i)
    dictionary[alphabet[i]] = oxford.filter(value => value[0][0] == alphabet[i]);

// return a list of words, which start with given prefix
const startwith = prefix => {
    prefix = prefix.trim().toLowerCase();
    if (prefix[0] < 'a' || prefix[0] > 'z')
        return [];
    return dictionary[prefix[0]].filter(value => value[0].startsWith(prefix));
};

module.exports = startwith;