var BemFormatter = require('../lib');
var expect = require('expect.js');

describe('BemFormatter', function() {
    beforeEach(function() {
        this.formatter = new BemFormatter('block');
    });
    it('self => block', function() {
        expect(String(this.formatter)).to.be.equal('block');
    });
    ([
        { chain: [
            { method: 'e', args: ['e1'] }
        ], expected: 'block__e1' },
        { chain: [
            { method: 'm', args: ['m1'] }
        ], expected: 'block block_m1' },
        { chain: [
            { method: 'e', args: ['e1'] },
            { method: 'm', args: ['m1'] }
        ], expected: 'block__e1 block__e1_m1' },
        { chain: [
            { method: 'e', args: ['e1'] },
            { method: 'm', args: ['m1'] }
        ], expected: 'block__e1 block__e1_m1' },
        { chain: [
            { method: 'e', args: ['e1'] },
            { method: 'm', args: ['m1'] },
            { method: 'm', args: ['m2'] }
        ], expected: 'block__e1 block__e1_m1 block__e1_m2' },
        { chain: [
            { method: 'e', args: ['e1'] },
            { method: 'm', args: ['m1'] },
            { method: 'e', args: ['e2'] },
            { method: 'm', args: ['m2'] }
        ], expected: 'block__e1 block__e1_m1 block__e2 block__e2_m2' },
    ]).forEach((test) => {
        it(methodsChainToString(test.chain) + ' => "' + test.expected + '"', function() {
            test.chain.forEach((item) => {
                this.formatter[item.method].apply(this.formatter, item.args);
            });
            expect(String(this.formatter)).to.be.equal(test.expected);
        });
    });
});

/**
 * Returns the chain of applied methods
 * in the string form (for description).
 *
 * @example
 * [{ method: 'e', args: ['e1'] },
 *  { method: 'm', args: ['m1'] },
 *  { method: 'e', args: ['e2'] },
 *  { method: 'm', args: ['m2'] }]
 *
 *  => e('e1').m('m1').e('e2').m('m2')
 *
 * @param  {Array} chain
 * @return {String}
 */
function methodsChainToString(chain) {
    const l = chain.length - 1;

    return chain.reduce((memo, item, n) => {
        memo += item.method + '(' + item.args.join() + ')';
        if (n < l) {
            memo += '.';
        }
        return memo;
    }, '');
}
