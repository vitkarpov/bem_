const bem_ = require('../lib');
const _toString = bem_.prototype.toString;

module.exports = {
    componentWillMount() {
        this.b.e = createMethodForB('e', this);
        this.b.m = createMethodForB('m', this);
        this.b.toString = createMethodForB('toString', this);
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
function createMethodForB(method, component) {
    return function() {
        const b = new bem_(this.constructor.displayName);
        if (this.props.className) {
            b.toString = () => {
                return _toString.call(b) + ' ' + this.props.className;
            };
        }
        return b[method].apply(b, arguments);
    }.bind(component);
}
