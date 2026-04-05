import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import GoldTicker from './GoldTicker'

const meta = {
  title: 'Sections/GoldTicker',
  component: GoldTicker,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GoldTicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomPhrases: Story = {
  args: {
    phrases: [
      'Community is the Infrastructure',
      'Designed with Dignity',
      'We Listen. We Build. We Stay.',
    ],
    speed: 40,
  },
}

export const SlowScroll: Story = {
  args: {
    speed: 80,
    separator: '\u2726',
  },
}
