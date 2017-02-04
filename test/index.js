import {expect} from 'chai'
import $ from './../src/index'
import jBit from './../src/jBit'

let $div = document.createElement('div')
document.querySelector('body').appendChild($div)

describe('$', () => {

    it('should be a function', () => {
        expect($).to.be.a('function')
    })

    describe('jBit', () => {

        beforeEach(() => {
            $div.innerHTML = __html__['test/fixtures/index.html']
        })

        afterEach(() => {
            $div.innerHTML = ''
        })

        describe('$()', () => {
            it('should be a jBit instance', () => {
                expect($('body')).to.be.a.instanceof(jBit)
            })

            it('should return an empty jBit instance', () => {
                expect($(null)).to.have.lengthOf(0)
                expect($(undefined)).to.have.lengthOf(0)
                expect($('')).to.have.lengthOf(0)
            })
            
            it('should allow a string selector', () => {
                expect($('body')[0]).to.equal(
                    document.querySelector('body')
                )
            })

            it('should allow a jBit instance', () => {
                let $body = $('body')

                expect($($body)[0]).to.equal(
                    document.querySelector('body')
                )
            })

            it('should allow a node element', () => {
                let body = document.querySelector('body')
                expect($(body)[0]).to.equal(
                    document.querySelector('body')
                )
            })

            it('should accept a string selector array', () => {
                let $elems = $(['body', '.container', '.base'])

                expect($elems.get()).to.have.lengthOf(3)
                expect($elems[0]).to.equal(
                    document.querySelector('body')
                )
            })

            it('should accept an array with elements and string selectors', () => {
                let body = document.querySelector('body')
                  , $elems = $([body, '.container'])

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
                  , $cont = $('.container')
                  , $elems = $([body, $cont, '.base'])

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
            let $body = $('body').get()

            it('should return an array', () => {
                expect($body).to.be.a('array')
            })
        })

        describe('is()', () => {
            it('should return true', () => {
                expect($('body').is('body')).to.be.true
            })

            it('should return false', () => {
                expect($('.container').is('body')).to.be.false
            })
        })

        describe('index()', () => {
            it('should return the element position', () => {
                let $elems = $('.container__item--active')

                expect($elems.index())
                    .to.be.equal(1)
            })
        })

        describe('at()', () => {
            it('should return the second element of 4', () => {
                let $items = $('.container__item')

                expect($items.at(1)[0]).to.be.equal(
                    document.querySelector('.container__item--active')
                )
            })

            it('should return the second element of 4 using a negative index', () => {
                let $items = $('.container__item')

                expect($items.at(-3)[0]).to.be.equal(
                    document.querySelector('.container__item--active')
                )
            })

            it('should return an empty instance', () => {
                let $items = $('.container__item')

                expect($items.at(5).get()).to.have.lengthOf(0)
            })
        })

        describe('first()', () => {
            it('should return the first element in the jBit instance', () => {
                let $items = $('.group > *')

                expect($items.first()[0]).to.be.equal(
                    document.querySelector('input[type="text"]')
                )
            })
        })

        describe('last()', () => {
            it('should return the last element in the jBit instance', () => {
                let $items = $('.group > *')

                expect($items.last()[0]).to.be.equal(
                    document.querySelector('input[type="checkbox"]')
                )
            })
        })

        describe('find()', () => {
            it('should find four elements', () => {
                let $cont = $('.container')

                expect(
                    $cont.find('.container__item').get()
                ).to.have.lengthOf(4)
            })

            it('should find one element', () => {
                let $cont = $('.container')

                expect(
                    $cont.find('.container__item--active').get()
                ).to.have.lengthOf(1)
            })

            it('should find four elements', () => {
                let $base = $('.base')

                expect(
                    $base.find('li').get()
                ).to.have.lengthOf(4)
            })

        })

        describe('filter()', () => {
            it('should find one element', () => {
                let $items = $('.container').find('.container__item')

                expect(
                    $items.filter('.container__item--active').get()
                ).to.have.lengthOf(1)
            })
        })

        describe('prev()', () => {
            it('should return the preceding element', () => {
                expect(
                    $('.base .two').prev()[0]
                )
                .to.equal(document.querySelector('.base .one'))
            })
        })

        describe('next()', () => {
            it('should return the following element', () => {
                expect(
                    $('.base .one').next()[0]
                )
                .to.equal(document.querySelector('.base .two'))
            })
        })

        describe('prevAll()', () => {
            it('should return all preceding elements', () => {
                let $input = $('.group').find('input[type="checkbox"]')

                expect($input.prevAll().get())
                    .to.have.lengthOf(3)

                expect(document.querySelector('.group span'))
                    .to.be.oneOf($input.prevAll().get())
            })

            it('should return all preceding elements filtered', () => {
                let $input = $('.group').find('input[type="checkbox"]')

                expect($input.prevAll('span').get())
                    .to.have.lengthOf(1)
            })
        })

        describe('nextAll()', () => {
            it('should return all following elements', () => {
                let $input = $('.group').find('input[type="text"]')

                expect($input.nextAll().get())
                    .to.have.lengthOf(3)

                expect(document.querySelector('.group span'))
                    .to.be.oneOf($input.nextAll().get())
            })

            it('should return all following elements filtered', () => {
                let $input = $('.group').find('input[type="text"]')

                expect($input.nextAll('span').get())
                    .to.have.lengthOf(1)
            })
        })

        describe('siblings()', () => {
            it('should return all siblings', () => {
                let $span = $('.group span')

                expect($span.siblings().get())
                    .to.have.lengthOf(3)
            })

            it('should not contain the the selected element', () => {
                let $span = $('.group span')

                expect($span).to.not.be.oneOf(
                    $span.siblings().get()
                )
            })
        })

        describe('children()', () => {
            it('should return element children nodes', () => {
                let $cont = $('.container')

                expect($cont.children().get())
                    .to.have.lengthOf(4)
            })

            it('should return element children nodes filtered', () => {
                let $cont = $('.container')

                expect(
                    $cont.children('.container__item--active').get()
                )
                .to.have.lengthOf(1)
            })

            it('should return empty in case of no children', () => {
                let $cont = $('.container')
                  , $active = $cont.find('.container__item--active')

                expect($active.children().get())
                    .to.have.lengthOf(0)
            })
        })

        describe('parent()', () => {
            it('should return the element parent node', () => {
                let $base2 = $('.base-2')

                expect($base2.parent()[0])
                    .to.be.equal(
                        document.querySelector('li.two')
                    )
            })
        })

        describe('parents()', () => {
            it('should return all element parents', () => {
                let $base2 = $('.base-2')

                expect($base2.parents().get())
                    .to.include.members([
                        document.querySelector('li.two'),
                        document.querySelector('ul.base')
                    ])
            })

            it('should return all parent elements filtered', () => {
                let $el = $('.base-2 .a')

                expect($el.parents('ul').get())
                    .to.include.members([
                        document.querySelector('ul.base-2'),
                        document.querySelector('ul.base')
                    ])
            })
        })

        describe('closest()', () => {
            it('should return the closest element', () => {
                let $el = $('li.a')

                expect($el.closest('ul')[0])
                    .to.be.equal(
                        document.querySelector('ul.base-2')
                    )
            })

            it('should return the element itself', () => {
                let $div = $('#div-03')

                expect($div.closest('div div')[0])
                    .to.be.equal(
                        $div[0]
                    )
            })

            it('should return an empty jBit object', () => {
                let $el = $('li.a')

                expect($el.closest().get())
                    .to.have.lengthOf(0)

                expect($el.closest('.some-div').get())
                    .to.have.lengthOf(0)
            })
        })

        describe('not()', () => {
            it('should exclude the matched elements', () => {
                let $items = $('.container').find('.container__item')

                expect(
                    $items.not('.container__item--active').get()
                ).to.have.lengthOf(3)
            })

            it("shouldn't exclude any elements if no filter or an invalid filter is passed as argument", () => {
                let $items = $('.container').find('.container__item')

                expect(
                    $items.not('.container').get()
                ).to.have.lengthOf(4)
            })
        })

        describe('has()', () => {
            it('should return the element if he contains any descendants with the given selector', () => {
                let $base = $('.base')

                expect($base.has('.a')[0])
                    .to.be.equal(
                        document.querySelector('.base')
                    )

                let $lis = $('.base li')

                expect($lis.has('.a')[0])
                    .to.be.equal(
                        document.querySelector('li.two')
                    )
            })

            it('should return an empty jBit instance', () => {
                let $lis = $('.base li')

                expect($lis.has('button'))
                    .to.have.lengthOf(0)
            })

            it('should accept an Element also', () => {
                let $lis = $('.base li')
                let $a = document.querySelector('.a')

                expect($lis.has($a)[0])
                    .to.be.equal(
                        document.querySelector('li.two')
                    )
            })
        })

        describe('add()', () => {
            it('should add the selector to the jBit instance', () => {
                let $elems = $('.base')

                expect($elems.add('.container').get())
                    .to.include.members([
                        document.querySelector('.base'),
                        document.querySelector('.container')
                    ])

                expect($elems.add(['.container', '.group', '#div-01']).get())
                    .to.include.members([
                        document.querySelector('.base'),
                        document.querySelector('.container'),
                        document.querySelector('.group'),
                        document.querySelector('#div-01')
                    ])
            })
        })

        describe('end()', () => {
            it('should return the previous filtering state', () => {
                let $elems = $('.base')

                let $result = $elems.find('li').not('.two').end().not('.one')

                expect($result.get())
                    .to.include.members([
                        document.querySelector('.two')
                    ])

                expect($result.get())
                    .to.not.include.members([
                        document.querySelector('.one')
                    ])
            })
        })

        describe('addBack()', () => {
            it('should add the previous set of elements to the current one', () => {
                let $elems = $('.base')

                let $result = $elems.find('li').addBack()

                expect($result.get())
                    .to.include.members([
                        document.querySelector('.base'),
                        document.querySelector('.two')
                    ])
            })

            it('should add the previous set of elements to the current one filtered', () => {
                let $elems = $('.base > li')

                let $result = $elems.find('li.a').addBack('.two')

                expect($result.get())
                    .to.include.members([
                        document.querySelector('.a'),
                        document.querySelector('.two')
                    ])
            })
        })
    })
})
