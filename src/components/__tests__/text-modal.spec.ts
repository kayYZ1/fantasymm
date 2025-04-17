import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import TextModalComponent from '../TextModalComponent.vue'
import { useTextStore } from '@/stores/text'

describe('TextModalComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('does not render modal when isOpen is false', () => {
    const wrapper = mount(TextModalComponent, { props: { isOpen: false } })
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  it('renders modal elements when isOpen is true', () => {
    const wrapper = mount(TextModalComponent, { props: { isOpen: true } })
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('Text')

    const textInput = wrapper.find('input[type="text"]')
    expect(textInput.exists()).toBe(true)

    const rangeInput = wrapper.find('input[type="range"]')
    expect(rangeInput.exists()).toBe(true)
    expect(rangeInput.attributes('min')).toBe('8')
    expect(rangeInput.attributes('max')).toBe('64')

    const colorInput = wrapper.find('input[type="color"]')
    expect(colorInput.exists()).toBe(true)
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(TextModalComponent, { props: { isOpen: true } })
    await wrapper.find('button.close-button').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('updates store values on input change', async () => {
    const wrapper = mount(TextModalComponent, { props: { isOpen: true } })
    const textStore = useTextStore()

    const textInput = wrapper.find('input[type="text"]')
    await textInput.setValue('Hello World')
    expect(textStore.text).toBe('Hello World')

    const rangeInput = wrapper.find('input[type="range"]')
    await rangeInput.setValue('32')
    expect(textStore.textSize).toBe('32')

    const colorInput = wrapper.find('input[type="color"]')
    await colorInput.setValue('#abcdef')
    expect(textStore.textColor).toBe('#abcdef')
  })
})
