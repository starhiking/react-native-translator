const fs = require('fs');

const languages = require('../app/lib/languages');
const baidu = require('../app/lib/baidu');
const google = require('../app/lib/google');
const youdao = require('../app/lib/youdao');

let promises = [];
let output = '';
const separator = (engine, src, type, query, from, to) =>
    `\n${'*'.repeat(50)}\n${engine}: ${src} ${type} "${query}" from ${from} to ${to}\n${'*'.repeat(50)}\n`;

// baidu: Chinese WORD from ALL to ALL
for (let from in languages.source) {
    for (let to in languages.destination) {
        if (from === to) {
            continue;
        }
        promises.push(baidu('说', from, to)
            .then(result => {
                if (result.sentences.length > 0)
                    result.sentences = `[Array length = ${result.sentences.length}]`;
                output += separator('baidu', 'Chinese', 'WORD', '说', from, to);
                output += JSON.stringify(result, null, 4);
            })
            .catch(reason => console.log(reason)));
    }
}

// google: Chinese WORD from ALL to ALL
// for (let from in languages.source) {
//     for (let to in languages.destination) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(google('说', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('google', 'Chinese', 'WORD', '说', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// youdao: Chinese WORD from ALL to ALL
// for (let from in languages.source) {
//     for (let to in languages.destination) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(youdao('说', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('youdao', 'Chinese', 'WORD', '说', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// baidu: English WORD from ALL to ALL
// for (let from in languages.source) {
//     for (let to in languages.destination) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(baidu('show', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('baidu', 'English', 'WORD', 'show', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// google: English WORD from ALL to ALL
// for (let from in languages.source) {
//     for (let to in languages.destination) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(google('show', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('google', 'English', 'WORD', 'show', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// youdao: English WORD from ALL to ALL
// for (let from in languages.source) {
//     for (let to in languages.destination) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(youdao('show', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('youdao', 'English', 'WORD', 'show', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// baidu: Japanese WORD from ALL to ALL
// for (let from in languages.source) {
//     for (let to in languages.destination) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(baidu('ほし', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('baidu', 'Japanese', 'WORD', 'show', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// google: Japanese WORD from ALL to ALL
// for (let from in languages.source) {
//     for (let to in languages.destination) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(google('ほし', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('google', 'Japanese', 'WORD', 'show', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// youdao: Japanese WORD from ALL to ALL
// for (let from in languages.source) {
//     for (let to in languages.destination) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(youdao('ほし', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('youdao', 'Japanese', 'WORD', 'show', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// baidu: Chinese SENTENCE from ALL to ALL
// for (let from in languages.source) {
//     for (let to in languages.destination) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(baidu('这是一个句子', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('baidu', 'Chinese', 'SENTENCE', '这是一个句子', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

Promise.all(promises)
    .then(() => {
        fs.writeFile('./__tests__/translate_result.txt', output);
    });
