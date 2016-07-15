const DEFAULT_ELEMENT_DELIMITER = '__';
const DEFAULT_MODIFIER_DELIMITER = '_';

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
        this.stack = [];
        this.concatStack = [];
    }

    /**
     * Adds specified element to the chain.
     * The current step will be skiped if the agrument equals null.
     *
     * @param  {String} element
     * @return {BEMClassName}
     */
    e(element) {
        this.stack.push({
            block: this.block,
            element: String(element)
        });

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
        if (typeof modifier !== 'string' || !modifier) {
            return this;
        }
        if (this.stack.length === 0) {
            this.stack.push({
                block: this.block
            });
        }
        this.stack.push({
            block: this.block,
            element: (this.stack[this.stack.length - 1] || {}).element,
            modifier: String(modifier),
            value: value
        });

        return this;
    }

    /**
     * Adds optional string to the chain.
     * Will be skiped if the argument equals null.
     *
     * @param {String} value
     * @return {BEMClassName}
     */
    concat(value) {
        this.concatStack.push(String(value));
        return this;
    }

    /**
     * Custom toString provides the proper output on cast to String
     * @return {String}
     */
    toString() {
        if (this.stack.length === 0) {
            return [this.block]
                .concat(this.concatStack.filter(Boolean))
                .join(' ');
        }
        return this.stack.map((item) => {
            return ([
                item.block,
                (item.element) ? this.__ + item.element : null,
                (item.modifier) ? this._ + item.modifier : null,
                (item.modifier && item.value) ? this._ + item.value : null
            ])
            .filter(Boolean).join('');
        })
        .concat(this.concatStack.filter(Boolean))
        .join(' ');
    }
}

module.exports = BEMClassName;
