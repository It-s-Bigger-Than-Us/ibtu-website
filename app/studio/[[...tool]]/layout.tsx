export const metadata = {
  title: "IBTU Studio",
  description: "Content management for ibtu.la",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
