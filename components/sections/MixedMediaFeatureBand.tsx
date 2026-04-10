'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'

export interface FeatureMediaAsset {
  type: 'image' | 'video'
  src: string
  alt: string
  poster?: string
  objectPosition?: string
}

interface MixedMediaFeatureBandProps {
  eyebrow?: string
  title: string
  body?: ReactNode
  href?: string
  ctaLabel?: string
  stat?: string
  theme?: 'light' | 'dark'
  align?: 'left' | 'right'
  primaryMedia: FeatureMediaAsset
  insetMedia?: FeatureMediaAsset
}

function renderMedia(media: FeatureMediaAsset, eager = false) {
  if (media.type === 'video') {
    return (
      <video
        src={media.src}
        poster={media.poster}
        muted
        playsInline
        loop
        autoPlay
        preload={eager ? 'auto' : 'metadata'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: media.objectPosition || 'center',
          display: 'block',
        }}
      />
    )
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={media.src}
      alt={media.alt}
      loading={eager ? 'eager' : 'lazy'}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: media.objectPosition || 'center',
        display: 'block',
      }}
    />
  )
}

export default function MixedMediaFeatureBand({
  eyebrow,
  title,
  body,
  href,
  ctaLabel,
  stat,
  theme = 'dark',
  align = 'left',
  primaryMedia,
  insetMedia,
}: MixedMediaFeatureBandProps) {
  const isDark = theme === 'dark'
  const mediaFirst = align === 'left'
  const textColor = isDark ? '#FFC700' : '#000'
  const bodyColor = isDark ? '#FFF' : '#000'
  const sectionBg = isDark ? '#000' : '#FFC700'
  const cardBg = isDark ? 'rgba(0, 0, 0, 0.92)' : 'rgba(255, 199, 0, 0.96)'
  const cardBorder = isDark ? '1px solid rgba(255, 199, 0, 0.35)' : '1px solid rgba(0, 0, 0, 0.18)'
  const cardShadow = isDark ? '0 30px 80px rgba(0, 0, 0, 0.45)' : '0 30px 80px rgba(0, 0, 0, 0.18)'

  return (
    <section
      className="mixed-media-feature-band"
      style={{
        background: sectionBg,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className={`mixed-media-feature-band__grid ${mediaFirst ? 'media-left' : 'media-right'}`}
      >
        <motion.div
          className="mixed-media-feature-band__media"
          initial={{ opacity: 0, y: 40, scale: 1.04 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="mixed-media-feature-band__primary">
            {renderMedia(primaryMedia, true)}
          </div>

          {insetMedia && (
            <motion.div
              className={`mixed-media-feature-band__inset ${mediaFirst ? 'is-right' : 'is-left'}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
            >
              {renderMedia(insetMedia)}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="mixed-media-feature-band__text"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
        >
          <div
            className="mixed-media-feature-band__card"
            style={{
              background: cardBg,
              border: cardBorder,
              boxShadow: cardShadow,
            }}
          >
            {eyebrow && (
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: textColor,
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                {eyebrow}
              </div>
            )}

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 76px)',
                lineHeight: 0.94,
                color: textColor,
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {title}
            </h2>

            {body && (
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-md)',
                  color: bodyColor,
                  lineHeight: 1.8,
                  fontWeight: 500,
                  marginTop: 24,
                }}
              >
                {body}
              </div>
            )}

            {stat && (
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: textColor,
                  fontWeight: 700,
                  marginTop: 24,
                }}
              >
                {stat}
              </div>
            )}

            {href && ctaLabel && (
              <Link
                href={href}
                style={{
                  display: 'inline-block',
                  marginTop: 28,
                  background: isDark ? '#FFC700' : '#000',
                  color: isDark ? '#000' : '#FFC700',
                  padding: '16px 28px',
                  borderRadius: 16,
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                  width: 'fit-content',
                }}
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .mixed-media-feature-band__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
          align-items: stretch;
          min-height: clamp(620px, 92svh, 960px);
        }

        .mixed-media-feature-band__grid.media-right {
          grid-template-columns: minmax(320px, 0.85fr) minmax(0, 1.15fr);
        }

        .mixed-media-feature-band__media {
          position: relative;
          min-height: 100%;
        }

        .mixed-media-feature-band__primary {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .mixed-media-feature-band__text {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(32px, 5vw, 72px);
          position: relative;
          z-index: 2;
        }

        .mixed-media-feature-band__card {
          width: min(100%, 520px);
          border-radius: 24px;
          padding: clamp(28px, 4vw, 44px);
          backdrop-filter: blur(18px);
        }

        .mixed-media-feature-band__inset {
          position: absolute;
          bottom: clamp(20px, 3vw, 40px);
          width: min(32vw, 390px);
          aspect-ratio: 4 / 5;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
          z-index: 3;
          background: #000;
        }

        .mixed-media-feature-band__inset.is-right {
          right: clamp(20px, 3vw, 40px);
        }

        .mixed-media-feature-band__inset.is-left {
          left: clamp(20px, 3vw, 40px);
        }

        @media (max-width: 900px) {
          .mixed-media-feature-band__grid,
          .mixed-media-feature-band__grid.media-right {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .mixed-media-feature-band__media {
            min-height: clamp(420px, 68svh, 640px);
          }

          .mixed-media-feature-band__text {
            padding: 20px 20px 40px;
          }

          .mixed-media-feature-band__card {
            width: 100%;
          }

          .mixed-media-feature-band__inset {
            width: min(52vw, 260px);
            bottom: 20px;
          }
        }

        @media (max-width: 640px) {
          .mixed-media-feature-band__media {
            min-height: clamp(360px, 56svh, 520px);
          }

          .mixed-media-feature-band__primary {
            position: relative;
            min-height: clamp(360px, 56svh, 520px);
          }

          .mixed-media-feature-band__inset {
            position: absolute;
            width: 38vw;
            min-width: 132px;
            max-width: 180px;
            border-radius: 18px;
          }

          .mixed-media-feature-band__text {
            padding: 16px 16px 32px;
          }

          .mixed-media-feature-band__card {
            border-radius: 20px;
            padding: 22px 18px;
          }
        }
      `}</style>
    </section>
  )
}
