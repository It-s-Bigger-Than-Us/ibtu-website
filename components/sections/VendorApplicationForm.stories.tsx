import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import VendorApplicationForm from './VendorApplicationForm'

const meta = {
  title: 'Sections/VendorApplicationForm',
  component: VendorApplicationForm,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', minHeight: '100vh', padding: 'clamp(32px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof VendorApplicationForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
