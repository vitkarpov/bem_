/**
 * Returns the chain of applied methods
 * in the string form (for description).
 *
 * @example
 * [{ method: 'e', args: ['e1'] },
 *  { method: 'm', args: ['m1'] },
 *  { method: 'e', args: ['e2'] },
 *  { method: 'm', args: ['m2', 'v2'] }]
 *
 *  => e("e1").m("m1").e("e2").m("m2","v2")
 *
 * @param  {Array} chain
 * @return {String}
 */
function methodsChainToString(chain) {
    return chain.map(
        item => item.method + '(' + JSON.stringify(item.args).slice(1,-1) + ')'
    ).join('.');
}

module.exports.methodsChainToString = methodsChainToString;
