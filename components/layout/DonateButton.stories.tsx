import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import DonateButton from './DonateButton'

const meta = {
  title: 'Layout/DonateButton',
  component: DonateButton,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', minHeight: '200vh', paddingTop: '120px' }}>
        <p style={{ color: '#FFC700', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
          Scroll down to trigger the action bar
        </p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DonateButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
