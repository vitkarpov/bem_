const expect = require('expect.js');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const BemifyClassName = require('../../react-mixin');

const B1 = React.createClass({
    displayName: 'block1',

    mixins: [BemifyClassName],

    render() {
        return React.createElement('div', {
            className: this.b.e('e1')
        });
    }
});
const B2 = React.createClass({
    displayName: 'block2',

    mixins: [BemifyClassName],

    render() {
        return React.createElement('div', {
            className: this.b('block1')
        });
    }
});

describe('React Mixin -> ', function() {
    describe('this.b', function() {
        beforeEach(function() {
            const shallowRenderer = TestUtils.createRenderer();

            shallowRenderer.render(
                React.createElement(B1)
            );
            this.dom = shallowRenderer.getRenderOutput();
        });
        it('should make a className using displayName', function() {
            expect(String(this.dom.props.className)).to.be.equal('block1__e1');
        });
    });
    describe('this.b()', function() {
        beforeEach(function() {
            const shallowRenderer = TestUtils.createRenderer();

            shallowRenderer.render(
                React.createElement(B2)
            );
            this.dom = shallowRenderer.getRenderOutput();
        });
        it('should make a className using specified block name', function() {
            expect(String(this.dom.props.className)).to.be.equal('block1');
        });
    });
});
