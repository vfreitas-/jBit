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
}
