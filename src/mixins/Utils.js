/**
 * Siblings mixin, keep all siblings related methods
 *
 * @class
 */
export default class Utils {

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
