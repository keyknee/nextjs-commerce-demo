export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">
        <div className="max-w-screen-2xl py-20 sm:mx-auto">{children}</div>
      </div>
    </>
  );
}
