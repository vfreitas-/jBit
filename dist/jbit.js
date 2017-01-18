(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.B = factory());
}(this, (function () { 'use strict';

(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.msMatchesSelector;
    }
})()

/**
 * jBit class
 *
 * @class
 */
var jBit = function jBit (selector, context) {
    var this$1 = this;
    if ( context === void 0 ) context = document;

    if (this._isStr(selector)) {
        this._each(
            context.querySelectorAll(selector),
            function (el) { return this$1._push(el); }
        );
    } else {
        if (Array.isArray(selector)) {
            this._fill(selector);
        } else {
            this._push(selector);
        }
    }
    return this
};

/**
 *  Filter the set of matched elements
 *
 * @param {string} string containing a selector expression
 * @return {jBit} instance
 */
jBit.prototype.filter = function filter (selector) {
        var this$1 = this;

    return this._fill(
        [].filter.call(this, function (el) {
            if (this$1._isStr(selector)) {
                return this$1.is(selector, el)
            }
        })
    )
};

/**
 *  Find descendants of each element in the
 *  current set of elements
 *
 * @param {string} string containing a selector expression
 * @return {jBit} instance
 */
jBit.prototype.find = function find (selector) {
    return this._fill(
        this._flatten(
            [].map.call(this, function (el) {
                return Array.from(
                    el.querySelectorAll(selector)
                )
            })
        )
    )
};

/**
 * Find the previous element sibling of each element in
 * the current set of elements
 *
 * @return {jBit} instance
 */
jBit.prototype.prev = function prev () {
    return this._nextPrev('previous')
};

/**
 * Find the next element sibling of each element in
 * the current set of elements
 *
 * @return {jBit} instance
 */
jBit.prototype.next = function next () {
    return this._nextPrev('next')
};

/**
 * Get all preceding sibling elements of each element in
 * the current set of elements
 * Can receive a selector to filter the matched siblings
 *
 * @param {string} string containing a selector expression
 * @return {jBit} instance
 */
jBit.prototype.prevAll = function prevAll (filter) {
    return this._nextPrevAll('previous', filter)
};

/**
 * Get all following sibling elements of each element in
 * the current set of elements
 * Can receive a selector to filter the matched siblings
 *
 * @param {string} string containing a selector expression
 * @return {jBit} instance
 */
jBit.prototype.nextAll = function nextAll (filter) {
    return this._nextPrevAll('next', filter)
};

jBit.prototype.siblings = function siblings () {
    return this._fill(
        this._flatten(
            [].map.call(this, function (el) {
                return [].filter.call(
                    el.parentNode.children, function (child) { return el != child; }
                )
            })
        )
    )
};

jBit.prototype.children = function children (filter) {
        var this$1 = this;

    return this._fill(
        this._flatten(
            [].map.call(this, function (el) {
                if (filter) {
                    return [].filter.call(
                        el.children, function (c) { return this$1.is(filter, c); }
                    )
                } else {
                    return this$1._toArray(el.children)
                }
            })
        )
    )
};

jBit.prototype.is = function is (selector, el) {
        if ( el === void 0 ) el = null;

    if (el) {
        return el.matches(selector)
    } else {
        return [].every.call(this, function (el) { return el.matches(selector); })
    }
};

jBit.prototype.get = function get () {
    return this._toArray(this)
};

jBit.prototype._nextPrev = function _nextPrev (direction) {
    return this._fill(
        [].map.call(this, function (el) {
            return el[(direction + "ElementSibling")]
        })
    )
};

jBit.prototype._nextPrevAll = function _nextPrevAll (direction, filter) {
        var this$1 = this;

    var result = this._flatten(
        [].map.call(this, function (el, i) {
            var dir = direction + "ElementSibling"
            , tmp = [];

            while (el = el[dir]) {
                if (filter && this$1.is(filter, el)) {
                    tmp.push(el);
                }
            }

            return tmp
        })
    );

    return this._fill(this._unique(result))
};

jBit.prototype._isStr = function _isStr (string) {
    return (typeof string === 'string' || string instanceof String)
};

jBit.prototype._fill = function _fill (results) {
        var this$1 = this;

    if (!Array.isArray(results)) {
        results = [results];
    }

    this._clean();
    this._each(results, function (el) { return this$1._push(el); });
    return this
};

jBit.prototype._clean = function _clean () {
        var this$1 = this;

    for (var i in this) {
        if (this$1.hasOwnProperty(i)) {
            delete this$1[i];
        }
    }
};

jBit.prototype._push = function _push (mixed) {
    if (mixed) {
        [].push.call(this, mixed);
    }
};

jBit.prototype._flatten = function _flatten (mixed) {
    return [].concat.apply([], mixed)
};

jBit.prototype._unique = function _unique (mixed) {
    return mixed.filter(function (el, i) {
        return mixed.indexOf(el) == i
    })
};

jBit.prototype._each = function _each (elements, cb) {
    [].forEach.call(elements, cb);
};

jBit.prototype._toArray = function _toArray (iterable) {
    return [].slice.call(iterable)
};

function B (selector, context) {
    return new jBit(selector, context)
}

return B;

})));
//# sourceMappingURL=jbit.js.map
