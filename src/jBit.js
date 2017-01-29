import Filter from './mixins/Filter'
import Siblings from './mixins/Siblings'
import Utils from './mixins/Utils'
import Traverse from './mixins/Traverse'
import { mixin } from './util'

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
     * @param {Element} context
     * @return {jBit} a new instance
     */
    constructor (selector, context = document) {
        if (selector instanceof jBit) {
            selector = selector.get()
        }

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
     * @return {Array} resulted by the map function
     */
    map (cb) {
        return this._make(
            [].map.call(this, cb)
        )
    }

    /**
     * @param {Function} forEach callback
     */
    each (cb) {
        [].forEach.call(this, cb)
    }

    /**
     * @param {Array|NodeList} list
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
     * @param {String} string containing a selector expression
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
        return new this.constructor(selector, context)
    }

    /**
     * Fill the instance with the set of elements
     * 
     * @param {Array} of elements to fill
     */
    _fill (data) {
        this._each(data, el => this._push(el))
    }

    /**
     * Fill an array of selectors|elements|(jBit instances)
     * into the instance
     * 
     * @param {Array} Array that may contain strings, elements or jBit instances
     * @param {Element} context
     */
    _pushArray (selectorArr, context) {
        this._fill(
            this._flatten(
                selectorArr.map(el => {
                    if (el instanceof jBit) {
                        el = el.get()
                    }

                    if (this._isStr(el)) {
                        return this.slice(context.querySelectorAll(el))
                    } else if (this._isElement(el)) {
                        return el
                    }
                })
            )
        )
    }

    /**
     * @param {Element} to be pushed into the instance
     */
    _push (element) {
        if (element) {
            [].push.call(this, element)
        }
    }
}
