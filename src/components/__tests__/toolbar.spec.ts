import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

import Toolbar from '../ToolbarComponent.vue'

describe('Toolbar component tests', () => {
  it('renders all buttons with correct classes', () => {
    const wrapper = mount(Toolbar)

    const buttonGroup = wrapper.find('.button-group')
    expect(buttonGroup.exists()).toBe(true)

    const buttons = wrapper.findAll('.bar-button')
    expect(buttons.length).toBe(4)

    const icons = wrapper.findAll('.icon')
    expect(icons.length).toBe(4)
  })

  it('handles draw button click', async () => {
    const wrapper = mount(Toolbar)
    const consoleLogSpy = vi.spyOn(console, 'log')

    const drawButton = wrapper.findAll('.bar-button')[0]
    await drawButton.trigger('click')

    expect(consoleLogSpy).toHaveBeenCalledWith('Pencil clicked')
  })

  it('handles drawing options button click', async () => {
    const wrapper = mount(Toolbar)
    const consoleLogSpy = vi.spyOn(console, 'log')

    const optionsButton = wrapper.findAll('.bar-button')[1]
    await optionsButton.trigger('click')

    expect(consoleLogSpy).toHaveBeenCalledWith('Drawing options clicked')
  })

  it('handles text drawing button click', async () => {
    const wrapper = mount(Toolbar)
    const consoleLogSpy = vi.spyOn(console, 'log')

    const textButton = wrapper.findAll('.bar-button')[2]
    await textButton.trigger('click')

    expect(consoleLogSpy).toHaveBeenCalledWith('Text drawing clicked')
  })

  it('handles save button click', async () => {
    const wrapper = mount(Toolbar)
    const consoleLogSpy = vi.spyOn(console, 'log')

    const saveButton = wrapper.findAll('.bar-button')[3]
    await saveButton.trigger('click')

    expect(consoleLogSpy).toHaveBeenCalledWith('Save map activated')
  })
})
