import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import InTheFieldGallery from './InTheFieldGallery'

const meta = {
  title: 'Sections/InTheFieldGallery',
  component: InTheFieldGallery,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: '40px 80px', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InTheFieldGallery>

export default meta
type Story = StoryObj<typeof meta>

const ITEMS = [
  { id: '1', image: '/images/fire-relief/hub-interior-1.jpg', alt: 'Hub interior — families receiving services' },
  { id: '2', image: '/images/fire-relief/hub-interior-2.jpg', alt: 'Hub intake and case management' },
  { id: '3', image: '/images/school/IMG_4674.jpg', alt: 'Lunchtime Takeover activation on campus' },
  { id: '4', image: '/images/school/IMG_5612.jpg', alt: 'Students engaging with IBTU staff' },
  { id: '5', image: '/images/fire-relief/hub-community-1.jpg', alt: 'Community members at the Hub' },
  { id: '6', image: '/images/b2s/_D5A7392.jpg', alt: 'Families receiving backpacks at Back 2 School' },
  { id: '7', image: '/images/school/IMG_6134.jpg', alt: 'Alliance campus programming' },
  { id: '8', image: '/images/school/IMG_7259.jpg', alt: 'Community Creators youth media program' },
]

export const Default: Story = {
  args: { items: ITEMS },
}

export const WithTitles: Story = {
  args: {
    items: ITEMS.map((item, i) => ({
      ...item,
      title: ['Hub Services', 'Case Management', 'Lunchtime Takeover', 'Youth Engagement', 'Community Voice', 'Back 2 School', 'Alliance', 'Creators'][i],
    })),
  },
}

export const FewItems: Story = {
  args: { items: ITEMS.slice(0, 4) },
}
