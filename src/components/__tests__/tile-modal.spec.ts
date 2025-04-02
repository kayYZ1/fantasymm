import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import TileModalComponent from '../TileModalComponent.vue'

vi.mock('@/utils/map-tiles', () => ({
  default: {
    grass: '<svg>grass svg</svg>',
    water: '<svg>water svg</svg>',
    mountain: '<svg>mountain svg</svg>',
  },
}))

const mockSelectTile = vi.fn()

vi.mock('@/stores/tile', () => ({
  useTileStore: vi.fn(() => ({
    selectTile: mockSelectTile,
  })),
}))

describe('TileSelector component tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly when open', () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: true,
      },
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('Choose a Tile')
    expect(wrapper.find('.search-input').exists()).toBe(true)
    expect(wrapper.find('.close-button').exists()).toBe(true)
  })

  it('does not render when isOpen is false', () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: false,
      },
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  it('displays all tiles initially', () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: true,
      },
    })

    const tileIcons = wrapper.findAll('.tile-icon')
    expect(tileIcons.length).toBe(3) // grass, water, mountain from the mock

    const tileNames = wrapper.findAll('.tile-text')
    expect(tileNames[0].text()).toBe('grass')
    expect(tileNames[1].text()).toBe('water')
    expect(tileNames[2].text()).toBe('mountain')
  })

  it('filters tiles based on search query', async () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: true,
      },
    })

    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('mount')

    const tileIcons = wrapper.findAll('.tile-icon')
    expect(tileIcons.length).toBe(1)
    expect(wrapper.find('.tile-text').text()).toBe('mountain')
  })

  it('shows no tiles when search has no matches', async () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: true,
      },
    })

    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('nonexistent')

    const tileIcons = wrapper.findAll('.tile-icon')
    expect(tileIcons.length).toBe(0)
  })

  it('selects a tile and emits close event when tile is clicked', async () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: true,
      },
    })

    const tileIcons = wrapper.findAll('.tile-icon')

    await tileIcons[0].trigger('click')

    expect(mockSelectTile).toHaveBeenCalledWith('grass') //Mock pinia action
    expect(mockSelectTile).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: true,
      },
    })

    const closeButton = wrapper.find('.close-button')
    await closeButton.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('keeps search input value when closing and reopening', async () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: true,
      },
    })

    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('water')

    await wrapper.setProps({ isOpen: false })
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)

    await wrapper.setProps({ isOpen: true })

    expect((wrapper.find('.search-input').element as HTMLInputElement).value).toBe('water')
    expect(wrapper.findAll('.tile-icon').length).toBe(1)
    expect(wrapper.find('.tile-text').text()).toBe('water')
  })

  it('correctly renders SVG content in the tile images', () => {
    const wrapper = mount(TileModalComponent, {
      props: {
        isOpen: true,
      },
    })

    const tileImages = wrapper.findAll('.tile-image')
    expect(tileImages[0].html()).toContain('<svg>grass svg</svg>')
    expect(tileImages[1].html()).toContain('<svg>water svg</svg>')
    expect(tileImages[2].html()).toContain('<svg>mountain svg</svg>')
  })
})
