# jBit

<a href="https://travis-ci.org/vfreitas-/jBit">
    <img src="https://travis-ci.org/vfreitas-/jBit.svg?branch=master" alt="travis">
</a>
<a href="https://codecov.io/gh/vfreitas-/jBit">
  <img src="https://codecov.io/gh/vfreitas-/jBit/branch/master/graph/badge.svg" alt="Codecov" />
</a>

<a href="https://www.npmjs.org/package/jbit">
  <img src="https://img.shields.io/npm/v/jbit.svg?style=flat" alt="npm">
</a>

<a href="https://david-dm.org/vfreitas-/jbit">
  <img src="https://david-dm.org/vfreitas-/jbit/status.svg" alt="dependencies Status">
</a>

A simple jQuery like DOM Traverse lightweight (less than 5kb gzipped) library written in ES6(Buble).

Under development

## Table of Contents

-   [Install](#install)
-   [Usage](#usage)
-   [Examples & Demos](#examples--demos)
-   [API](#api)
-   [Contribute](#contribute)
-   [Whishlist](#whishlist)
-   [Browser Support](#browser-support)

## Install

You can get it on npm

```sh
$ npm install --save jbit
```

Then import it with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/)

```javascript
// using ES6 modules
import $ from 'jbit'

// using CommonJS modules
var $ = require('jbit')
```

There is also an [UMD](https://github.com/umdjs/umd) build available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/jbit"></script>
```

You can find the library on `window.$`.

## Usage

```js
$('ul').find('li')
  .filter('.active')
  .has('#some-id')
  .children()
```

## Examples & Demos

Soon :)

## API

### jBit

jBit class

#### constructor

Create a jBit instance

**Parameters**

-   `selector` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) \| [jBit](#jbit))** 
-   `context` **([Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) \| [jBit](#jbit))?= ay(selec** 

Returns **[jBit](#jbit)** a new instance

#### map

**Parameters**

-   `cb` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** map callback

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** resulted by the map function

#### each

**Parameters**

-   `cb` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** forEach callback

#### slice

**Parameters**

-   `iterable` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList))** list

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

#### is

Test if each element in the current set of elements
match the given selector
Can receive an element to compare, ignoring the current
set of elements

**Parameters**

-   `selector` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** string containing a selector expression
-   `elem` **[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)?= {jBi** to test the selector against

Returns **[jBit](#jbit)** instance

#### add

Add new elements to the instance

**Parameters**

-   `selector` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** string containing a selector expression
-   `elem` **[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)** to test the selector against
-   `context`  

Returns **[jBit](#jbit)** instance

#### addBack

Add the previous set of elements, to the current one
optionally filtered by a selector

**Parameters**

-   `selector` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** string containing a selector expression

Returns **[jBit](#jbit)** instance

#### end

Returns **[jBit](#jbit)** the previous set of metched elements

#### get

Get an array containing the current set
of elements

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** array containing the current set of elements

#### index

Return the position of the first element relative
to its siblings elements

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** zero based position

#### at

Reduce the set of matched elements
to the one at the specified index

**Parameters**

-   `index` **Integer** 

Returns **[jBit](#jbit)** instance

#### first

Returns **[jBit](#jbit)** instance containing the first element

#### last

Returns **[jBit](#jbit)** instance containing the last element

#### not

Filter the set of matched elements excluding 
the ones that match the filter

**Parameters**

-   `filter` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** containing a selector expression

Returns **[jBit](#jbit)** instance

#### has

Filter the set of matched elements to those that have
a descendant that matches the selector or Element

**Parameters**

-   `selector` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element))** containing a selector expression

Returns **[jBit](#jbit)** instance

#### filter

Filter the set of matched elements

**Parameters**

-   `selector` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** containing a selector expression

Returns **[jBit](#jbit)** instance

#### siblings

Get all sibling elements of each element in
the current set of elements

Returns **[jBit](#jbit)** instance

#### prev

Find the previous element sibling of each element in
the current set of elements

Returns **[jBit](#jbit)** instance

#### next

Find the next element sibling of each element in
the current set of elements

Returns **[jBit](#jbit)** instance

#### prevAll

Get all preceding sibling elements of each element in
the current set of elements
Can receive a selector to filter the matched siblings

**Parameters**

-   `filter` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** containing a selector expression

Returns **[jBit](#jbit)** instance

#### nextAll

Get all following sibling elements of each element in
the current set of elements
Can receive a selector to filter the matched siblings

**Parameters**

-   `filter` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** containing a selector expression

Returns **[jBit](#jbit)** instance

#### children

Get all children elements of each element in
the current set of elements
Can receive a selector to filter the matched children

**Parameters**

-   `filter` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** containing a selector expression

Returns **[jBit](#jbit)** instance

#### find

Find descendants of each element in the
 current set of elements

**Parameters**

-   `filter` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** containing a selector expression

Returns **[jBit](#jbit)** instance

#### parent

Get the parent elements of each element in
the current set of elements

Returns **[jBit](#jbit)** instance

#### parents

**Parameters**

-   `filter` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** containing a selector expression

Returns **[jBit](#jbit)** instance

#### closest

Returns the closest ancestor of the current element (or the current element itself) 
which matches the selector for each of the elements in the current
set of elements

**Parameters**

-   `selector` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[jBit](#jbit)** instance

## Contribute

All contributions are welcome.

- Fork the repo on GitHub
- Clone the project to your own machine
- Install the tools necessary for development: `npm install`
- Make your changes and test it: `npm test` 
- Commit it to your own branch
- Push your work back up to your fork
- Submit a pull request with full remarks documenting your changes

## Whishlist

-   break test in one file per mixin
-   add flow type checking
-   add typescript definition
-   improve support for SSR environments

## Browser Support

> not fully tested yet, based on [caniuse](http://caniuse.com/) and [MDN](https://developer.mozilla.org/en-US/)

IE 10+
<br/>
Modern browsers
