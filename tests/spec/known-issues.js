const BEMClassName = require('../../lib');
const expect = require('expect.js');

describe('Known issues -> ', function() {
    describe('#16 Processing argument which is an instance of BEMClassName', function() {
        beforeEach(function() {
            this.b = new BEMClassName(new BEMClassName('block'));
        });
        it('this.b => block', function() {
            expect(String(this.b)).to.be.equal('block');
        });
        it('this.b.concat(this.b) => block block', function() {
            expect(String(this.b.concat(this.b))).to.be.equal('block block');
        });
    })
});
