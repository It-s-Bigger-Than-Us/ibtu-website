import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'

import MenuDropdown from './MenuDropdown'

const meta = {
  title: 'Layout/MenuDropdown',
  component: MenuDropdown,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof MenuDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    open: true,
  },
}

export const Closed: Story = {
  args: {
    open: false,
  },
}
