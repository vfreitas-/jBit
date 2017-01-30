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
     * @return {jBit} instance containing the first element
     */
    first () {
        return this.at(0)
    }

    /**
     * @return {jBit} instance containing the last element
     */
    last () {
        return this.at(-1)
    }

    /**
     * Filter the set of matched elements excluding 
     * the ones that match the filter
     * 
     * @param {String} filter containing a selector expression
     * @return {jBit} instance
     */
    not (filter) {
        return this.filter(filter, true)
    }

    /**
     *  Filter the set of matched elements
     *
     * @param {String} selector containing a selector expression
     * @return {jBit} instance
     */
    filter (selector, not = false) {
        return this._make(
            [].filter.call(this, el => {
                if (this._isStr(selector)) {
                    return !not ? this.is(selector, el) : !this.is(selector, el)
                }
            })
        )
    }
}
