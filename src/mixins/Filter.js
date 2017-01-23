/**
 * Filter mixin, keep all filtering methods
 *
 * @class
 */
export default class Filter {

    /**
     *  Filter the set of matched elements
     *
     * @param {string} string containing a selector expression
     * @return {jBit} instance
     */
    filter (selector) {
        return this._make(
            [].filter.call(this, el => {
                if (this._isStr(selector)) {
                    return this.is(selector, el)
                }
            })
        )
    }
}
