import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import Map from '../views/MapView.vue'

const mockRouter = {
  push: vi.fn(),
}

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}))

HTMLCanvasElement.prototype.getContext = vi.fn() //Mock canvas getContext

describe('Map', () => {
  it('renders all elements on the screen', () => {
    const wrapper = shallowMount(Map)

    expect(wrapper.find('.map-container').exists()).toBe(true)

    expect(wrapper.find('.turn-back').exists()).toBe(true)
    expect(wrapper.find('.turn-back').text()).toBe('Turn back')

    expect(wrapper.find('.bottom-bar').exists()).toBe(true)
  })

  it('redirects to / when "Turn back" is clicked', async () => {
    const wrapper = shallowMount(Map)
    await wrapper.find('.turn-back').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })
})
