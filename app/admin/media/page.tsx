import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";

interface SanityAsset {
  _id: string;
  url: string;
  originalFilename: string;
  _createdAt: string;
}

async function getAllImageAssets(): Promise<SanityAsset[]> {
  return client.fetch(
    `*[_type == "sanity.imageAsset"] | order(_createdAt desc) { _id, url, originalFilename, _createdAt }`
  );
}

export default async function AdminMediaPage() {
  const assets = await getAllImageAssets();

  return (
    <>
      <Nav />
      <main
        style={{
          background: "#000",
          minHeight: "100vh",
          paddingRight: "var(--nav-w)",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Header */}
        <section
          style={{
            padding: "120px 80px 40px 80px",
            borderBottom: "1px solid rgba(255,199,0,0.15)",
          }}
        >
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              color: "#fff",
              lineHeight: 0.92,
              marginBottom: 16,
            }}
          >
            MEDIA LIBRARY
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 8,
            }}
          >
            {assets.length} image{assets.length !== 1 ? "s" : ""} in Sanity
          </p>
        </section>

        {/* Grid */}
        <section style={{ padding: "40px 80px 120px 80px" }}>
          {assets.length === 0 ? (
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>
              No image assets found in Sanity.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 20,
              }}
            >
              {assets.map((asset) => {
                const studioUrl = `https://0m4ngfcw.sanity.studio/structure/media;all;${asset._id}`;
                const createdDate = new Date(asset._createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <div
                    key={asset._id}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,199,0,0.1)",
                      borderRadius: 6,
                      overflow: "hidden",
                      transition: "border-color 0.2s",
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "100%",
                        background: "#111",
                        overflow: "hidden",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${asset.url}?w=400&h=400&fit=crop`}
                        alt={asset.originalFilename || "Sanity asset"}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div style={{ padding: "14px 16px" }}>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#fff",
                          fontWeight: 600,
                          marginBottom: 4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={asset.originalFilename}
                      >
                        {asset.originalFilename || "Untitled"}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.35)",
                          marginBottom: 10,
                        }}
                      >
                        {createdDate}
                      </div>
                      <a
                        href={studioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: "#FFC700",
                          textDecoration: "none",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Open in Studio →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
