import './support'
import jBit from './jBit'


/**
 * Wrappier for our jBit class, that allows
 * we to just call B([selector]) without the
 * necessity of instantiating the jBit class
 *
 * @function
 * @param {(string|array|Element|NodeList)} selector
 * @param {Element} context
 * @return {jBit} a new jBit instance
 */
export default function B (selector, context) {
    return new jBit(selector, context)
}
