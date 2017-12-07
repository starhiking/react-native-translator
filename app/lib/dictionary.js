const oxford = require('../dat/oxford.json');

let dictionary = { undefined: [] };

for (let i of 'abcdefghijklmnopqrstuvwxyz')
    dictionary[i] = oxford.filter(value => value[0][0] === i);

const startwith = prefix => dictionary[prefix[0]].filter(value => value[0].startsWith(prefix));

module.exports = startwith;