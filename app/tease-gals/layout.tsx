export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full pt-24">
        <div className="min-h-screen max-w-screen-2xl p-12 sm:mx-auto">{children}</div>
      </div>
    </>
  );
}
