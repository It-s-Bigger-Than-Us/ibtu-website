import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import AnimatedHeadline from './AnimatedHeadline'

const meta = {
  title: 'UI/AnimatedHeadline',
  component: AnimatedHeadline,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: '80px 40px', minWidth: 600 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AnimatedHeadline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Community is the infrastructure',
    scrollTrigger: false,
    color: '#FFC700',
  },
}

export const HeroSize: Story = {
  args: {
    text: 'It\'s Bigger Than Us',
    as: 'h1',
    size: 'hero',
    scrollTrigger: false,
    color: '#FFF',
  },
}

export const SectionSize: Story = {
  args: {
    text: 'We listen we build we stay',
    as: 'h2',
    size: 'section',
    scrollTrigger: false,
    color: '#FFC700',
  },
}

export const CardSize: Story = {
  args: {
    text: 'Designed with dignity',
    as: 'h3',
    size: 'card',
    scrollTrigger: false,
    color: '#FFF',
  },
}

export const WithDelay: Story = {
  args: {
    text: 'Delayed entrance animation',
    scrollTrigger: false,
    delay: 0.5,
    color: '#FFC700',
  },
}
