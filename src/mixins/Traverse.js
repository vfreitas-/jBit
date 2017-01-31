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
     * @param {String} filter containing a selector expression
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
     * @param {String} filter containing a selector expression
     * @return {jBit} instance
     */
    find (filter) {
        return this._make(
            this._flatten(
                [].map.call(this, el => {
                    return this.slice(
                        el.querySelectorAll(filter)
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

    /**
     * @param {String} filter containing a selector expression
     * @return {jBit} instance
     */
    parents (filter) {
        return this._whileDirection('parentNode', filter)
    }

    /**
     * Returns the closest ancestor of the current element (or the current element itself) 
     * which matches the selector for each of the elements in the current
     * set of elements
     * 
     * @param {String} selector
     * @return {jBit} instance
     */
    closest (selector) {
        if (!selector || !this._isStr(selector)) {
            return this._make(null)
        }

        let matched = this.map(el => {
            //use the native new method if possible
            if (el.closest) {
                return el.closest(selector) 
            } else {
                let parent = el
                  , next = null

                while (
                    (next = parent && parent.matches) &&
                    !this.is(selector, parent)
                ) {
                    parent = parent.parentNode
                }
                return next ? parent : null
            }
        })

        return this._make(matched)
    }
}
