import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import DonationEmbed from './DonationEmbed'

const meta = {
  title: 'Sections/DonationEmbed',
  component: DonationEmbed,
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
} satisfies Meta<typeof DonationEmbed>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    formUrl: 'https://secure.qgiv.com/for/ibt/',
  },
}

export const WithTitleAndDescription: Story = {
  args: {
    formUrl: 'https://secure.qgiv.com/for/ibt/',
    title: 'Support Our Mission',
    description: 'Community is the infrastructure. Your gift helps IBTU serve 62,475+ students, distribute 875,500+ pounds of food, and stabilize families across Los Angeles.',
  },
}
