/**
 * Filter mixin, keep all filtering methods
 *
 * @class
 */
export default class Filter {

    /**
     * Reduce the set of matched elements
     * to the one at the specified index
     *
     * @param {Integer} index
     * @return {jBit} instance
     */
    at (index) {
        if (index < 0) {
            index = this.length + index
        }

        return this[index] ? this._make(this[index]) : this._make(null)
    }

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
