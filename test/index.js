import {expect, should} from 'chai'
import B from './../src/index'
import jBit from './../src/jBit'

describe('B', () => {
    it('should be a function', () => {
        expect(B).to.be.a('function')
    })

    describe('jBit', () => {

        beforeEach(() => {

        })

        it('should be a jBit instance', () => {
            expect(B('body')).to.be.a.instanceof(jBit)
        })

        it('get()', () => {
            let $body = B('body').get()
            expect($body).to.be.a('array')
            expect($body[0]).to.equal(
                document.querySelector('body')
            )
        })

        it('is()', () => {
            
        })
    })
})
