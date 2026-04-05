import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import DonationForm from './DonationForm'

const meta = {
  title: 'Sections/DonationForm',
  component: DonationForm,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 40, maxWidth: 480, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DonationForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    programTitle: 'Back 2 School Festival',
    programSlug: 'back-2-school',
    qgivUrl: 'https://secure.qgiv.com/for/ibt/',
  },
}

export const WithSponsorPackages: Story = {
  args: {
    programTitle: 'Fire Relief & The Hub',
    programSlug: 'fire-relief',
    qgivUrl: 'https://secure.qgiv.com/for/ibt/',
    sponsorPackages: [
      { _id: 'sp-1', tierName: 'Community Partner', price: 500, priceDisplay: '$500' },
      { _id: 'sp-2', tierName: 'Gold Sponsor', price: 2500, priceDisplay: '$2,500' },
      { _id: 'sp-3', tierName: 'Title Sponsor', price: 5000, priceDisplay: '$5,000' },
    ],
  },
}

export const NoQgivUrl: Story = {
  args: {
    programTitle: 'Coastal Care',
    programSlug: 'coastal-care',
  },
}
