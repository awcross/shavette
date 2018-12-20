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

```html
<p class="content">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
	veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
	commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
	velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
	occaecat cupidatat non proident, sunt in culpa qui officia deserunt
	mollit anim id est laborum.
</p>
```

```js
const shavette = require('shavette');

shavette('.content', {
	maxLines: 3
});
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
