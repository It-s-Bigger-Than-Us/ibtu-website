import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import GetInvolvedHero from './GetInvolvedHero'

const meta = {
  title: 'Sections/GetInvolvedHero',
  component: GetInvolvedHero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GetInvolvedHero>

export default meta
type Story = StoryObj<typeof meta>

const mockImages = [
  '/images/b2s/2V8A1776.jpg',
  '/images/coastal/IMG_4953.jpg',
  '/images/gallery/IMG_4500.jpg',
  '/images/school/IMG_5406.jpg',
  '/images/wellness/IMG_1614.jpg',
  '/images/b2s/2V8A1826.jpg',
  '/images/coastal/IMG_0568.jpg',
  '/images/gallery/IMG_4649.jpg',
  '/images/school/IMG_0140.jpg',
  '/images/b2s/2V8A1895.jpg',
  '/images/coastal/IMG_1652.jpg',
  '/images/wellness/IMG_1589.jpg',
]

export const Default: Story = {
  args: {
    images: mockImages,
  },
}

export const FewImages: Story = {
  args: {
    images: mockImages.slice(0, 4),
  },
}
