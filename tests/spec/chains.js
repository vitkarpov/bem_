const BEMClassName = require('../../lib');
const expect = require('expect.js');

describe('Chains -> ', function() {
    beforeEach(function() {
        this.b = new BEMClassName('block');
    });
    it('self => block', function() {
        expect(String(this.b)).to.be.equal('block');
    });
    /**
     * We should test chains of methods,
     * for instance:
     * - b.e('e1').e('e2').m('m1')
     * - b.e('e1').m('m1').e('e2').m('m2')
     * @type {Array}
     */
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
        { chain: [
            { method: 'e', args: ['e1'] },
            { method: 'm', args: [null] }
        ], expected: 'block__e1' },
        { chain: [
            { method: 'e', args: [null] },
            { method: 'e', args: ['e2'] }
        ], expected: 'block__e2' },
        { chain: [
            { method: 'e', args: ['e1'] },
            { method: 'm', args: ['m1', 'v1'] }
        ], expected: 'block__e1 block__e1_m1_v1' },
        { chain: [
            { method: 'concat', args: ['rock'] }
        ], expected: 'block rock' },
        { chain: [
            { method: 'm', args: ['m1'] },
            { method: 'concat', args: ['rock'] }
        ], expected: 'block block_m1 rock' },
        { chain: [
            { method: 'concat', args: ['rock'] },
            { method: 'm', args: ['m1'] }
        ], expected: 'block block_m1 rock' },
        { chain: [
            { method: 'concat', args: ['rock'] },
            { method: 'e', args: ['e1'] }
        ], expected: 'block__e1 rock' },
        { chain: [
            { method: 'concat', args: ['rock'] },
            { method: 'e', args: ['e1'] },
            { method: 'm', args: ['m1'] }
        ], expected: 'block__e1 block__e1_m1 rock' },
        { chain: [
            { method: 'e', args: ['e1'] },
            { method: 'm', args: ['m1'] },
            { method: 'concat', args: ['rock'] }
        ], expected: 'block__e1 block__e1_m1 rock' },
        { chain: [
            { method: 'e', args: ['e1'] },
            { method: 'm', args: ['m1'] },
            { method: 'concat', args: ['rock1'] },
            { method: 'concat', args: ['rock2'] },
            { method: 'concat', args: ['rock3'] }
        ], expected: 'block__e1 block__e1_m1 rock1 rock2 rock3' }
    ]).forEach((test) => {
        it(methodsChainToString(test.chain) + ' => "' + test.expected + '"', function() {
            test.chain.forEach((item) => {
                this.b[item.method].apply(this.b, item.args);
            });
            expect(String(this.b)).to.be.equal(test.expected);
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
        memo += item.method + '("' + item.args.join() + '")';
        if (n < l) {
            memo += '.';
        }
        return memo;
    }, '');
}
