import './support'
import jBit from './jBit'


/**
 * Wrapper for our jBit class, that allows
 * we to just call $([selector]) without the
 * necessity of instantiating the jBit class
 *
 * @function
 * @param {(String|Array|Element|jBit)} selector
 * @param {Element} context
 * @return {jBit} a new instance
 */
function $ (selector, context) {
    return new jBit(selector, context)
}

var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

$.noConflict = () => {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
}

export default $
