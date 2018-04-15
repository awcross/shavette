<h1 align="center">
	<br>
	<img width="380" src="media/logo.svg" alt="shavette">
	<br>
	<br>
</h1>

# shavette [![Build Status](https://travis-ci.org/awcross/shavette.svg?branch=master)](https://travis-ci.org/awcross/shavette)

> Truncate text to a specified number of lines

Using [shave](https://github.com/dollarshaveclub/shave), this will truncate text to a maximum number of lines based on the number of `DOMRect` objects in an element.


## Install

```
$ npm install shavette --save
```


## Usage

```js
const shavette = require('shavette');

shavette('.content');
```


## API

### shavette(selector, [options])

Returns the truncated elements.

#### selector

Type: `string` `Element` `NodeList`

The elements to truncate.

#### options

These options can be passed in addition to the [options](https://github.com/dollarshaveclub/shave#syntax) for `shave`.

##### maxLines

Type: `number`<br>
Default: `2`

The maximum number of lines to truncate the text. If the number of lines is less than `maxLines` then the text will not be truncated.


## License

MIT © [Alex Cross](https://alexcross.io)
