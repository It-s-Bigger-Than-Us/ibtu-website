export const metadata = {
  title: "IBTU Studio",
  description: "Content management for ibtu.la",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ margin: 0, height: "100vh" }}>{children}</div>;
}
