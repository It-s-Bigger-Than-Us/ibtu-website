import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import GetInvolvedSection from './GetInvolvedSection'

const meta = {
  title: 'Sections/GetInvolvedSection',
  component: GetInvolvedSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GetInvolvedSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
