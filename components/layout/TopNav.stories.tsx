import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import TopNav from './TopNav'

const meta = {
  title: 'Layout/TopNav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', minHeight: '100vh', padding: '0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TopNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
