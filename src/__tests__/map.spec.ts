import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import Map from '../views/Map.vue'

const mockRouter = {
  push: vi.fn(),
}

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}))

describe('Map', () => {
  it('renders all elements on the screen', () => {
    const wrapper = shallowMount(Map)

    expect(wrapper.find('.map-container').exists()).toBe(true)

    expect(wrapper.find('.turn-back').exists()).toBe(true)
    expect(wrapper.find('.turn-back').text()).toBe('Turn back')

    expect(wrapper.find('.map-area').exists()).toBe(true)
    expect(wrapper.find('.map-placeholder').exists()).toBe(true)
    expect(wrapper.find('.map-placeholder p').text()).toBe('Thy Realm Awaits')

    expect(wrapper.find('.bottom-bar').exists()).toBe(true)
    expect(wrapper.find('.button-group').exists()).toBe(true)

    const buttons = wrapper.findAll('.bar-button')
    expect(buttons).toHaveLength(4)

    expect(buttons[0].attributes('title')).toBe('Draw')
    expect(buttons[0].find('svg.icon').exists()).toBe(true)

    expect(buttons[1].attributes('title')).toBe('Zoom')
    expect(buttons[1].find('svg.icon').exists()).toBe(true)

    expect(buttons[2].attributes('title')).toBe('Layers')
    expect(buttons[2].find('svg.icon').exists()).toBe(true)

    expect(buttons[3].attributes('title')).toBe('Save')
    expect(buttons[3].find('svg.icon').exists()).toBe(true)
  })

  it('redirects to / when "Turn back" is clicked', async () => {
    const wrapper = shallowMount(Map)
    await wrapper.find('.turn-back').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })
})
