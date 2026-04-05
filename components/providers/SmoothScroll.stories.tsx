import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import SmoothScroll from './SmoothScroll'

const meta = {
  title: 'Providers/SmoothScroll',
  component: SmoothScroll,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SmoothScroll>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{ background: '#000' }}>
        {Array.from({ length: 5 }, (_, i) => (
          <section
            key={i}
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid #FFC700',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontFamily: 'sans-serif',
                fontSize: 'clamp(36px, 6vw, 80px)',
                color: '#FFC700',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                Section {i + 1}
              </h2>
              <p style={{
                fontFamily: 'sans-serif',
                fontSize: 16,
                color: '#FFF',
              }}>
                {i === 0 ? 'Community is the infrastructure.' :
                 i === 1 ? 'Designed with dignity.' :
                 i === 2 ? 'We listen, we build, we stay.' :
                 i === 3 ? '62,475+ students served since 2020.' :
                 '875,500+ pounds of food distributed.'}
              </p>
            </div>
          </section>
        ))}
      </div>
    ),
  },
}
