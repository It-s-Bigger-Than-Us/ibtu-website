import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CTASection from './CTASection'

const meta = {
  title: 'Sections/CTASection',
  component: CTASection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CTASection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomCopy: Story = {
  args: {
    headline: 'Community Is the Infrastructure',
    body: 'We listen, we build, we stay. Every action you take strengthens the network that holds Los Angeles together.',
  },
}
