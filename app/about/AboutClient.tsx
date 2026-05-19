'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/* ─────────────────────────────────────────────────────────────
   IBTU About — Brand-Wide 26 port.
   Single client component containing every section, ported from
   /Users/mollymorrow/Downloads/brand-wide-26 2/project/about/*.
───────────────────────────────────────────────────────────── */

function useEnter(threshold = 0.2) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, shown] as const
}

function WordHeadline({
  lines,
  className = '',
  stagger = 0.08,
  autoStart = false,
  onComplete,
}: {
  lines: string[]
  className?: string
  stagger?: number
  autoStart?: boolean
  onComplete?: () => void
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const trigger = () => {
      const words = node.querySelectorAll<HTMLElement>('.word')
      let last = 0
      words.forEach((w, i) => {
        last = i * stagger * 1000
        setTimeout(() => w.classList.add('in'), last)
      })
      if (onComplete) setTimeout(onComplete, last + 600)
    }
    if (autoStart) {
      const t = setTimeout(trigger, 200)
      return () => clearTimeout(t)
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            trigger()
            io.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [autoStart, stagger, onComplete])
  return (
    <h1 className={`lot ${className}`} ref={ref} aria-label={lines.join(' ')}>
      {lines.map((ln, i) => (
        <span className="line" key={i}>
          {ln.split(' ').map((w, j) => (
            <span className="word" key={j}>
              {w}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}

/* =========================================================
   HERO
========================================================= */
function HeroSection() {
  const [subIn, setSubIn] = useState(false)
  return (
    <section id="hero" className="hero">
      <video
        className="hero-bg-video"
        src="/about/holo05-bg-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="foil-strip-top" />
      <div className="foil-bg-shimmer" />
      <div className="hero-grid">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/ibtu-trippy.png"
            alt="It's Bigger Than Us"
            style={{ display: 'block', width: 'min(560px, 70vw)', height: 'auto', margin: '0 auto 24px' }}
          />
          <div className="eyebrow">
            <span className="dash" />Founded 2020 — Los Angeles —
          </div>
          <WordHeadline
            lines={['WE LISTEN.', 'WE BUILD.', 'WE STAY.']}
            autoStart
            stagger={0.14}
            onComplete={() => setSubIn(true)}
          />
          <p className={`subhead ${subIn ? 'in' : ''}`}>
            Six years ago we showed up with index cards that asked one question.
            <br />
            <strong>What do you need?</strong> The answers built everything that came next.
          </p>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   GOLD RIBBON
========================================================= */
function GoldRibbon() {
  const phrases = [
    'Community is the infrastructure',
    'Designed with dignity',
    'We listen, we build, we stay',
  ]
  const doubled = [...phrases, ...phrases]
  return (
    <div className="ribbon" aria-hidden="true">
      <div className="track">
        {doubled.map((p, i) => (
          <span key={i} className="item">
            {p}
            <span className="tick" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* =========================================================
   PILLARS
========================================================= */
type Pillar = {
  id: string
  num: string
  name: string
  img: string
  imgBack: string
  body: string
  stats: { n: string; l: string }[]
}
const PILLAR_DATA: Pillar[] = [
  {
    id: 'crisis',
    num: '01',
    name: 'Crisis & Disaster Response',
    img: '/about/pillar-crisis.png',
    imgBack: '/about/pillar-back-1.png',
    body:
      'Rapid response, fire relief, permanent Hub. When systems fail, we activate within days and stay until families are stabilized.',
    stats: [
      { n: '5,000+', l: 'Families Stabilized' },
      { n: '$4.5M+', l: 'In-Kind Delivered' },
      { n: '10,000+', l: 'First-Responder Meals' },
      { n: '324', l: 'Active Hub Clients' },
    ],
  },
  {
    id: 'school',
    num: '02',
    name: 'School & Youth Stability',
    img: '/about/pillar-school.png',
    imgBack: '/about/pillar-back-2.png',
    body:
      'Year-round cohort programming across more than thirty schools and three districts. Student, parent, teacher, family — built for the whole system.',
    stats: [
      { n: '28,025', l: 'Students 2025' },
      { n: '34', l: 'Active Sites' },
      { n: '62,475+', l: 'All-Time Students' },
      { n: '22,550+', l: 'Backpacks Delivered' },
    ],
  },
  {
    id: 'community',
    num: '03',
    name: 'Community Health & Resource Access',
    img: '/about/pillar-community.png',
    imgBack: '/about/pillar-back-3.png',
    body:
      'Free food, free wellness, free clinical screenings — barrier-free, no ID, no paperwork gauntlet. Designed with dignity.',
    stats: [
      { n: '875,500+', l: 'lbs Food Distributed' },
      { n: '300+', l: 'Active Partners' },
      { n: '7,500+', l: 'Volunteers' },
      { n: '$18:$1', l: 'Leverage Ratio' },
    ],
  },
]

function PillarsSection() {
  const [open, setOpen] = useState<string | null>(null)
  const pillar = PILLAR_DATA.find((p) => p.id === open)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section id="pillars" className="pillars">
      <div className="head">
        <h2 className="lot">Three pillars. One community.</h2>
      </div>
      <div className="grid">
        {PILLAR_DATA.map((p) => (
          <div key={p.id} className="pillar-coin" onClick={() => setOpen(p.id)}>
            <div className="pflip">
              <div className="pface front">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.name} />
              </div>
              <div className="pface back">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.imgBack} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`pillar-overlay ${open ? 'open' : ''}`}>
        {pillar && (
          <>
            <div className="ovl-left">
              <button className="close" onClick={() => setOpen(null)} aria-label="Close">
                ✕
              </button>
              <div style={{ fontFamily: 'LOT', fontSize: 26, letterSpacing: '0.12em' }}>
                IMPACT PILLAR {pillar.num}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pillar.img} alt="" className="sticker-big" />
              <div
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                It&apos;s Bigger Than Us
              </div>
            </div>
            <div className="ovl-right">
              <div className="eyebrow">
                <span className="dash" />Pillar {pillar.num}
              </div>
              <h3 className="lot">{pillar.name}</h3>
              <p style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 560 }}>{pillar.body}</p>
              <div className="stats">
                {pillar.stats.map((s, i) => (
                  <div className="stat-tile" key={i}>
                    <div className="n">{s.n}</div>
                    <div className="l">{s.l}</div>
                  </div>
                ))}
              </div>
              <button
                className="btn btn--foil"
                onClick={() => setOpen(null)}
                style={{ background: undefined }}
              >
                See the full impact →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

/* =========================================================
   GO DEEPER — Mission as Holographic Trading Card
========================================================= */
function GoDeeperSection() {
  return (
    <section id="go-deeper" className="godeeper">
      <div className="head">
        <h2 className="lot">What we do.</h2>
      </div>
      <div className="mission-card">
        <div className="mc-inner">
          <div
            className="mc-left"
            style={{ width: 480, maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/ibtu-logo.svg"
              alt="IBTU"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div className="mc-right">
            <h4 className="lot" style={{ marginTop: 14 }}>
              Mission
            </h4>
            <p>
              IBTU builds trusted, place-based programs that support youth, families, and neighborhoods through
              education, health access, and crisis response — designed with dignity, informed by community, and
              built to last.
            </p>
            <h4 className="lot">Vision</h4>
            <p>
              A city where every family has barrier-free access to the resources, care, and community
              infrastructure they need to thrive — not just survive.
            </p>
            <div className="mc-stat-strip">
              <span className="mc-stat">EST. 2020</span>
              <span className="mc-stat">EIN 85-3136505</span>
              <span className="mc-stat">501(c)(3)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   HOW WE WORK — accordion
========================================================= */
type HwwItem = { num: string; name: string; body: string }
const HWW_ITEMS: HwwItem[] = [
  {
    num: '01',
    name: 'Place-based',
    body:
      "We don't drop in. We build in. The Hub at Baldwin Hills Crenshaw Plaza is permanent. School sites run year after year. Coastal Care returns to the same beaches. The location is the trust — and the trust is what makes the next layer of programming possible.",
  },
  {
    num: '02',
    name: 'Whole-system',
    body:
      'A student is never just a student. The family is the unit. At a school site, we build for students, teachers, parents, and the cohort together. At the Hub, we deliver case management, dental, vision, mental health, and Saturday wellness at one address. The system is the design target, not the symptom.',
  },
  {
    num: '03',
    name: 'Designed with dignity',
    body:
      "Every touchpoint feels like community, not charity. No paperwork gauntlets. No poverty voyeurism. HIPAA-compliant intake from the first visit. Verification-based delivery makes sure resources reach the people they're meant for — without making them prove they deserve it.",
  },
  {
    num: '04',
    name: 'We stay',
    body:
      "Most help shows up for the urgent and leaves before the recovery. We do the opposite. Five years in, every program we've built is still operating. The Hub is permanent. The school programs run year after year. The work that matters isn't the headline — it's the third visit, the sixth visit, the twenty-third visit.",
  },
]

function HowWeWorkAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: HwwItem
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentH, setContentH] = useState(0)
  useEffect(() => {
    if (!contentRef.current) return
    const el = contentRef.current
    const measure = () => setContentH(el.scrollHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const styles: Record<string, CSSProperties> = {
    item: {
      position: 'relative',
      border: '2px solid #000',
      borderRadius: 18,
      overflow: 'hidden',
      background: isOpen ? '#000' : '#FFC700',
      transition:
        'background .35s ease, transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s ease',
      boxShadow: isOpen
        ? '0 30px 60px -22px rgba(0,0,0,.45), 0 0 0 1px rgba(0,0,0,.04)'
        : '0 10px 24px -16px rgba(0,0,0,.25)',
      cursor: 'pointer',
      outline: 'none',
    },
    header: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center',
      gap: 'clamp(20px, 3vw, 48px)',
      padding: 'clamp(24px, 3.4vw, 44px) clamp(28px, 4vw, 56px)',
      color: isOpen ? '#FFC700' : '#000',
    },
    num: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 900,
      fontSize: 'clamp(14px, 1.1vw, 16px)',
      letterSpacing: '.24em',
      color: isOpen ? '#FFC700' : '#000',
      lineHeight: 1,
      width: 38,
    },
    name: {
      fontFamily: "'LOT','Bebas Neue', sans-serif",
      fontSize: 'clamp(40px, 5.4vw, 84px)',
      lineHeight: 0.95,
      letterSpacing: '-.01em',
      textTransform: 'uppercase',
      color: isOpen ? '#FFC700' : '#000',
      margin: 0,
      textWrap: 'balance',
    },
    toggle: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: isOpen ? '#FFC700' : '#000',
      color: isOpen ? '#000' : '#FFC700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'transform .4s cubic-bezier(.22,1,.36,1), background .35s ease, color .35s ease',
      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
    },
    bodyClip: {
      overflow: 'hidden',
      height: isOpen ? contentH : 0,
      transition: 'height .55s cubic-bezier(.22,1,.36,1)',
    },
    body: {
      padding: '0 clamp(28px, 4vw, 56px) clamp(28px, 3.6vw, 48px) clamp(28px, 4vw, 56px)',
      paddingLeft: 'calc(clamp(28px, 4vw, 56px) + 38px + clamp(20px, 3vw, 48px))',
      maxWidth: 1000,
    },
    bodyText: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: 'clamp(16px, 1.25vw, 19px)',
      lineHeight: 1.6,
      color: isOpen ? '#FFC700' : '#000',
      fontWeight: 500,
      margin: 0,
    },
  }
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      style={styles.item}
    >
      <div style={styles.header}>
        <span style={styles.num}>{item.num}</span>
        <h3 style={styles.name}>{item.name}</h3>
        <span style={styles.toggle} aria-hidden="true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </div>
      <div style={styles.bodyClip}>
        <div ref={contentRef} style={styles.body}>
          <p style={styles.bodyText}>{item.body}</p>
        </div>
      </div>
    </div>
  )
}

function HowWeWorkSection() {
  const [openIdx, setOpenIdx] = useState(-1)
  return (
    <section id="how-we-work" className="howwework">
      <video
        className="hww-bg-video"
        src="/about/holo01-bg-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hww-container">
        <header className="hww-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/howwework-trippy.png"
            alt="How we work"
            style={{ display: 'block', width: 'min(900px, 85%)', height: 'auto', margin: '0 auto 24px' }}
          />
          <p className="hww-lede">
            Four operating principles shape every program we run — place-based, whole-system, designed with
            dignity, and staying long enough to make trust compound.
          </p>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {HWW_ITEMS.map((item, i) => (
            <HowWeWorkAccordionItem
              key={item.num}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx((cur) => (cur === i ? -1 : i))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   PARTNERSHIP
========================================================= */
const SECTORS = ['Government', 'Corporations', 'Schools', 'Clinical', 'Brands', 'Faith', 'Donors']

function PartnershipSection() {
  const [ref, inView] = useEnter(0.2)
  return (
    <section id="partnership" className="partnership">
      <div className="head" ref={ref as React.RefObject<HTMLDivElement>}>
        <h2 className={`mega lot ${inView ? 'in' : ''}`}>
          <span className="word">
            <span>PARTNERSHIP</span>
          </span>
          <br />
          <span className="word">
            <span>IS OUR</span>
          </span>
          <br />
          <span className="word">
            <span>SUPERPOWER.</span>
          </span>
        </h2>
      </div>
      <div className="body-block">
        <p>
          Most nonprofits operate in lanes. Government is one lane, corporations are another, schools a third,
          clinical providers a fourth, brands a fifth, faith communities a sixth, families and individual donors
          a seventh. The lanes rarely cross. The walls between them are exactly where families fall through.
        </p>
        <p style={{ fontSize: 22, fontWeight: 800, margin: '24px 0' }}>
          We don&apos;t operate in lanes. We bridge them.
        </p>
        <p>
          On any given day at the Hub you&apos;ll find a Congressional aide doing a site walkthrough, a corporate
          brand team unloading product donations, a university-trained clinical team setting up a screening table,
          an LAUSD principal walking parents through after-school enrollment, a council district staffer dropping
          off constituent intake forms, and a small business owner asking how to host a partner activation.
          They&apos;re all in the same room, building the same thing. We&apos;re the connective tissue.
        </p>
      </div>
      <div className="sector-row">
        {SECTORS.map((s) => (
          <span key={s} className="sector-chip">
            {s}
          </span>
        ))}
      </div>
      <div className="body-block">
        <p>
          Federal recognition from the U.S. Congress sits alongside state recognition from the California
          Legislature, city recognition across Los Angeles council districts, county recognition from the LA
          County Board of Supervisors, university clinical alliances, and LAUSD contracts across seventeen
          campuses.
        </p>
        <p>
          Partnership for us isn&apos;t logo placement. It&apos;s role assignment. A corporate sponsor brings
          staff to the floor. A government office brings constituent visibility. A clinical provider brings
          licensed practitioners. A brand brings the cultural reach that gets the work covered in places
          nonprofits don&apos;t normally reach.
        </p>
      </div>
    </section>
  )
}

/* =========================================================
   BOARD
========================================================= */
type Member = {
  id: string
  photo: string
  name: string
  role: string
  bio: string[]
  initials: string
}
const BOARD: Member[] = [
  {
    id: 'keir',
    photo: '/about/board-cards/keir.png',
    name: 'Keir Wohlman',
    role: 'Owner, Travel With Keir',
    initials: 'KW',
    bio: [
      "Keir is an original founding board member of IBTU, having served since the organization's inception in 2020. A Los Angeles-based content creator, travel advisor, and event producer, she brings a blend of brand strategy, community building, and fundraising expertise to IBTU's leadership.",
      'Over six years she has raised hundreds of thousands of dollars, cultivated dozens of high-profile partnerships and donors, and played a pivotal role in expanding programming to Miami.',
    ],
  },
  {
    id: 'lorenzo',
    photo: '/about/board-cards/lorenzo.png',
    name: 'Lorenzo McCloud',
    role: 'Managing Partner, ECOS Group',
    initials: 'LM',
    bio: [
      'Lorenzo is a Los Angeles native with over a decade of experience in the sports industry as an NBA agent, business manager, and consultant. He is a co-founder of ECOS Group, a build-ops firm focused on enriching the business endeavors of its clients off the court.',
      'He has a deep commitment to fostering growth in the communities he was raised in and has been a mentor to many young athletes and youth.',
    ],
  },
  {
    id: 'asha',
    photo: '/about/board-cards/asha.png',
    name: "A'sha Roe",
    role: 'VP of Operations, gamma.',
    initials: 'AR',
    bio: [
      "A'sha brings a deep commitment to community and a passion for creating systems that allow people to thrive. As VP of Operations at gamma., she specializes in building operational infrastructure that transforms complexity into clarity.",
      "She is drawn to IBTU's mission because she believes in the power of neighbors lifting neighbors — that when one part of a community rises, everyone rises with it.",
    ],
  },
  {
    id: 'ursula',
    photo: '/about/board-cards/ursula.png',
    name: 'Ursula Moran',
    role: 'State & Local Government Affairs, Verizon',
    initials: 'UM',
    bio: [
      "Ursula Moran Bagley is Verizon's Government Affairs Director, leading strategic engagement across local government and communities in five Southern California counties. A pre-law graduate of UC Santa Barbara, she has built her telecommunications career since 2009 while serving on boards for business advocacy and nonprofit work.",
      'Raised in a military family and now a Hawthorne mother of two, Ursula brings a people-centered perspective grounded in connecting across diverse communities.',
    ],
  },
  {
    id: 'corey',
    photo: '/about/board-cards/corey.png',
    name: 'Corey Favor',
    role: 'President & CEO, King Arts Complex',
    initials: 'CF',
    bio: [
      'Corey is a dynamic executive with more than two decades of leadership experience spanning the arts, nonprofit, and private sectors. Known for building inclusive creative ecosystems and leading equity-centered initiatives.',
      "He currently serves as President and CEO of The King Arts Complex in Columbus, Ohio, where he focuses on honoring the institution's historic legacy while advancing a forward-looking vision.",
    ],
  },
  {
    id: 'butta',
    photo: '/about/board-cards/butta.png',
    name: 'Alrick Augustine',
    role: 'CEO, Keep It Run Hundred',
    initials: 'AA',
    bio: [
      "Alrick — known as Butta — is South Central Los Angeles through and through. Through real community service, hands-on advocacy, and showing up when it matters, he's built more than a reputation — he's built trust.",
      "As a marathon runner and founder of Keep It Run Hundred, he turns miles into motivation. Off the pavement, he's the co-creator of W.R.O.K. (We Raise Our Kids) and a recognized leader by Nike, Foot Locker, and the City of Los Angeles.",
    ],
  },
  {
    id: 'shawna',
    photo: '/about/board-cards/shawna.png',
    name: 'Dr. Shawna Charles',
    role: 'CEO, Charles Communication Group',
    initials: 'SC',
    bio: [
      'Dr. Shawna Charles is a communications executive and founder of Charles Communication Group. With advanced degrees in International Business Administration and Clinical Psychology, she brings a distinctive blend of strategic expertise and innovative thinking to community engagement, brand management, and crisis communications.',
      'Her contributions have been recognized by the City of Los Angeles and the University of Southern California.',
    ],
  },
]

const BASE_ROT = [-5, 4, -3, 5, -2, 3, -4]
const EASING = 'cubic-bezier(.22,1,.36,1)'
const DURATION = 320

function BoardCard({ member, selected }: { member: Member; selected: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ mx: 50, my: 50 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!cardRef.current) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    setTilt({
      mx: ((e.clientX - r.left) / r.width) * 100,
      my: ((e.clientY - r.top) / r.height) * 100,
    })
  }

  const holder: CSSProperties = {
    perspective: 1600,
    width: '100%',
    aspectRatio: '2.5 / 3.5',
    position: 'relative',
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(40px)',
    transition: 'opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)',
  }
  const card: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform .7s cubic-bezier(.7,0,.3,1)',
    transform: `rotateY(${selected ? 180 : 0}deg)`,
    cursor: 'pointer',
    willChange: 'transform',
  }
  const face: CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 18,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    boxShadow:
      hovered || selected
        ? '0 40px 80px -20px rgba(0,0,0,.8), 0 0 40px rgba(255,228,214,.5), 0 0 80px rgba(212,240,248,.3)'
        : '0 24px 48px -16px rgba(0,0,0,.6)',
    transition: 'box-shadow .4s ease',
  }
  const backFace: CSSProperties = { ...face, transform: 'rotateY(180deg)' }

  return (
    <div
      style={holder}
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setTilt({ mx: 50, my: 50 })
      }}
      onMouseMove={onMove}
    >
      <div style={card}>
        {/* FRONT */}
        <div style={{ ...face, background: 'transparent', boxShadow: 'none', borderRadius: 0, overflow: 'visible' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={member.photo}
            alt={member.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
              pointerEvents: 'none',
              filter: hovered
                ? 'drop-shadow(0 30px 50px rgba(0,0,0,.55)) drop-shadow(0 0 30px rgba(255,228,214,.35))'
                : 'drop-shadow(0 20px 32px rgba(0,0,0,.45))',
              transition: 'filter .4s ease',
            }}
          />
        </div>

        {/* BACK */}
        <div style={backFace}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('/about/board-card-back-bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 8,
              borderRadius: 12,
              overflow: 'hidden',
              background: '#FFC700',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* TOP yellow band */}
            <div
              style={{
                padding: '4px 8px',
                background: '#FFC700',
                border: '1px solid #000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                textAlign: 'center',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/ibtu-logo.svg" alt="IBTU" style={{ height: 18, width: 'auto', display: 'block' }} />
              <span
                style={{
                  fontFamily: "'LOT','Bebas Neue',sans-serif",
                  fontSize: 'clamp(9px,1vw,12px)',
                  color: '#000',
                  fontWeight: 700,
                  letterSpacing: '.04em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  textAlign: 'center',
                }}
              >
                It&apos;s Bigger Than Us
              </span>
            </div>
            {/* MIDDLE iridescent bg */}
            <div
              style={{
                flex: 1,
                position: 'relative',
                padding: '7px 10px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                backgroundImage: "url('/about/board-card-back-bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,.18)', pointerEvents: 'none' }} />
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    overflow: 'hidden',
                    fontFamily: 'Poppins,sans-serif',
                    fontSize: 13,
                    lineHeight: 1.3,
                    color: '#000',
                    fontWeight: 600,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  {member.bio.map((p, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : '4px 0 0' }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            {/* BOTTOM yellow band */}
            <div
              style={{
                padding: '5px 10px',
                background: '#FFC700',
                border: '1px solid #000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                minHeight: 30,
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  fontFamily: "'LOT','Bebas Neue',sans-serif",
                  fontSize: 'clamp(12px,1.35vw,15px)',
                  lineHeight: 0.95,
                  letterSpacing: '-.005em',
                  textTransform: 'uppercase',
                  color: '#000',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontFamily: 'Poppins,sans-serif',
                  fontSize: 7.5,
                  fontWeight: 800,
                  letterSpacing: '.13em',
                  textTransform: 'uppercase',
                  color: '#000',
                  margin: '2px 0 0',
                }}
              >
                {member.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BoardSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef(new Map<string, HTMLDivElement>())

  useEffect(() => {
    if (!selectedId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId])

  const computeStyle = (id: string, idx: number): CSSProperties => {
    const baseRot = BASE_ROT[idx % BASE_ROT.length]
    const activeId = selectedId || hoveredId

    if (id === activeId) {
      if (selectedId === id) {
        let tx = 0
        const cardEl = cardRefs.current.get(id)
        const container = containerRef.current
        if (cardEl && container) {
          const cr = container.getBoundingClientRect()
          const kr = cardEl.getBoundingClientRect()
          tx = cr.left + cr.width / 2 - (kr.left + kr.width / 2)
        }
        return {
          transform: `translateX(${tx}px) scale(1.35) rotate(0deg)`,
          zIndex: 50,
          position: 'relative',
          filter: 'drop-shadow(0 0 14px rgba(255,199,0,.6)) drop-shadow(0 16px 26px rgba(0,0,0,.45))',
        }
      }
      return {
        transform: 'translateY(-8px) scale(1.2) rotate(0deg)',
        zIndex: 30,
        position: 'relative',
        filter: 'drop-shadow(0 0 10px rgba(255,199,0,.55)) drop-shadow(0 8px 14px rgba(0,0,0,.4))',
      }
    }
    if (activeId) {
      const cardEl = cardRefs.current.get(id)
      const activeEl = cardRefs.current.get(activeId)
      if (cardEl && activeEl) {
        const cr = cardEl.getBoundingClientRect()
        const ar = activeEl.getBoundingClientRect()
        const dx = cr.left + cr.width / 2 - (ar.left + ar.width / 2)
        const dy = cr.top + cr.height / 2 - (ar.top + ar.height / 2)
        const len = Math.hypot(dx, dy) || 1
        const ndx = dx / len
        const ndy = dy / len
        const extraRot = dx > 0 ? 6 : -6
        return {
          transform: `translate(${ndx * 90}px, ${ndy * 90}px) scale(1.13) rotate(${baseRot + extraRot}deg)`,
          opacity: selectedId ? 0.2 : 1,
          pointerEvents: selectedId ? 'none' : 'auto',
          position: 'relative',
        }
      }
    }
    return { transform: `scale(1.13) rotate(${baseRot}deg)`, position: 'relative' }
  }

  return (
    <section id="board" className="board">
      <div className="head">
        <h2 className="lot">Meet our Board</h2>
      </div>
      <p className="sub">
        Tap a card to read the full bio. Seven leaders across the sectors our work depends on — community
        organizing, education, public health, government affairs, philanthropy, and the arts. They back this
        work with experience, networks, and time.
      </p>
      <div
        ref={containerRef}
        className="grid"
        onMouseLeave={() => setHoveredId(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedId(null)
        }}
        style={{ position: 'relative' }}
      >
        {BOARD.map((m, i) => {
          const isSelected = selectedId === m.id
          return (
            <div
              key={m.id}
              ref={(el) => {
                if (el) cardRefs.current.set(m.id, el)
                else cardRefs.current.delete(m.id)
              }}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`${m.name}, ${m.role}. Click for full bio.`}
              onMouseEnter={() => !selectedId && setHoveredId(m.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedId((prev) => (prev === m.id ? null : m.id))
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedId((prev) => (prev === m.id ? null : m.id))
                } else if (e.key === 'Escape') {
                  setSelectedId(null)
                }
              }}
              style={{
                transition: `transform ${DURATION}ms ${EASING}, opacity ${DURATION}ms ease, filter ${DURATION}ms ease`,
                transformOrigin: 'center center',
                willChange: 'transform, opacity, filter',
                outline: 'none',
                ...computeStyle(m.id, i),
              }}
            >
              <BoardCard member={m} selected={isSelected} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* =========================================================
   OUR JOURNEY — vertical timeline
========================================================= */
type JourneyStep = {
  id: string
  year?: number
  side: 'left' | 'right'
  title: string
  frontTitle?: ReactNode
  body: string
  stat?: string
}
const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: '01',
    year: 2020,
    side: 'left',
    title: 'WHAT DO YOU ACTUALLY NEED?',
    body:
      "It's Bigger Than Us is founded in Los Angeles in 2020 during the COVID-19 pandemic and civil unrest. Tyrone Nance wants to move from screaming and marching in the streets to executing actual change. On Western Ave, a small group of friends print index cards and walk door-to-door asking one question. An Instagram support group for Black men turns into a crowdfund that raises $10,000 in five days. Tyrone and ten Crenshaw High classmates hand out fully loaded backpacks to Crenshaw students and donate the remaining $5,000 directly to the school. The first proof that listening could move money.",
  },
  {
    id: '02',
    year: 2021,
    side: 'right',
    title: 'SAME PLACE, SAME HANDS, SAME WEEK.',
    body:
      'The Weekly Food Distribution Network launches. What was one-off becomes consistent — same place, same hands, same week — and the rhythm becomes the foundation everything else gets built on. By the end of the year, more than 33,000 families have been served annually.',
    stat: '33,000+ FAMILIES · WEEKLY DISTRIBUTIONS',
  },
  {
    id: '03',
    year: 2022,
    side: 'left',
    title: 'FIVE THOUSAND PEOPLE, ONE DAY.',
    body:
      'The 3rd Annual Back 2 School Festival lands at Baldwin Hills Crenshaw Plaza — and crosses 5,000 attendees in a single day. 5,000 Adidas backpacks are distributed. A job fair runs with 80+ vendors. A health fair runs alongside. LAUSD schools attend for the first time, opening the door to the school-based programming that scales over the next four years. This is the day Back 2 School stops being a single distribution and becomes the model.',
    stat: '5,000 ATTENDEES · 5,000 BACKPACKS · 80+ VENDORS',
  },
  {
    id: '04',
    year: 2023,
    side: 'right',
    title: 'THE WORK GETS AN ADDRESS.',
    body:
      "IBTU opens its first permanent headquarters in Leimert Park. The school program scales to eight LAUSD sites, serving 9,800 students. Peak food year — 54,000 families, 410,000 pounds of food distributed. The 4th Annual Back 2 School Festival returns to Leimert Park. The City of Los Angeles signs IBTU's first Full City Council Recognition (CD8). Supervisor Holly Mitchell presents the Bridge Builder Award.",
    stat: '8 SCHOOLS · 9,800 STUDENTS · 410,000 LBS FOOD',
  },
  {
    id: '05',
    year: 2024,
    side: 'left',
    title: 'MIAMI, THE COAST, AND THE BRANDS.',
    body:
      'The work crosses state lines. Multistate expansion to Miami with Baby2Baby — 498,075 items distributed. Coastal Care launches — monthly community clean-ups along the Pacific. 14,150 students served across the school program. Top 100 California Nonprofit. Corporate partnerships deepen with lululemon and Baby2Baby. Institutional health partnerships open with Charles Drew University and USC All of Us.',
  },
  {
    id: '06',
    year: 2025,
    side: 'right',
    title: 'PACIFIC PALISADES + EATON.',
    body:
      'January 7–8: the Palisades and Eaton fires displace thousands of Los Angeles families overnight. IBTU mobilizes within 72 hours. The infrastructure built over five years — partner network, volunteer base, weekly operations cadence — gets stress-tested in real time, and holds. 5,000+ families stabilized. 3,500+ volunteers activated across all relief phases. 15,000+ meals served. $4.5M in-kind value mobilized.',
    stat: '5,000+ FAMILIES · $4.5M IN-KIND · 72-HOUR MOBILIZATION',
  },
  {
    id: '07',
    side: 'left',
    title: 'FROM LEIMERT PARK TO BALDWIN HILLS.',
    body:
      'Within ninety days of the fires, IBTU upgrades from the Leimert Park headquarters to a new permanent Hub at Baldwin Hills Crenshaw Plaza — the operational center for fire relief and long-term recovery. HIPAA-compliant case management from the first visit. Verification-based delivery instead of a paperwork gauntlet. The Hub serves 324 active clients across 7,581 assistance instances — 23.4 visits per client average.',
    stat: '324 CLIENTS · 7,581 INSTANCES · 23.4 AVG VISITS',
  },
  {
    id: '08',
    side: 'right',
    title: 'MORE STUDENTS THAN ALL PRIOR YEARS COMBINED.',
    body:
      'Students served across 34 school sites in a single year — more than every previous year added together. The Alliance Charter partnership expands to 25 campuses with a $1.9M Sol de Janeiro distribution. The US Congress presents IBTU with the Inaugural Changemaker Award. Jennifer Hudson features Molly and Tyrone for the wildfire response. 75+ media placements. 2.47M Instagram reach.',
    stat: '34 SCHOOLS · 2.47M REACH',
  },
  {
    id: '09',
    year: 2026,
    side: 'left',
    title: 'COMMUNITY IS THE INFRASTRUCTURE.',
    frontTitle: (
      <>
        COMMUNITY IS THE
        <br />
        INFRA-
        <br />
        STRUCTURE.
      </>
    ),
    body:
      "Six years from index cards on Western Ave to a permanent Hub serving hundreds of clients a week. The 7th Annual Back 2 School Festival expands to five cities. Three pillars, more than thirty school sites across three districts, hundreds of partners. We don't drop in. We build in.",
  },
]

function YearMarker({ year }: { year: number }) {
  const [ref, shown] = useEnter(0.4)
  return (
    <div className={`tl-year ${shown ? 'in' : ''}`} ref={ref as React.RefObject<HTMLDivElement>} aria-hidden="true">
      <span className="tl-year-num lot">{year}</span>
    </div>
  )
}

function TimelineStep({ step, index }: { step: JourneyStep; index: number }) {
  const [enterRef, entered] = useEnter(0.18)
  const [flipped, setFlipped] = useState(false)
  return (
    <div className={`tl-row tl-row--${step.side}`}>
      <div className="tl-dot" aria-hidden="true" />
      <div
        className={`tl-holder ${entered ? 'in' : ''}`}
        ref={enterRef as React.RefObject<HTMLDivElement>}
        style={{ transitionDelay: entered ? `${index * 0.05}s` : '0s' }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={`tl-card ${flipped ? 'is-flipped' : ''}`}>
          <article className="tl-face tl-face--front">
            <h3 className="tl-title-front lot">{step.frontTitle || step.title}</h3>
          </article>
          <article className="tl-face tl-face--back">
            <div className="tl-back-inner">
              <h3 className="tl-title-back lot">{step.title}</h3>
              <p className="tl-body">{step.body}</p>
              {step.stat ? <div className="tl-stat">{step.stat}</div> : null}
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

function OurJourneySection() {
  const [headRef, headInView] = useEnter(0.2)
  const items: ReactNode[] = []
  let prevYear: number | null = null
  JOURNEY_STEPS.forEach((s, i) => {
    if (s.year && s.year !== prevYear) {
      items.push(<YearMarker key={`y-${s.year}`} year={s.year} />)
      prevYear = s.year
    }
    items.push(<TimelineStep key={s.id} step={s} index={i} />)
  })

  return (
    <section id="our-journey" className="our-journey">
      <div className="oj-bg" aria-hidden="true" />
      <div className="oj-container">
        <header className="oj-head" ref={headRef as React.RefObject<HTMLElement>}>
          <h2 className={`oj-title lot ${headInView ? 'in' : ''}`}>
            <span className="word">
              <span>OUR JOURNEY.</span>
            </span>
          </h2>
          <p className="oj-lede">
            Six years. One operating word — place-based. From index cards on Western Ave to a permanent Hub at
            Baldwin Hills Crenshaw Plaza, 34 school sites, and a fire response that held because the
            infrastructure was already there.
          </p>
        </header>
        <div className="oj-spine-wrap">
          <div className="oj-spine" aria-hidden="true" />
          <div className="oj-rows">{items}</div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   CLOSING
========================================================= */
function ClosingSection() {
  return (
    <section id="closing" className="closing">
      <video
        className="closing-bg-video"
        src="/about/holo04-bg-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="foil-bg-shimmer" />
      <div className="inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about/community-is-infrastructure.png"
          alt="Community is the infrastructure."
          style={{ display: 'block', width: 'min(960px, 90%)', height: 'auto', margin: '0 auto' }}
        />
        <p className="sub">Six years in. Still listening. Still building.</p>
        <div className="ctas">
          <a className="btn" href="#partnership">
            Find your role →
          </a>
          <a className="btn btn--foil" href="/get-involved">
            Become a sponsor →
          </a>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   APP
========================================================= */
export default function AboutClient() {
  return (
    <div className="about-v2">
      <HeroSection />
      <GoldRibbon />
      <PillarsSection />
      <GoDeeperSection />
      <HowWeWorkSection />
      <PartnershipSection />
      <BoardSection />
      <OurJourneySection />
      <ClosingSection />
    </div>
  )
}
