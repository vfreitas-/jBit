/**
 * Filter mixin, keep all filtering methods
 *
 * @class
 */
export default class Filter {

    /**
     * Return the position of the first element relative
     * to its siblings elements
     * 
     * @return {Number} zero based position 
     */
    index () {
        return ( this[0] && this[0].parentNode ) 
            ? this.first().prevAll().length 
            : -1
    }

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
     * Filter the set of matched elements to those that have
     * a descendant that matches the selector or Element
     * 
     * @param {String|Element} selector containing a selector expression
     * @return {jBit} instance
     */
    has (selector) {
        let elems = this._make(selector, this).get()

        let matches = [].filter.call(this, el => {
            for (let i = 0; i < elems.length; i++) {
                if (el.contains(elems[i])) {
                    return true
                }
            }
        })

        return this._make(matches)
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
