<img src="http://i.imgur.com/cAgUS7w.png" alt="logo" style='margin:0 auto;width:80px;vertical-align:top;display:block' />

# PostCSS autocorrect [![Build Status][ci-img]][ci]

Correct your everyday typos .

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/DimitrisNL/postcss-autocorrect.svg
[ci]:      https://travis-ci.org/DimitrisNL/postcss-autocorrect

```css
.foogee {
    heigth: 120px;
}
```

```css
.foogee {
    height: 120px
}
```

## Usage

```js
postcss([ require('postcss-autocorrect') ])
```

##### !! By default, the plugin only checks for certain typos. Pass your own like this :
##

```js
postcss([ require('postcss-autocorrect') ])
        ({
            providedList: [
              {position: ['postition']},
              {color: ['colour', 'colors']}
            ]
        }),
```
###### You can also set the following, in order to exclude plugin's defaults corrections.
##

```js
useDefaultList: false,
```


## Installation

```js
npm install postcss-autocorrect --save-dev
```
or
```js
yarn add postcss-autocorrect --dev
```

See [PostCSS] docs for examples for your environment.
