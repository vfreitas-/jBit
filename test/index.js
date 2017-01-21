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

        it('should return element when accessed like an array', () => {
            expect(B('body')[0]).to.equal(
                document.querySelector('body')
            )
        })

        describe('get()', () => {
            let $body = B('body').get()

            it('should return an array', () => {
                expect($body).to.be.a('array')
            })
        })

        describe('is()', () => {
            it('should return true', () => {
                expect(B('body').is('body')).to.be.true
            })

            it('should return false', () => {
                expect(B('.container').is('body')).to.be.false
            })
        })

        describe('find()', () => {
            it('should find four elements', () => {
                let $cont = B('.container')

                expect(
                    $cont.find('.container__item').get()
                ).to.have.lengthOf(4)
            })

            it('should find one element', () => {
                let $cont = B('.container')

                expect(
                    $cont.find('.container__item--active').get()
                ).to.have.lengthOf(1)
            })

            it('should find four elements', () => {
                let $base = B('.base')

                expect(
                    $base.find('li').get()
                ).to.have.lengthOf(4)
            })

        })

        describe('filter()', () => {
            it('should find one element', () => {
                let $items = B('.container').find('.container__item')

                expect(
                    $items.filter('.container__item--active').get()
                ).to.have.lengthOf(1)
            })
        })

        describe('prev()', () => {
            it('should return the preceding element', () => {
                expect(
                    B('.base .two').prev()[0]
                )
                .to.equal(document.querySelector('.base .one'))
            })
        })

        describe('next()', () => {
            it('should return the following element', () => {
                expect(
                    B('.base .one').next()[0]
                )
                .to.equal(document.querySelector('.base .two'))
            })
        })

        describe('prevAll()', () => {
            it('should return all preceding elements', () => {
                let $input = B('.group').find('input[type="checkbox"]')

                expect($input.prevAll().get())
                    .to.have.lengthOf(3)

                expect(document.querySelector('.group span'))
                    .to.be.oneOf($input.prevAll().get())
            })

            it('should return all preceding elements filtered', () => {
                let $input = B('.group').find('input[type="checkbox"]')

                expect($input.prevAll('span').get())
                    .to.have.lengthOf(1)
            })
        })

        describe('nextAll()', () => {
            it('should return all following elements', () => {
                let $input = B('.group').find('input[type="text"]')

                expect($input.nextAll().get())
                    .to.have.lengthOf(3)

                expect(document.querySelector('.group span'))
                    .to.be.oneOf($input.nextAll().get())
            })

            it('should return all following elements filtered', () => {
                let $input = B('.group').find('input[type="text"]')

                expect($input.nextAll('span').get())
                    .to.have.lengthOf(1)
            })
        })

        describe('siblings()', () => {
            it('should return all siblings', () => {
                let $span = B('.group span')

                expect($span.siblings().get())
                    .to.have.lengthOf(3)
            })

            it('should not contain the the selected element', () => {
                let $span = B('.group span')

                expect($span).to.not.be.oneOf(
                    $span.siblings().get()
                )
            })
        })

        describe('children()', () => {
            it('should return element children nodes', () => {
                let $cont = B('.container')

                expect($cont.children().get())
                    .to.have.lengthOf(4)
            })

            it('should return element children nodes filtered', () => {
                let $cont = B('.container')

                expect(
                    $cont.children('.container__item--active').get()
                )
                .to.have.lengthOf(1)
            })

            it('should return empty in case of no children', () => {
                let $cont = B('.container')
                  , $active = $cont.find('.container__item--active')

                expect($active.children().get())
                    .to.be.empty
            })
        })

        describe('parent()', () => {
            it('should return the element parent node', () => {
                let $base2 = B('.base-2')

                expect($base2.parent()[0])
                    .to.be.equal(
                        document.querySelector('li.two')
                    )
            })
        })
    })
})
