import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroVideo from './HeroVideo'
import { ALL_SOURCES } from '@/lib/video-library'

const meta = {
  title: 'UI/HeroVideo',
  component: HeroVideo,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    src: { control: 'select', options: ALL_SOURCES },
    overlay: { control: 'select', options: ['none', 'dim', 'gold'] },
    size: { control: 'select', options: ['1080', '720', '480'] },
  },
} satisfies Meta<typeof HeroVideo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { src: 'holo01', height: '60vh' },
}

export const WithDimOverlay: Story = {
  args: { src: 'holo02', height: '60vh', overlay: 'dim' },
}

export const WithGoldOverlay: Story = {
  args: { src: 'holo03', height: '60vh', overlay: 'gold' },
}

export const AspectRatio16x9: Story = {
  args: { src: 'holo04', aspectRatio: '16/9' },
}
