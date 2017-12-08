const oxford = require('../dat/oxford.json');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

let dictionary = { undefined: [] };

for(let i = alphabet.length; i >= 0; --i)
    dictionary[alphabet[i]] = oxford.filter(value => value[0][0] == alphabet[i]);

const startwith = prefix => {
    prefix = prefix.trim().toLowerCase();
    if(prefix[0] < 'a' || prefix[0] > 'z')
        return [];
    return dictionary[prefix[0]].filter(value => value[0].startsWith(prefix));
}

module.exports = startwith;