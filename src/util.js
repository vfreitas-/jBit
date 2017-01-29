
/**
 * Add a mixin to a class
 *
 * @function
 * @param  {Object} target class to receive the mixin properties
 * @param  {Object} source mixin class
 */
export const mixin = (target, source) => {
    target = target.prototype
    source = source.prototype

    Object.getOwnPropertyNames(source).forEach(name => {
        if (name !== 'constructor') {
            Object.defineProperty(
                target, name, Object.getOwnPropertyDescriptor(source, name)
            )
        }
    })
}

export const assign = (target, source) => {
    for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop]
        }
    }
}
