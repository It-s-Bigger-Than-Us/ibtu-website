import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import SectionLabel from './SectionLabel'

const meta = {
  title: 'UI/SectionLabel',
  component: SectionLabel,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Gold: Story = {
  args: {
    label: 'Programs',
    color: 'gold',
  },
}

export const GoldWithCount: Story = {
  args: {
    label: 'Programs',
    count: 7,
    color: 'gold',
  },
}

export const White: Story = {
  args: {
    label: 'Impact',
    count: 2,
    color: 'white',
  },
}

export const Black: Story = {
  args: {
    label: 'Events',
    count: 54,
    color: 'black',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#FFC700', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
}

export const NoCount: Story = {
  args: {
    label: 'About',
    color: 'gold',
  },
}
