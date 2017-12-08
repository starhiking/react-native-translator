const { ui_language } = require('../cfg/config.json');
const { language_map, engine_map } = require('../cfg/develop_config');

let from = [], to = [], tran = [];

for (let k in language_map[ui_language]) {
    from[k] = language_map[ui_language][k];
    to[k] = language_map[ui_language][k];
}
delete to['auto'];

for (let k in engine_map[ui_language]) {
    tran[k] = engine_map[ui_language][k];
}

module.exports = {
    'from': from,
    'to': to,
    'tran': tran
};