/**
 * jBit class
 *
 * @class
 */
export default class jBit {

    /**
     * Create a jBit instance
     * @param {(string|array|Element|NodeList)} selector
     * @param {Element} context
     * @return {jBit} a new instance
     */
    constructor (selector, context = document) {
        if (this._isStr(selector)) {
            this._each(
                context.querySelectorAll(selector),
                el => this._push(el)
            )
        } else {
            if (Array.isArray(selector)) {
                this._fill(selector)
            } else {
                this._push(selector)
            }
        }
        return this
    }

    /**
     *  Filter the set of matched elements
     *
     * @param {string} string containing a selector expression
     * @return {jBit} instance
     */
    filter (selector) {
        return this._fill(
            [].filter.call(this, el => {
                if (this._isStr(selector)) {
                    return this.is(selector, el)
                }
            })
        )
    }

    /**
     *  Find descendants of each element in the
     *  current set of elements
     *
     * @param {string} string containing a selector expression
     * @return {jBit} instance
     */
    find (selector) {
        return this._fill(
            this._flatten(
                [].map.call(this, el => {
                    return Array.from(
                        el.querySelectorAll(selector)
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

    siblings () {
        return this._fill(
            this._flatten(
                [].map.call(this, el => {
                    return [].filter.call(
                        el.parentNode.children, child => el != child
                    )
                })
            )
        )
    }

    children (filter) {
        return this._fill(
            this._flatten(
                [].map.call(this, el => {
                    if (filter) {
                        return [].filter.call(
                            el.children, c => this.is(filter, c)
                        )
                    } else {
                        return this._toArray(el.children)
                    }
                })
            )
        )
    }

    parent () {
        return this._fill(
            [].map.call(this, el => el.parentNode)
        )
    }

    is (selector, el = null) {
        if (el) {
            return el.matches(selector)
        } else {
            return [].every.call(this, el => el.matches(selector))
        }
    }

    get () {
        return this._toArray(this)
    }

    _nextPrev (direction) {
        return this._fill(
            [].map.call(this, el => {
                return el[`${direction}ElementSibling`]
            })
        )
    }

    _nextPrevAll (direction, filter) {
        let result = this._flatten(
            [].map.call(this, (el, i) => {
                let dir = `${direction}ElementSibling`
                , tmp = []

                while (el = el[dir]) {
                    if (filter && this.is(filter, el)) {
                        tmp.push(el)
                    }
                }

                return tmp
            })
        )

        return this._fill(this._unique(result))
    }

    _isStr (string) {
        return (typeof string === 'string' || string instanceof String)
    }

    _fill (results) {
        if (!Array.isArray(results)) {
            results = [results]
        }

        this._clean()
        this._each(results, el => this._push(el))
        return this
    }

    _clean () {
        for (let i in this) {
            if (this.hasOwnProperty(i)) {
                delete this[i]
            }
        }
    }

    _push (mixed) {
        if (mixed) {
            [].push.call(this, mixed)
        }
    }

    _flatten (mixed) {
        return [].concat.apply([], mixed)
    }

    _unique (mixed) {
        return mixed.filter((el, i) => {
            return mixed.indexOf(el) == i
        })
    }

    _each (elements, cb) {
        [].forEach.call(elements, cb)
    }

    _toArray (iterable) {
        return [].slice.call(iterable)
    }
}
