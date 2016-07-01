const Stack = require('csjs/stack');

const DEFAULT_ELEMENT_DELIMITER = '__';
const DEFAULT_MODIFIER_DELIMITER = '_';

/**
 * Creates an object which represents BEM-class:
 * foo, foo__bar, foo__bar_bar, foo__bar_baz_cool
 */
class BEM {
    constructor(block, element, modifier, value) {
        this.block = block;
        this.element = element;
        this.modifier = modifier;
        this.value = modifier && value;
    }

    getClassName(ELEMENT_DELIMITER, MODIFIER_DELIMITER) {
        return ([
            this.block,
            this.element ? ELEMENT_DELIMITER + this.element : null,
            this.modifier ? MODIFIER_DELIMITER + this.modifier : null,
            this.value ? MODIFIER_DELIMITER + this.value : null
        ])
        .filter(Boolean)
        .join('');
    }
}

/**
 * @typedef BEMClassName~options
 * @property {String} ELEMENT_DELIMITER Custom delimiter for element (__ by default)
 * @property {String} MODIFIER_DELIMITER Custom delimiter for modifier and its optional value (_ by default)
 */

/**
 * @class BEMClassName
 */
class BEMClassName {
    /**
     * Returns a new chain for the specified block
     *
     * @param  {String} block
     * @param  {BEMClassName~options} options
     * @return {BEMClassName}
     */
    constructor(block, options = {}) {
        this.block = block;
        this.__ = options.ELEMENT_DELIMITER || DEFAULT_ELEMENT_DELIMITER;
        this._ = options.MODIFIER_DELIMITER || DEFAULT_MODIFIER_DELIMITER;
        this.commonStack = new Stack();
        this.concatStack = new Stack();
    }

    /**
     * Adds specified element to the chain.
     * The current step will be skiped if the agrument equals null.
     *
     * @param  {?String} element
     * @return {BEMClassName}
     */
    e(element) {
        if (typeof element !== 'string' && !element) {
            return this;
        }
        this.commonStack.push(new BEM(this.block, element));

        return this;
    }

    /**
     * Adds specified modifier
     * to the previous entity in the chain (block or element).
     * The current step will be skiped of the argument equals null.
     * Value of the modifier could be specified as a second agrument.
     *
     * @param  {?String} modifier
     * @param  {?String} value
     * @return {BEMClassName}
     */
    m(modifier, value) {
        if (typeof modifier !== 'string' && !modifier) {
            return this;
        }
        if (this.commonStack.length() === 0) {
            this.commonStack.push(new BEM(this.block));
        }
        this.commonStack.push(new BEM(
            this.block, (this.commonStack.peek() || {}).element,
            modifier, value
        ));

        return this;
    }

    /**
     * Adds optional string to the chain.
     * Will be skiped if the argument equals null.
     *
     * @param {?String} value
     * @return {BEMClassName}
     */
    concat(value) {
        if (typeof value !== 'string' && !value) {
            return this;
        }
        this.concatStack.push(new BEM(value));

        return this;
    }

    /**
     * Custom toString provides the proper output on cast to String
     * @return {String}
     */
    toString() {
        const result = [];

        while (this.concatStack.length()) {
            result.push(this.concatStack.pop());
        }
        if (this.commonStack.length() === 0) {
            result.push(new BEM(this.block));
        } else {
            while (this.commonStack.length()) {
                result.push(this.commonStack.pop());
            }
        }
        return result.reverse().map(bem => bem.getClassName(this.__, this._)).join(' ');
    }
}

module.exports = BEMClassName;
