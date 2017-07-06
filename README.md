[![CircleCI](https://img.shields.io/circleci/project/github/doxiaodong/string-add.svg?style=flat-square)](https://circleci.com/gh/doxiaodong/string-add)
[![Coverage](https://img.shields.io/codecov/c/github/doxiaodong/string-add/master.svg?style=flat-square)](https://codecov.io/github/doxiaodong/string-add?branch=master)
[![Version](https://img.shields.io/npm/v/string-add.svg?style=flat-square)](https://www.npmjs.com/package/string-add)
[![License](https://img.shields.io/npm/l/string-add.svg?style=flat-square)]()

# string-add

Add int and floats for crossing Infinity in Javascript

## Usage

```
import add from 'string-add'

add() // '0'
add('1') // '1'
add('1.3', '1.2') // '2.5'
add('1', '2', '3', '4') // '10'
add('-312', '121') // '-191'
add('9007199254740992.9007199254740992', '1') // '9007199254740993.9007199254740992'

add(1) // Error
add('1', '1.2.2') // Error
```

## Api

```
* function add(...args: string[]): string
```
