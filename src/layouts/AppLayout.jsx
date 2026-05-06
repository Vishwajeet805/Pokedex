export default function AppLayout({ children }) {
  return (
    <main className="min-h-screen bg-void bg-radar-grid text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-10">{children}</div>
    </main>
  );
}
