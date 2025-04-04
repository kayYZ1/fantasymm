import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import RecentTilesComponent from '../RecentTilesComponent.vue'
import { useTileStore } from '@/stores/tile'

vi.mock('@/stores/tile', () => ({
  useTileStore: vi.fn(() => ({
    selectTile: vi.fn(),
    recentTilesWithPreview: [],
  })),
}))

describe('RecentTilesComponent', () => {
  let tileStoreMock: {
    selectTile: ReturnType<typeof vi.fn>
    recentTilesWithPreview: { name: string; svgPreview: string }[]
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    tileStoreMock = {
      selectTile: vi.fn(),
      recentTilesWithPreview: [],
    }

    //@ts-expect-error Does not need full store interface
    vi.mocked(useTileStore).mockReturnValue(tileStoreMock)
  })

  it('renders the container and no-tiles message with correct classes when no recent tiles exist', () => {
    tileStoreMock.recentTilesWithPreview = []

    const wrapper = mount(RecentTilesComponent)

    // Check container and its class
    const recentTiles = wrapper.find('.recent-tiles')
    expect(recentTiles.exists()).toBe(true)
    expect(recentTiles.classes()).toContain('recent-tiles')

    // Check no-tiles message and its class
    const noTiles = wrapper.find('.no-tiles')
    expect(noTiles.exists()).toBe(true)
    expect(noTiles.classes()).toContain('no-tiles')
    expect(noTiles.text()).toBe('No recent tiles')

    // No tile icons should render
    expect(wrapper.findAll('.tile-icon').length).toBe(0)
  })

  it('renders recent tiles with correct classes when tiles exist', () => {
    tileStoreMock.recentTilesWithPreview = [
      { name: 'grass', svgPreview: '<svg>grass svg</svg>' },
      { name: 'water', svgPreview: '<svg>water svg</svg>' },
    ]

    const wrapper = mount(RecentTilesComponent)

    // Check container and its class
    const recentTiles = wrapper.find('.recent-tiles')
    expect(recentTiles.exists()).toBe(true)
    expect(recentTiles.classes()).toContain('recent-tiles')

    // Check no-tiles message is absent
    expect(wrapper.find('.no-tiles').exists()).toBe(false)

    // Check tile icons and their class
    const tileIcons = wrapper.findAll('.tile-icon')
    expect(tileIcons.length).toBe(2)
    tileIcons.forEach((icon) => {
      expect(icon.classes()).toContain('tile-icon')
    })

    const svgContainers = wrapper.findAll('.svg-container')
    expect(svgContainers.length).toBe(2)
    svgContainers.forEach((container) => {
      expect(container.classes()).toContain('svg-container')
    })
  })
})
