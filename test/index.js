import {expect} from 'chai'
import B from './../src/index'
import jBit from './../src/jBit'

let $div = document.createElement('div')
document.querySelector('body').appendChild($div)

describe('B', () => {

    it('should be a function', () => {
        expect(B).to.be.a('function')
    })

    describe('jBit', () => {

        beforeEach(() => {
            $div.innerHTML = __html__['test/fixtures/index.html']
        })

        afterEach(() => {
            $div.innerHTML = ''
        })

        describe('B()', () => {
            it('should be a jBit instance', () => {
                expect(B('body')).to.be.a.instanceof(jBit)
            })

            it('should return an empty jBit instance', () => {
                expect(B(null)).to.be.empty
                expect(B(undefined)).to.be.empty
                expect(B('')).to.be.empty
            })
            
            it('should allow a string selector', () => {
                expect(B('body')[0]).to.equal(
                    document.querySelector('body')
                )
            })

            it('should allow a jBit instance', () => {
                let $body = B('body')

                expect(B($body)[0]).to.equal(
                    document.querySelector('body')
                )
            })

            it('should allow a node element', () => {
                let body = document.querySelector('body')
                expect(B(body)[0]).to.equal(
                    document.querySelector('body')
                )
            })

            it('should accept a string selector array', () => {
                let $elems = B(['body', '.container', '.base'])

                expect($elems.get()).to.have.lengthOf(3)
                expect($elems[0]).to.equal(
                    document.querySelector('body')
                )
            })

            it('should accept an array with elements and string selectors', () => {
                let body = document.querySelector('body')
                  , $elems = B([body, '.container'])

                expect($elems.get()).to.have.lengthOf(2)
                expect($elems.get()[0]).to.equal(
                    document.querySelector('body')
                )

                expect($elems.get()[1]).to.equal(
                    document.querySelector('.container')
                )
            })

            it('should accept an array with elements, selectors and jBit instances', () => {
                let body = document.querySelector('#div-01')
                  , $cont = B('.container')
                  , $elems = B([body, $cont, '.base'])

                expect($elems.get()).to.have.lengthOf(3)
                expect($elems.get())
                    .to.include.members([
                        document.querySelector('#div-01'),
                        document.querySelector('.container'),
                        document.querySelector('.base')
                    ])
            })
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

        describe('at()', () => {
            it('should return the second element of 4', () => {
                let $items = B('.container__item')

                expect($items.at(1)[0]).to.be.equal(
                    document.querySelector('.container__item--active')
                )
            })

            it('should return the second element of 4 using a negative index', () => {
                let $items = B('.container__item')

                expect($items.at(-3)[0]).to.be.equal(
                    document.querySelector('.container__item--active')
                )
            })

            it('should return an empty instance', () => {
                let $items = B('.container__item')

                expect($items.at(5).get()).to.be.empty
            })
        })

        describe('first()', () => {
            it('should return the first element in the jBit instance', () => {
                let $items = B('.group > *')

                expect($items.first()[0]).to.be.equal(
                    document.querySelector('input[type="text"]')
                )
            })
        })

        describe('last()', () => {
            it('should return the last element in the jBit instance', () => {
                let $items = B('.group > *')

                expect($items.last()[0]).to.be.equal(
                    document.querySelector('input[type="checkbox"]')
                )
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

        describe('parents()', () => {
            it('should return all element parents', () => {
                let $base2 = B('.base-2')

                expect($base2.parents().get())
                    .to.include.members([
                        document.querySelector('li.two'),
                        document.querySelector('ul.base')
                    ])
            })

            it('should return all parent elements filtered', () => {
                let $el = B('.base-2 .a')

                expect($el.parents('ul').get())
                    .to.include.members([
                        document.querySelector('ul.base-2'),
                        document.querySelector('ul.base')
                    ])
            })
        })

        describe('closest()', () => {
            it('should return the closest element', () => {
                let $el = B('li.a')

                expect($el.closest('ul')[0])
                    .to.be.equal(
                        document.querySelector('ul.base-2')
                    )
            })

            it('should return the element itself', () => {
                let $div = B('#div-03')

                expect($div.closest('div div')[0])
                    .to.be.equal(
                        $div[0]
                    )
            })

            it('should return an empty jBit object', () => {
                let $el = B('li.a')

                expect($el.closest().get())
                    .to.be.empty

                expect($el.closest('.some-div').get())
                    .to.be.empty
            })
        })

        describe('not()', () => {
            it('should exclude the matched elements', () => {
                let $items = B('.container').find('.container__item')

                expect(
                    $items.not('.container__item--active').get()
                ).to.have.lengthOf(3)
            })

            it("shouldn't exclude any elements if no filter or an invalid filter is passed as argument", () => {
                let $items = B('.container').find('.container__item')

                expect(
                    $items.not('.container').get()
                ).to.have.lengthOf(4)
            })
        })
    })
})
