import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MapCanvasComponent from '../MapCanvasComponent.vue'

describe('MapComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should load the canvas element', async () => {
    const wrapper = mount(MapCanvasComponent, {
      attachTo: document.body,
    })

    const canvas = wrapper.find('canvas')
    expect(canvas.exists()).toBe(true)
    expect(canvas.element).toBeInstanceOf(HTMLCanvasElement)

    canvas.element.width = 100
    canvas.element.height = 100

    expect(canvas.element.width).toBeGreaterThan(0)
    expect(canvas.element.height).toBeGreaterThan(0)

    wrapper.unmount()
  })

  it('should apply correct classes to template elements', () => {
    const wrapper = mount(MapCanvasComponent)
    const section = wrapper.find('section')

    expect(section.exists()).toBe(true)
    expect(section.classes()).toContain('map-area')

    const canvas = wrapper.find('canvas')

    expect(canvas.exists()).toBe(true)
    expect(canvas.classes()).toContain('map-canvas')
    wrapper.unmount()
  })
})
