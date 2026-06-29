import Footer from "@/components/layout/Footer";

/**
 * Minimal, dependency-free renderer for IBTU legal pages (Privacy, Terms).
 * Server component. Parses a small markdown subset: "## " headings,
 * "- " bullet lists, **bold**, and paragraphs. Brand: black bg, gold accents,
 * white Poppins body — never gold text on white.
 */

function renderInline(text: string, keyBase: string) {
  const parts = text.split("**");
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={`${keyBase}-${i}`} style={{ fontWeight: 700, color: "#fff" }}>
        {part}
      </strong>
    ) : (
      <span key={`${keyBase}-${i}`}>{part}</span>
    )
  );
}

type LegalDocProps = {
  eyebrow: string;
  title: string;
  effective: string;
  content: string;
};

export default function LegalDoc({ eyebrow, title, effective, content }: LegalDocProps) {
  const blocks = content.trim().split(/\n\s*\n/);

  return (
    <>
      <main style={{ background: "#000", minHeight: "100vh" }}>
        {/* Hero */}
        <div style={{ padding: "clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px) clamp(36px, 5vw, 56px)" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 20,
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 8vw, 120px)",
              lineHeight: 0.9,
              color: "#fff",
              margin: "0 0 18px",
              textTransform: "uppercase",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 13,
              letterSpacing: "1px",
              color: "var(--gold)",
              fontFamily: "var(--font-poppins)",
              fontWeight: 600,
              margin: 0,
            }}
          >
            {effective}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "0 clamp(24px, 5vw, 80px) clamp(60px, 8vw, 100px)", maxWidth: 880 }}>
          {blocks.map((block, bi) => {
            const lines = block.split("\n");
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={bi}
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 800,
                    fontSize: "clamp(20px, 2.4vw, 28px)",
                    color: "var(--gold)",
                    margin: "44px 0 14px",
                    lineHeight: 1.2,
                  }}
                >
                  {renderInline(block.replace(/^##\s+/, ""), `h-${bi}`)}
                </h2>
              );
            }
            if (lines.every((l) => l.trim().startsWith("- "))) {
              return (
                <ul
                  key={bi}
                  style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {lines.map((l, li) => (
                    <li
                      key={li}
                      style={{
                        position: "relative",
                        paddingLeft: 22,
                        color: "#fff",
                        fontFamily: "var(--font-poppins)",
                        fontSize: 16,
                        lineHeight: 1.7,
                      }}
                    >
                      <span style={{ position: "absolute", left: 0, color: "var(--gold)", fontWeight: 700 }}>—</span>
                      {renderInline(l.replace(/^\s*-\s+/, ""), `li-${bi}-${li}`)}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={bi}
                style={{ color: "#fff", fontFamily: "var(--font-poppins)", fontSize: 16, lineHeight: 1.8, margin: "0 0 16px" }}
              >
                {renderInline(lines.join(" "), `p-${bi}`)}
              </p>
            );
          })}
        </div>

        {/* Legal strip */}
        <div style={{ padding: "40px 80px", borderTop: "1px solid var(--gold)", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "1px", fontFamily: "var(--font-poppins)", margin: 0 }}>
            501(c)(3) &nbsp;|&nbsp; EIN: 85-3136505 &nbsp;|&nbsp; Los Angeles, CA
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
