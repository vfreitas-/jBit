import Filter from './mixins/Filter'
import Siblings from './mixins/Siblings'
import Utils from './mixins/Utils'
import Traverse from './mixins/Traverse'
import { mixin, rgxSelector } from './util'

class Base {}

mixin(Base, Filter)
mixin(Base, Siblings)
mixin(Base, Utils)
mixin(Base, Traverse)

/**
 * jBit class
 *
 * @class
 */
export default class jBit extends Base {

    /**
     * Create a jBit instance
     * @param {(String|Array|Element|jBit)} selector
     * @param {Element|jBit} context
     * @return {jBit} a new instance
     */
    constructor (selector, context = document) {
        this.length = 0

        if (selector instanceof jBit) {
            selector = selector.get()
        }

        if (this._isStr(selector)) {
            if (context instanceof jBit) {
                return context.find(selector)
            }

            this._fill(this._selector(selector, context))
        } else if (Array.isArray(selector)) {
            this._pushArray(selector, context)
        } else if (this._isElement(selector)) {
            this._push(selector)
        }

        return this
    }

    /**
     * @param {Function} cb map callback
     * @return {Array} resulted by the map function
     */
    map (cb) {
        return this._make(
            [].map.call(this, cb)
        )
    }

    /**
     * @param {Function} cb forEach callback
     */
    each (cb) {
        [].forEach.call(this, cb)
    }

    /**
     * @param {Array|NodeList} iterable list
     * @return {Array}
     */
    slice (iterable) {
        return [].slice.apply(iterable, arguments)
    }

    /**
     * Test if each element in the current set of elements
     * match the given selector
     * Can receive an element to compare, ignoring the current
     * set of elements
     *
     * @param {String} selector string containing a selector expression
     * @param {Element} elem to test the selector against
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
     * Add new elements to the instance
     * 
     * @param {String} selector string containing a selector expression
     * @param {Element} elem to test the selector against
     * @return {jBit} instance
     */
    add (selector, context) {
        return this._merge(this, this._make(selector, context))
    }

    /**
     * Add the previous set of elements, to the current one
     * optionally filtered by a selector
     * 
     * @param {String} selector string containing a selector expression
     * @return {jBit} instance
     */
    addBack (selector) {
        return this.add(
            !selector
                ? this.previous
                : this.previous.filter(selector)
        )
    }

    /**
     * @return {jBit} the previous set of metched elements
     */
    end () {
        return this.previous || this._make(null)
    }

    /**
     * Get an array containing the current set
     * of elements
     *
     * @return {Array} array containing the current set of elements
     */
    get () {
        return this.slice(this)
    }

    //=================
    //Private methods
    //=================

    /**
     * Used internally to create a new instance for
     * the new set of elements
     * 
     * @param {(String|Array|Element|jBit)} selector
     * @param {Element} context
     * @return {jBit} a new instance
     */
    _make(selector, context) {
        let n = new this.constructor(selector, context)

        n.previous = this

        return n
        // return new this.constructor(selector, context)
    }

    /**
     * @param {(String|Array|Element|jBit)} selector
     * @param {Element} context
     * @return {NodeList} with the matched elements
     */
    _selector (selector, context) {
        let match, m
        if (match = rgxSelector.exec(selector)) {
            let matched = null
            //id selector
            if ( (m = match[1]) ) {
                matched = [context.getElementById(m)]
            } else if ( (m = match[2]) ) {
                matched = context.getElementsByTagName(m)
            } else if ( (m = match[3]) ) {
                matched = context.getElementsByClassName(m)
            }

            return matched
        } else {
            return context.querySelectorAll(selector)
        }
    }

    /**
     * Fill the instance with the set of elements
     * 
     * @param {Array} data of elements to fill
     */
    _fill (data) {
        this._each(data, el => this._push(el))
    }

    /**
     * Fill an array of selectors|elements|(jBit instances)
     * into the instance
     * 
     * @param {Array} selectorArr Array that may contain strings, elements or jBit instances
     * @param {Element} context
     */
    _pushArray (selectorArr, context) {
        this._fill(
            this._flatten(
                selectorArr.map(el => {
                    if (el instanceof jBit) {
                        this._pushArray(el.get(), context)
                    }

                    if (this._isStr(el)) {
                        return this.slice(this._selector(el, context))
                    } else if (this._isElement(el)) {
                        return el
                    }
                })
            )
        )
    }

    /**
     * Merge two jBit instances
     * 
     * @param {jBit} source instance
     * @param {jBit} target instance
     * @return {jBit} instance containing both, source and target matched elements
     */
    _merge (source, target) {
        for (let i = 0; i < target.length; i++) {
            source._push(target[i])
        }

        return source
    }

    /**
     * @param {Element} element to be pushed into the instance
     */
    _push (element) {
        if (element) {
            [].push.call(this, element)
        }
    }
}
