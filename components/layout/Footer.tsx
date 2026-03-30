import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="foot-logo-img"
            src="/ibtu-logo.svg"
            alt="IBTU — It's Bigger Than Us"
          />
          <div className="foot-mantra">Community is the infrastructure.</div>
        </div>

        <div className="foot-center">
          Baldwin Hills Crenshaw Plaza, Suite 224-226
          <br />
          3650 W. Martin Luther King Jr. Blvd · Los Angeles, CA 90008
          <br />
          <br />
          501(c)(3) &nbsp;·&nbsp; EIN: 85-3136505
          <br />
          <br />
          <Link href="/about">About</Link>
          &nbsp;·&nbsp;
          <Link href="/our-programs">Programs</Link>
          &nbsp;·&nbsp;
          <Link href="/impact">Impact</Link>
          &nbsp;·&nbsp;
          <Link href="/get-involved">Get Involved</Link>
          &nbsp;·&nbsp;
          <Link href="/contact">Contact</Link>
        </div>

        <div className="foot-right">
          <a href="https://instagram.com/itsbiggerthanus" target="_blank" rel="noopener noreferrer">@itsbiggerthanus</a>
          <br />
          <a href="mailto:info@itsbiggerthanusla.org">info@itsbiggerthanusla.org</a>
          <br />
          <a href="tel:+13232070221">(323) 207-0221</a>
        </div>
      </div>
    </footer>
  );
}
