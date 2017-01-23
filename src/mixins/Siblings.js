/**
 * Siblings mixin, keep all siblings related methods
 *
 * @class
 */
export default class Siblings {

    /**
     * Get all sibling elements of each element in
     * the current set of elements
     *
     * @return {jBit} instance
     */
    siblings () {
        return this._make(
            this._flatten(
                [].map.call(this, el => {
                    return [].filter.call(
                        el.parentNode.children, child => el != child
                    )
                })
            )
        )
    }

    /**
     * Find the previous element sibling of each element in
     * the current set of elements
     *
     * @return {jBit} instance
     */
    prev () {
        return this._nextPrev('previous')
    }

    /**
     * Find the next element sibling of each element in
     * the current set of elements
     *
     * @return {jBit} instance
     */
    next () {
        return this._nextPrev('next')
    }

    /**
     * Get all preceding sibling elements of each element in
     * the current set of elements
     * Can receive a selector to filter the matched siblings
     *
     * @param {string} string containing a selector expression
     * @return {jBit} instance
     */
    prevAll (filter) {
        return this._nextPrevAll('previous', filter)
    }

    /**
     * Get all following sibling elements of each element in
     * the current set of elements
     * Can receive a selector to filter the matched siblings
     *
     * @param {string} string containing a selector expression
     * @return {jBit} instance
     */
    nextAll (filter) {
        return this._nextPrevAll('next', filter)
    }

    _nextPrev (direction) {
        return this._make(
            [].map.call(this, el => {
                return el[`${direction}ElementSibling`]
            })
        )
    }

    _nextPrevAll (direction, filter) {
        let result = this._flatten(
            [].map.call(this, el => {
                let dir = `${direction}ElementSibling`
                , tmp = []

                while (el = el[dir]) {
                    if (filter) {
                        this.is(filter, el) ? tmp.push(el) : ''
                    } else {
                        tmp.push(el)
                    }
                }

                return tmp
            })
        )

        return this._make(this._unique(result))
    }
}
