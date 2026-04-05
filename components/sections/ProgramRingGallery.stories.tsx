import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProgramRingGallery from './ProgramRingGallery'

const mockImages = [
  '/images/fire-relief/IMG_5909.jpg',
  '/images/fire-relief/IMG_9804.jpg',
  '/images/fire-relief/IMG_8047.jpg',
  '/images/additional/IMG_0339.jpg',
  '/images/school/IMG_5406.jpg',
  '/images/b2s/_D5A5792.jpg',
]

const meta = {
  title: 'Sections/ProgramRingGallery',
  component: ProgramRingGallery,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProgramRingGallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    images: mockImages,
    title: 'Fire Relief & The Hub',
  },
}

export const FullHeight: Story = {
  args: {
    images: mockImages,
    title: 'Fire Relief & The Hub',
    fullHeight: true,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '500px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
