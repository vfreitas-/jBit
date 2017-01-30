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

    _isStr (string) {
        return string && (typeof string === 'string' || string instanceof String)
    }

    _isElement (elem) {
        return (elem instanceof Element)
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
}
