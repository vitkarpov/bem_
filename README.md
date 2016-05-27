# BEM Classname

[![NPM version](https://badge.fury.io/js/bem_.png)](http://badge.fury.io/js/bem_)

**An easy way to build BEM-like classes with amusing chain interface.**

```js
const BEMClassName = require('bem_');

// b has e (element) and m (modifier) methods
// which are chainable.
// To return the actual classname you should cast the instance to String
const b = new BEMClassName('block');

// block__button
String(b.e('button'));

// block block_red
String(b.m('red'));

// block__button block__button_red
String(b.e('button').m('red'))

// block__button block__button_red block__aside
String(b.e('button').m('red').e('aside'))

// block__button_color_red
String(b.e('button').m('color', 'red'));
```

With custom delimiters

```js
const BEMClassName = require('bem_');
const b = new BEMClassName('block', {
    ELEMENT_DELIMITER: '-',
    MODIFIER_DELIMITER: '--'
});

// block-button block-button--red block-aside
String(b.e('button').m('red').e('aside'))
```

You can make **chains of any length** to build several classes:

```js
const BEMClassName = require('bem_');
const b = new BEMClassName('block');

// block__foo block__bar block__bar_red block__baz
b.e('foo').e('bar').m('red').e('baz')
```

## React Mixin

Mixin adds `b` to component\`s prototype. It's a link to the new instance created for the displayName of the component.

> **NOTE**: You should define displayName

```js
const bemifyClassName = require('bem_/react-mixin');

React.createClass({
    displayName: 'button',

    mixins: [bemifyClassName],

    render() {
        return (
            <div className={this.b}>
                <div className={this.b.e('content')}>
                    {this.props.text}
                </div>
            </div>
        );
    }
})
```

> **NOTE**: React casts the object to String during build the classname for actual DOM

It's convenient to add or skip some modifiers according to props:

```js
React.createClass({
    displayName: 'button',

    render() {
        return (
            <div className={this.b.m(this.props.red ? 'red' : null)}>
                <button className={this.b.e('content')} />
            </div>
        );
    }
})
```

You can use `b` as a function, if you need to constuct an arbitrary block`s name. It creates a new chain.

```js
React.createClass({
    displayName: 'button',

    render() {
        return (
            <div className={this.b.m(this.props.red ? 'red' : null)}>
                <button className={this.b.e('content')} />
                <span className={this.b('another-block')} />
            </div>
        );
    }
})
```

## Install

```sh
$ npm install bem_
```

## Similar projects

I've been finding similar projects, check out some of them:

- https://www.npmjs.com/package/b_
- https://www.npmjs.com/package/bem-classnames
- https://www.npmjs.com/package/bem-classname

I found the chain interface more brief and convenient.
