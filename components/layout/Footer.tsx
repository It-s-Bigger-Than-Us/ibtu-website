import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="foot-logo-img"
          src="https://static.wixstatic.com/media/a11c28_c704b654e72e4c769b26afe3dabe6384~mv2.png"
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
        <Link href="/about" style={{ color: "#fff" }}>About</Link>
        &nbsp;·&nbsp;
        <Link href="/our-programs" style={{ color: "#fff" }}>Programs</Link>
        &nbsp;·&nbsp;
        <Link href="/impact" style={{ color: "#fff" }}>Impact</Link>
        &nbsp;·&nbsp;
        <Link href="/awards" style={{ color: "#fff" }}>Awards</Link>
        &nbsp;·&nbsp;
        <Link href="/partners" style={{ color: "#fff" }}>Partners</Link>
        &nbsp;·&nbsp;
        <Link href="/get-involved" style={{ color: "#fff" }}>Get Involved</Link>
        &nbsp;·&nbsp;
        <Link href="/contact" style={{ color: "#fff" }}>Contact</Link>
      </div>

      <div className="foot-right">
        @itsbiggerthanus
        <br />
        info@itsbiggerthanusla.org
        <br />
        (323) 207-0221
      </div>
    </footer>
  );
}
