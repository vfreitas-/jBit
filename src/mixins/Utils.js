/**
 * Siblings mixin, keep all siblings related methods
 *
 * @class
 */
export default class Utils {

    /**
     * @param {String} direction to go
     * @param {String} [filter] optional filter
     * @return {Array} with the matched elements
     */
    _whileDirection (direction, filter) {
        let result = this._flatten(
            [].map.call(this, el => {
                let tmp = []

                while ( (el = el[direction]) && el.nodeType !== 9  )   {
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

    /**
     * @param {*} value to be tested
     * @return {Boolean} if the value is a string
     */
    _isStr (value) {
        return value && (typeof value === 'string' || value instanceof String)
    }

    /**
     * @param {*} value to be tested
     * @return {Boolean} if the value if an Element
     */
    _isElement (value) {
        return (value instanceof Element)
    }

    /**
     * Flatten an array in one level
     * 
     * @param {Array|NodeList} mixed value to be flattened
     * @return {Array} the flattened array
     */
    _flatten (mixed) {
        return [].concat.apply([], mixed)
    }

    /**
     * @param {Array} mixed to be checked
     * @return {Array} with unique values
     */
    _unique (mixed) {
        return mixed.filter((el, i) => {
            return mixed.indexOf(el) == i
        })
    }

    /**
     * @param {Array|NodeList} elements
     * @param {Function} cb
     */
    _each (elements, cb) {
        [].forEach.call(elements, cb)
    }
}
