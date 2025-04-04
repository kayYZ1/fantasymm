import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import TileModalComponent from '../TileModalComponent.vue'

// Mock external dependencies
vi.mock('@/utils/map-tiles', () => ({
  default: {
    grass: '#00FF00',
    water: '#0000FF',
    mountain: '#8B4513',
  },
}))

vi.mock('@/stores/tile', () => ({
  useTileStore: vi.fn(() => ({
    selectTile: vi.fn(),
  })),
}))

describe('TileModalComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the modal overlay and checks classes when isOpen is true', () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: true,
      },
    })

    // Check modal overlay and its class
    const modalOverlay = wrapper.find('.modal-overlay')
    expect(modalOverlay.exists()).toBe(true)
    expect(modalOverlay.classes()).toContain('modal-overlay')

    // Check modal container and its class
    const modal = wrapper.find('.modal')
    expect(modal.exists()).toBe(true)
    expect(modal.classes()).toContain('modal')

    // Check heading
    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('Choose a Tile')

    // Check search input and its class
    const searchInput = wrapper.find('.search-input')
    expect(searchInput.exists()).toBe(true)
    expect(searchInput.classes()).toContain('search-input')

    // Check tile grid wrapper and its class
    const tileGridWrapper = wrapper.find('.tile-grid-wrapper')
    expect(tileGridWrapper.exists()).toBe(true)
    expect(tileGridWrapper.classes()).toContain('tile-grid-wrapper')

    // Check tile grid and its class
    const tileGrid = wrapper.find('.tile-grid')
    expect(tileGrid.exists()).toBe(true)
    expect(tileGrid.classes()).toContain('tile-grid')

    // Check tile icons and their class
    const tileIcons = wrapper.findAll('.tile-icon')
    expect(tileIcons.length).toBe(3) // grass, water, mountain from mock
    tileIcons.forEach((icon) => {
      expect(icon.classes()).toContain('tile-icon')
    })

    // Check tile images and their class
    const tileImages = wrapper.findAll('.tile-image')
    tileImages.forEach((image) => {
      expect(image.classes()).toContain('tile-image')
    })

    // Check tile text and their class
    const tileTexts = wrapper.findAll('.tile-text')
    tileTexts.forEach((text) => {
      expect(text.classes()).toContain('tile-text')
    })

    // Check close button and its class
    const closeButton = wrapper.find('.close-button')
    expect(closeButton.exists()).toBe(true)
    expect(closeButton.classes()).toContain('close-button')

    wrapper.unmount()
  })

  it('does not render the modal overlay when isOpen is false', () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: false,
      },
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
    wrapper.unmount()
  })
})
