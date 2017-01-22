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
            this._fill(context.querySelectorAll(selector))
        } else if (Array.isArray(selector)) {
            this._pushArray(selector, context)
        } else if (this._isElement(selector)) {
            this._push(selector)
        }

        return this
    }

    /**
     * @param {Function} map callback
     * @return {array} resulted by the map function
     */
    map (cb) {
        return [].map.call(this, cb)
    }

    /**
     * @param {Function} forEach callback
     */
    each (cb) {
        [].forEach.call(this, cb)
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

    /**
     *  Find descendants of each element in the
     *  current set of elements
     *
     * @param {string} string containing a selector expression
     * @return {jBit} instance
     */
    find (selector) {
        return this._make(
            this._flatten(
                [].map.call(this, el => {
                    return this._toArray(
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
     * Get all children elements of each element in
     * the current set of elements
     * Can receive a selector to filter the matched children
     *
     * @param {string} string containing a selector expression
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
                        return this._toArray(el.children)
                    }
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
     * Test if each element in the current set of elements
     * match the given selector
     * Can receive an element to compare, ignoring the current
     * set of elements
     *
     * @param {string} string containing a selector expression
     * @return {jBit} instance
     */
    is (selector, elem = null) {
        if (elem) {
            return elem.matches(selector)
        } else {
            return [].every.call(this, el => el.matches(selector))
        }
    }

    /**
     * Get an array containing the current set
     * of elements
     *
     * @param {string} string containing a selector expression
     * @return {array} array containing the current set of elements
     */
    get () {
        return this._toArray(this)
    }

    //=================
    //Private methods
    //=================
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

    _isStr (string) {
        return string && (typeof string === 'string' || string instanceof String)
    }

    _isElement (elem) {
        return (elem instanceof Element)
    }

    _make(selector, context) {
        return new this.constructor(selector, context)
    }

    _fill (data) {
        this._each(data, el => this._push(el))
    }

    _pushArray (selectorArr, context) {
        this._fill(
            this._flatten(
                selectorArr.map(el => {
                    if (this._isStr(el)) {
                        return this._toArray(context.querySelectorAll(el))
                    } else if (this._isElement(el)) {
                        return el
                    }
                })
            )
        )
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
