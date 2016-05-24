const bem_ = require('../lib');

module.exports = {
    componentWillMount() {
        this.b.e = (element) => {
            const b = new bem_(this.constructor.displayName);
            return b.e.call(b, element);
        };
        this.b.m = (modifier, value) => {
            const b = new bem_(this.constructor.displayName);
            return b.m.call(b, modifier, value);
        };
        this.b.toString = () => {
            return String(new bem_(this.constructor.displayName));
        };
    },

    b(block) {
        return new bem_(block);
    }
};
