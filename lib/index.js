const DEFAULT_ELEMENT_DELIMITER = '__';
const DEFAULT_MOD_DELIMITER = '_';

const TYPES = {
    ELEMENT: 0,
    MODIFIER: 1,
    BLOCK: 2
};

class BemFormatter {
    constructor(block, options = {}) {
        this.block = block;
        this.__ = options.ELEMENT_DELIMITER || DEFAULT_ELEMENT_DELIMITER;
        this._ = options.MOD_DELIMITER || DEFAULT_MOD_DELIMITER;
        this.stack = [];
    }

    e(element) {
        this.stack.push({
            block: this.block,
            element: element
        });

        return this;
    }

    m(modifier, value) {
        if (this.stack.length === 0) {
            this.stack.push({
                block: this.block
            });
        }
        this.stack.push({
            block: this.block,
            element: (this.stack[this.stack.length - 1] || {}).element,
            modifier: modifier,
            value: value
        });

        return this;
    }

    toString() {
        if (this.stack.length === 0) {
            return this.block;
        }
        return this.stack.map((item) => {
            return ([
                item.block,
                (item.element) ? this.__ + item.element : null,
                (item.modifier) ? this._ + item.modifier : null,
                (item.modifier && item.value) ? this._ + item.value : null
            ])
            .filter(Boolean).join('');
        }).join(' ');
    }
}

module.exports = BemFormatter;
