const expect = require('expect.js');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const BemifyClassName = require('../../react-mixin');

const B1 = React.createClass({
    displayName: 'block1',

    mixins: [BemifyClassName],

    render() {
        return React.createElement('div', {
            className: this.b
        });
    }
});
const B1M1 = React.createClass({
    displayName: 'block1',

    mixins: [BemifyClassName],

    render() {
        return React.createElement('div', {
            className: this.b.m('m1')
        });
    }
});
const B1C = React.createClass({
    displayName: 'block1',

    mixins: [BemifyClassName],

    render() {
        return React.createElement('div', {
            className: this.b.concat('foo')
        });
    }
});
const E1 = React.createClass({
    displayName: 'block1',

    mixins: [BemifyClassName],

    render() {
        return React.createElement('div', {
            className: this.b.e('e1')
        });
    }
});
const E1M1 = React.createClass({
    displayName: 'block1',

    mixins: [BemifyClassName],

    render() {
        return React.createElement('div', {
            className: this.b.e('e1').m('m1')
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
const B2M1 = React.createClass({
    displayName: 'block2',

    mixins: [BemifyClassName],

    render() {
        return React.createElement('div', {
            className: this.b('block1').m('m1')
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
            expect(String(this.dom.props.className)).to.be.equal('block1');
        });
    });
    describe('this.b.e()', function() {
        beforeEach(function() {
            const shallowRenderer = TestUtils.createRenderer();

            shallowRenderer.render(
                React.createElement(E1)
            );
            this.dom = shallowRenderer.getRenderOutput();
        });
        it('should make a className using displayName and specified element name', function() {
            expect(String(this.dom.props.className)).to.be.equal('block1__e1');
        });
    });
    describe('this.b.concat("foo")', function() {
        beforeEach(function() {
            const shallowRenderer = TestUtils.createRenderer();

            shallowRenderer.render(
                React.createElement(B1C)
            );
            this.dom = shallowRenderer.getRenderOutput();
        });
        it('should concat "foo" to the className', function() {
            expect(String(this.dom.props.className)).to.be.equal('block1 foo');
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
    describe('[#3] mix className from the props to this.b', function() {
        beforeEach(function() {
            const shallowRenderer = TestUtils.createRenderer();

            shallowRenderer.render(
                React.createElement(B1, { className: 'my-another-block' })
            );
            this.dom = shallowRenderer.getRenderOutput();
        });
        it('should add "my-another-block" from the props to this.b', function() {
            expect(String(this.dom.props.className)).to.be.equal('block1 my-another-block');
        });
    });
    describe('[#3] mix className from the props to this.b.m()', function() {
        beforeEach(function() {
            const shallowRenderer = TestUtils.createRenderer();

            shallowRenderer.render(
                React.createElement(B1M1, { className: 'my-another-block' })
            );
            this.dom = shallowRenderer.getRenderOutput();
        });
        it('should add "my-another-block" from the props to this.b.m()', function() {
            expect(String(this.dom.props.className)).to.be.equal('block1 block1_m1 my-another-block');
        });
    });
    describe('[#7] don\'t mix className from the props to element', function() {
        beforeEach(function() {
            const shallowRenderer = TestUtils.createRenderer();

            shallowRenderer.render(
                React.createElement(E1, { className: 'my-another-block' })
            );
            this.dom = shallowRenderer.getRenderOutput();
        });
        it('should NOT add "my-another-block" from the props to this.b.e()', function() {
            expect(String(this.dom.props.className)).to.be.equal('block1__e1');
        });
    });
    describe('[#7] don\'t mix className from the props to element with modifier', function() {
        beforeEach(function() {
            const shallowRenderer = TestUtils.createRenderer();

            shallowRenderer.render(
                React.createElement(E1M1, { className: 'my-another-block' })
            );
            this.dom = shallowRenderer.getRenderOutput();
        });
        it('should NOT add "my-another-block" from the props to this.b.e().m()', function() {
            expect(String(this.dom.props.className)).to.be.equal('block1__e1 block1__e1_m1');
        });
    });
    describe('[#7] don\'t mix className from the props to specified block name', function() {
        beforeEach(function() {
            const shallowRenderer = TestUtils.createRenderer();

            shallowRenderer.render(
                React.createElement(B2, { className: 'my-another-block' })
            );
            this.dom = shallowRenderer.getRenderOutput();
        });
        it('should NOT add "my-another-block" from the props to this.b()', function() {
            expect(String(this.dom.props.className)).to.be.equal('block1');
        });
    });
    describe('[#7] don\'t mix className from the props to specified block name with modifier', function() {
        beforeEach(function() {
            const shallowRenderer = TestUtils.createRenderer();

            shallowRenderer.render(
                React.createElement(B2M1, { className: 'my-another-block' })
            );
            this.dom = shallowRenderer.getRenderOutput();
        });
        it('should NOT add "my-another-block" from the props to this.b().m()', function() {
            expect(String(this.dom.props.className)).to.be.equal('block1 block1_m1');
        });
    });
});
