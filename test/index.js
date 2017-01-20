import {expect, should} from 'chai'
import B from './../src/index'
import jBit from './../src/jBit'

let $div = document.createElement('div')
document.querySelector('body').appendChild($div)

describe('B', () => {
    it('should be a function', () => {
        expect(B).to.be.a('function')
    })

    describe('jBit', () => {

        beforeEach(function() {
            $div.innerHTML = __html__['test/fixtures/index.html']
        })

        afterEach(() => {
            $div.innerHTML = ''
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
            expect(B('body').is('body')).to.be.true
            expect(B('.container').is('body')).to.be.false
        })

        it('find()', () => {
            let $cont = B('.container')

            expect(
                $cont.find('.container__item').get()
            ).to.have.lengthOf(4)

            expect(
                $cont.find('.container__item--active').get()
            ).to.have.lengthOf(1)

            let $base = B('.base')

            expect(
                $base.find('li').get()
            ).to.have.lengthOf(4)
        })

        it('filter()', () => {
            let $items = B('.container').find('.container__item')

            expect(
                $items.filter('.container__item--active').get()
            ).to.have.lengthOf(1)
        })

        it('prev()', () => {
            expect(
                B('.base .two').prev()[0]
            )
            .to.equal(document.querySelector('.base .one'))
        })

        it('next()', () => {
            expect(
                B('.base .one').next()[0]
            )
            .to.equal(document.querySelector('.base .two'))
        })

        it('prevAll()', () => {
            let $input = B('.group').find('input[type="checkbox"]')

            expect($input.prevAll().get())
                .to.have.lengthOf(3)

            expect(document.querySelector('.group span'))
                .to.be.oneOf($input.prevAll().get())

            expect($input.prevAll('span').get())
                .to.have.lengthOf(1)
        })

        it('nextAll()', () => {
            let $input = B('.group').find('input[type="text"]')

            expect($input.nextAll().get())
                .to.have.lengthOf(3)

            expect(document.querySelector('.group span'))
                .to.be.oneOf($input.nextAll().get())

            expect($input.nextAll('span').get())
                .to.have.lengthOf(1)
        })

        it('siblings()', () => {
            let $span = B('.group span')

            expect($span.siblings().get())
                .to.have.lengthOf(3)

            expect($span).to.not.be.oneOf(
                $span.siblings().get()
            )
        })

        it('children()', () => {
            let $cont = B('.container')

            expect($cont.children().get())
                .to.have.lengthOf(4)

            expect(
                $cont.children('.container__item--active').get()
            )
            .to.have.lengthOf(1)

            let $active = $cont.find('.container__item--active')

            expect($active.children().get())
                .to.be.empty
        })

        it('parent()', () => {
            let $base2 = B('.base-2')

            expect($base2.parent()[0])
                .to.be.equal(
                    document.querySelector('li.two')
                )

            expect($base2.parent().parent()[0])
                .to.be.equal(
                    document.querySelector('.base')
                )
        })
    })
})
