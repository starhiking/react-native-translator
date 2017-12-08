# Capstone Project: react-native-translator

## Project Description
Explain what your project is and what it does.

## Project Design
Explain how you designed your project  and include any additional research you have performed to help you with this project.

## Application Instructions
Explain each of the features from a user perspective and write a short set of user instructions

## Development Notes:
Discuss the most complex part of your project and highlight any difficulties you encountered and how you resolved them. Explain exactly what development you have completed.

apis usage:
```javascript
import baidu/google/youdao from './app/lib/*'

baidu/google/youdao([string]source text, [string]source language(standard tag), [string]destination language(standard tag))
    .then(result => {});
```

translate result:
```javascript
[object]result: {
    from: [string]source language(standard tag),
    to: [string]destination language(standard tag),
    src: [string]source text,
    dst: [string]destination text,
    dict: [
        0: [string]part of speech and meaning,
        1: [string]part of speech and meaning,
        ...
    ]
    sentence: [
        0: [
            0: [string]example sentence source part,
            1: [string]example sentence destination part
        ]
        1: [
            0: [string]example sentence source part,
            1: [string]example sentence destination part
        ]
        ...
    ]
}
```

## Testing
Explain your testing approach: What tests did you plan and execute, what were the use cases you considered. List the test cases you ran.

## Issues
Explain the issues / challenges that are unresolved on your project. – and your suggested approach to solving them if you had more time. This is a critical part of your report to show that you understand what is required to complete the project.

## Extra Credit
Identify what part of the project you think is worth extra credit. Justify your answer.

## Conclusion and future improvements
Reflect on your project, identifying what you thought went well and what enhancements you would like to make to the application and explain how you might code them.