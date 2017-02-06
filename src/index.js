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

export default $
