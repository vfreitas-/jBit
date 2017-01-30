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
     * @param {String} filter containing a selector expression
     * @return {jBit} instance
     */
    prevAll (filter) {
        return this._whileDirection('previousElementSibling', filter)
    }

    /**
     * Get all following sibling elements of each element in
     * the current set of elements
     * Can receive a selector to filter the matched siblings
     *
     * @param {String} filter containing a selector expression
     * @return {jBit} instance
     */
    nextAll (filter) {
        return this._whileDirection('nextElementSibling', filter)
    }

    /**
     * Map each element getting its next/previous sibling
     * 
     * @param {String} direction to go (next|previous)
     * @return {jBit} instance
     */
    _nextPrev (direction) {
        return this._make(
            [].map.call(this, el => {
                return el[`${direction}ElementSibling`]
            })
        )
    }
}
