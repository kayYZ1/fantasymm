import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import { useDrawingOptionsStore } from '@/stores/drawing-options'
import DrawingOptionsModalComponent from '../DrawingOptionsModalComponent.vue'

describe('DrawingOptionsModalComponent', () => {
  let pinia: ReturnType<typeof createPinia>
  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('does not render the modal when isOpen is false', () => {
    const wrapper = mount(DrawingOptionsModalComponent, {
      props: { isOpen: false },
      global: { plugins: [pinia] },
    })
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  it('renders the modal overlay and displays default store values', () => {
    const store = useDrawingOptionsStore()
    const wrapper = mount(DrawingOptionsModalComponent, {
      props: { isOpen: true },
      global: { plugins: [pinia] },
    })
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('Drawing Options')

    const brushRangeWrapper = wrapper.find('input[type="range"][min="1"][max="20"]')
    expect(brushRangeWrapper.exists()).toBe(true)

    const brushInput = brushRangeWrapper.element as HTMLInputElement
    expect(Number(brushInput.value)).toBe(store.brushDensity)

    const stampRangeWrapper = wrapper.find('input[type="range"][min="1"][max="64"]')
    expect(stampRangeWrapper.exists()).toBe(true)

    const stampInput = stampRangeWrapper.element as HTMLInputElement
    expect(Number(stampInput.value)).toBe(store.stampSize)

    const randCheckboxWrapper = wrapper.find('input[type="checkbox"]')
    expect(randCheckboxWrapper.exists()).toBe(true)

    const randCheckboxEl = randCheckboxWrapper.element as HTMLInputElement
    expect(randCheckboxEl.checked).toBe(store.randomizeRotation)

    const jitterRangeWrapper = wrapper.find('input[type="range"][min="0"][max="32"]')
    expect(jitterRangeWrapper.exists()).toBe(true)

    const jitterInput = jitterRangeWrapper.element as HTMLInputElement
    expect(Number(jitterInput.value)).toBe(store.jitterAmount)
  })

  it('updates store values when interacting with inputs', async () => {
    const store = useDrawingOptionsStore()
    const wrapper = mount(DrawingOptionsModalComponent, {
      props: { isOpen: true },
      global: { plugins: [pinia] },
    })

    const brushRangeWrapper = wrapper.find('input[type="range"][min="1"][max="20"]')
    await brushRangeWrapper.setValue(10)

    expect(store.brushDensity).toBe('10')
    expect(wrapper.findAll('.value')[0].text()).toBe('10')

    const stampRangeWrapper = wrapper.find('input[type="range"][min="1"][max="64"]')
    await stampRangeWrapper.setValue(32)

    expect(store.stampSize).toBe('32')
    expect(wrapper.findAll('.value')[1].text()).toBe('32')

    const randCheckboxWrapper = wrapper.find('input[type="checkbox"]')
    await randCheckboxWrapper.setValue(false)

    expect(store.randomizeRotation).toBe(false)

    const jitterRangeWrapper = wrapper.find('input[type="range"][min="0"][max="32"]')
    await jitterRangeWrapper.setValue(20)

    expect(store.jitterAmount).toBe('20')
    expect(wrapper.findAll('.value')[2].text()).toBe('20')
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(DrawingOptionsModalComponent, {
      props: { isOpen: true },
      global: { plugins: [pinia] },
    })
    const closeButton = wrapper.find('.close-button')
    await closeButton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
    expect(wrapper.emitted('close')?.length).toBe(1)
  })
})
