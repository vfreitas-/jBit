/**
 * Traverse mixin, keep all traversing
 * methods for ancestors and descendants
 *
 * @class
 */
export default class Traverse {

    /**
     * Get all children elements of each element in
     * the current set of elements
     * Can receive a selector to filter the matched children
     *
     * @param {String} string containing a selector expression
     * @return {jBit} instance
     */
    children (filter) {
        return this._make(
            this._flatten(
                [].map.call(this, el => {
                    if (filter) {
                        return [].filter.call(
                            el.children, c => this.is(filter, c)
                        )
                    } else {
                        return this.slice(el.children)
                    }
                })
            )
        )
    }

    /**
     *  Find descendants of each element in the
     *  current set of elements
     *
     * @param {String} string containing a selector expression
     * @return {jBit} instance
     */
    find (selector) {
        return this._make(
            this._flatten(
                [].map.call(this, el => {
                    return this.slice(
                        el.querySelectorAll(selector)
                    )
                })
            )
        )
    }

    /**
     * Get the parent elements of each element in
     * the current set of elements
     *
     * @return {jBit} instance
     */
    parent () {
        return this._make(
            [].map.call(this, el => el.parentNode)
        )
    }
}
