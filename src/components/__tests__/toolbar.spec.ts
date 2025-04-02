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

  it('handles zoom button click', async () => {
    const wrapper = mount(Toolbar)
    const consoleLogSpy = vi.spyOn(console, 'log')

    const zoomButton = wrapper.findAll('.bar-button')[1]
    await zoomButton.trigger('click')

    expect(consoleLogSpy).toHaveBeenCalledWith('Zoom tool activated')
  })

  it('handles layers button click', async () => {
    const wrapper = mount(Toolbar)
    const consoleLogSpy = vi.spyOn(console, 'log')

    const layersButton = wrapper.findAll('.bar-button')[2]
    await layersButton.trigger('click')

    expect(consoleLogSpy).toHaveBeenCalledWith('Layers tool activated')
  })

  it('handles save button click', async () => {
    const wrapper = mount(Toolbar)
    const consoleLogSpy = vi.spyOn(console, 'log')

    const saveButton = wrapper.findAll('.bar-button')[3]
    await saveButton.trigger('click')

    expect(consoleLogSpy).toHaveBeenCalledWith('Save map activated')
  })
})
