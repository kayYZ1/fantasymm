import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import Home from '../views/Home.vue'

const mockRouter = {
  push: vi.fn(),
}

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}))

describe('Home', () => {
  it('renders all elements on the screen', () => {
    const wrapper = shallowMount(Home)

    expect(wrapper.find('.welcome-container').exists()).toBe(true)
    expect(wrapper.find('.parchment-header').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(true)
    expect(wrapper.find('.title').text()).toBe('Welcome to Fantasy Map Maker')
    expect(wrapper.find('.subtitle').exists()).toBe(true)
    expect(wrapper.find('.subtitle').text()).toBe(
      'Craft Thy Legendary Maps For Your Novels and so on',
    )
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.scroll-text').exists()).toBe(true)
    expect(wrapper.find('.medieval-button').exists()).toBe(true)
    expect(wrapper.find('.medieval-button').text()).toBe('Begin Thy Quest')
    expect(wrapper.find('.footer').exists()).toBe(true)
    expect(wrapper.find('.footer').text()).toBe('Scribed by github.com/kayYZ1 • Anno Domini MMXXV')
  })

  it('redirects to /map after clicking', async () => {
    const wrapper = shallowMount(Home)
    await wrapper.find('.medieval-button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/map')
  })
})
