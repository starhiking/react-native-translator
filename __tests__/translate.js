const fs = require('fs');

const language = require('../app/lib/language');
const from_s = language.from;
const to_s = language.to;
const baidu = require('../app/lib/baidu');
const google = require('../app/lib/google');
const youdao = require('../app/lib/youdao');

let promises = [];
let output = '';
const separator = (engine, lang, type, query, from, to) =>
    `\n${'*'.repeat(50)}\n${engine}: ${lang} ${type} "${query}" from ${from} to ${to}\n${'*'.repeat(50)}\n`;

// baidu: Chinese WORD from ['auto', 'zh'] to ALL
// for (let from of ['auto', 'zh']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(baidu('说', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('baidu', 'Chinese', 'WORD', '说', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// google: Chinese WORD from ['auto', 'zh'] to ALL
// for (let from of ['auto', 'zh']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(google('说', from, to)
//             .then(result => {
//                 if (result.parts.length > 0)
//                     result.parts = `[Array length = ${result.parts.length}]`;
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 if (result.synonyms.length > 0)
//                     result.synonyms = `[Array length = ${result.synonyms.length}]`;
//                 output += separator('google', 'Chinese', 'WORD', '说', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// youdao: Chinese WORD from ['auto', 'zh'] to ALL
// for (let from of ['auto', 'zh']) {
//     for (let to in to_s) {
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

// baidu: English WORD from ['auto', 'en'] to ALL
// for (let from of ['auto', 'en']) {
//     for (let to in to_s) {
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

// google: English WORD from ['auto', 'en'] to ALL
// for (let from of ['auto', 'en']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(google('show', from, to)
//             .then(result => {
//                 if (result.parts.length > 0)
//                     result.parts = `[Array length = ${result.parts.length}]`;
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 if (result.synonyms.length > 0)
//                     result.synonyms = `[Array length = ${result.synonyms.length}]`;
//                 output += separator('google', 'English', 'WORD', 'show', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// youdao: English WORD from ['auto', 'en'] to ALL
// for (let from of ['auto', 'en']) {
//     for (let to in to_s) {
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

// baidu: Japanese WORD from ['auto', 'ja'] to ALL
// for (let from of ['auto', 'ja']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(baidu('ほし', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('baidu', 'Japanese', 'WORD', 'ほし', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// google: Japanese WORD from ['auto', 'ja'] to ALL
// for (let from of ['auto', 'ja']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(google('ほし', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('google', 'Japanese', 'WORD', 'ほし', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// youdao: Japanese WORD from ['auto', 'ja'] to ALL
// for (let from of ['auto', 'ja']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(youdao('ほし', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('youdao', 'Japanese', 'WORD', 'ほし', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// baidu: French WORD from ['auto', 'fr'] to ALL
// for (let from of ['auto', 'fr']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(baidu('Amour', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('baidu', 'French', 'WORD', 'Amour', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// google: French WORD from ['auto', 'fr'] to ALL
// for (let from of ['auto', 'fr']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(google('Amour', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('google', 'French', 'WORD', 'Amour', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// youdao: French WORD from ['auto', 'fr'] to ALL
// for (let from of ['auto', 'fr']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(youdao('Amour', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('youdao', 'French', 'WORD', 'Amour', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

/*
    **************************************************
                    Sentence
    **************************************************
*/

// baidu: Chinese SENTENCE from ['auto', 'zh'] to ALL
// for (let from of ['auto', 'zh']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(baidu('这是一句中文', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('baidu', 'Chinese', 'SENTENCE', '这是一句中文', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// google: Chinese SENTENCE from ['auto', 'zh'] to ALL
// for (let from of ['auto', 'zh']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(google('这是一句中文', from, to)
//             .then(result => {
//                 if (result.parts.length > 0)
//                     result.parts = `[Array length = ${result.parts.length}]`;
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 if (result.synonyms.length > 0)
//                     result.synonyms = `[Array length = ${result.synonyms.length}]`;
//                 output += separator('google', 'Chinese', 'SENTENCE', '这是一句中文', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// youdao: Chinese SENTENCE from ['auto', 'zh'] to ALL
// for (let from of ['auto', 'zh']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(youdao('这是一句中文', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('youdao', 'Chinese', 'SENTENCE', '这是一句中文', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// baidu: English SENTENCE from ['auto', 'en'] to ALL
// for (let from of ['auto', 'en']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(baidu('The quick brown fox jumps over the lazy dog', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('baidu', 'English', 'SENTENCE', 'The quick brown fox jumps over the lazy dog', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// google: English SENTENCE from ['auto', 'en'] to ALL
// for (let from of ['auto', 'en']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(google('The quick brown fox jumps over the lazy dog', from, to)
//             .then(result => {
//                 if (result.parts.length > 0)
//                     result.parts = `[Array length = ${result.parts.length}]`;
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 if (result.synonyms.length > 0)
//                     result.synonyms = `[Array length = ${result.synonyms.length}]`;
//                 output += separator('google', 'English', 'SENTENCE', 'The quick brown fox jumps over the lazy dog', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// youdao: English SENTENCE from ['auto', 'en'] to ALL
// for (let from of ['auto', 'en']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(youdao('The quick brown fox jumps over the lazy dog', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('youdao', 'English', 'SENTENCE', 'The quick brown fox jumps over the lazy dog', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// baidu: Japanese SENTENCE from ['auto', 'ja'] to ALL
// for (let from of ['auto', 'ja']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(baidu('ありがとうございます', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('baidu', 'Japanese', 'SENTENCE', 'ありがとうございます', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// google: Japanese SENTENCE from ['auto', 'ja'] to ALL
// for (let from of ['auto', 'ja']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(google('ありがとうございます', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('google', 'Japanese', 'SENTENCE', 'ありがとうございます', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// youdao: Japanese SENTENCE from ['auto', 'ja'] to ALL
// for (let from of ['auto', 'ja']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(youdao('ありがとうございます', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('youdao', 'Japanese', 'SENTENCE', 'ありがとうございます', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// baidu: French SENTENCE from ['auto', 'fr'] to ALL
// for (let from of ['auto', 'fr']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(baidu('Je t\'aime', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('baidu', 'French', 'SENTENCE', 'Je t\'aime', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

// google: French SENTENCE from ['auto', 'fr'] to ALL
for (let from of ['auto', 'fr']) {
    for (let to in to_s) {
        if (from === to) {
            continue;
        }
        promises.push(google('Je t\'aime', from, to)
            .then(result => {
                if (result.sentences.length > 0)
                    result.sentences = `[Array length = ${result.sentences.length}]`;
                output += separator('google', 'French', 'SENTENCE', 'Je t\'aime', from, to);
                output += JSON.stringify(result, null, 4);
            })
            .catch(reason => console.log(reason)));
    }
}

// youdao: French SENTENCE from ['auto', 'fr'] to ALL
// for (let from of ['auto', 'fr']) {
//     for (let to in to_s) {
//         if (from === to) {
//             continue;
//         }
//         promises.push(youdao('Je t\'aime', from, to)
//             .then(result => {
//                 if (result.sentences.length > 0)
//                     result.sentences = `[Array length = ${result.sentences.length}]`;
//                 output += separator('youdao', 'French', 'SENTENCE', 'Je t\'aime', from, to);
//                 output += JSON.stringify(result, null, 4);
//             })
//             .catch(reason => console.log(reason)));
//     }
// }

Promise.all(promises)
    .then(() => {
        fs.writeFile('./__tests__/translate_result.txt', output);
    });
