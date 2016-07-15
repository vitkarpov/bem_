const BEMClassName = require('../../lib');
const expect = require('expect.js');

const { methodsChainToString } = require('../utils');

describe('Modifiers -> ', function() {
    beforeEach(function() {
        this.b = new BEMClassName('block');
    });
    it('m("mod") => "block block_mod"', function() {
        expect(String(this.b.m('mod'))).to.be.equal('block block_mod');
    });
    it('m("mod",undefined) => "block"', function() {
        expect(String(this.b.m('mod', undefined))).to.be.equal('block');
    });
    ([
        { chain: [
            { method: 'm', args: ['mod'] }
        ], expected: 'block block_mod' },
        { chain: [
            { method: 'm', args: ['mod', true] }
        ], expected: 'block block_mod' },
        { chain: [
            { method: 'm', args: ['mod', false] }
        ], expected: 'block' },
        { chain: [
            { method: 'm', args: ['mod', null] }
        ], expected: 'block' },
        { chain: [
            { method: 'm', args: ['mod', ''] }
        ], expected: 'block block_mod' },
        { chain: [
            { method: 'm', args: ['mod', 'val'] }
        ], expected: 'block block_mod_val' },
        { chain: [
            { method: 'm', args: ['mod', 0] }
        ], expected: 'block block_mod_0' },
        { chain: [
            { method: 'm', args: ['mod', 42] }
        ], expected: 'block block_mod_42' },
        { chain: [
            { method: 'e', args: ['e'] },
            { method: 'm', args: ['mod', 42] }
        ], expected: 'block__e block__e_mod_42' },
    ]).forEach((test) => {
        it(methodsChainToString(test.chain) + ' => "' + test.expected + '"', function() {
            test.chain.forEach((item) => {
                this.b[item.method].apply(this.b, item.args);
            });
            expect(String(this.b)).to.be.equal(test.expected);
        });
    });
});
