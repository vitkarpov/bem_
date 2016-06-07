const bem_ = require('../lib');

module.exports = {
    componentWillMount() {
        this.b.e = createMethodForBlock('e', this);
        this.b.m = createMethodForBlock('m', this);
        this.b.toString = createMethodForBlock('toString', this);
    },

    b(block) {
        return new bem_(block);
    }
};

/**
 * Returns a function for specified method for this.b
 * @param  {String} method
 * @param  {Object} component
 * @return {Function}
 */
function createMethodForBlock(method, component) {
    return function() {
        const block = new bem_(this.constructor.displayName);
        if (this.props.className && method !== 'e') {
            block.concat(this.props.className);
        }
        return block[method].apply(block, arguments);
    }.bind(component);
}
