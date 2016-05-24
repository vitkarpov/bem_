const BEMClassName = require('../../lib');
const expect = require('expect.js');

describe('Custom delimiters -> ', function() {
    beforeEach(function() {
        this.b = new BEMClassName('block', {
            ELEMENT_DELIMITER: '-',
            MODIFIER_DELIMITER: '--'
        });
    });
    it('e("e1") => block-e1', function() {
        expect(String(this.b.e('e1'))).to.be.equal('block-e1');
    });
    it('e("e1").m("m1") => block-e1--m1', function() {
        expect(String(this.b.e('e1').m('m1'))).to.be.equal('block-e1 block-e1--m1');
    });
    it('e("e1").m("m1", "v1") => block-e1--m1--v1', function() {
        expect(String(this.b.e('e1').m('m1', 'v1'))).to.be.equal('block-e1 block-e1--m1--v1');
    });
});
