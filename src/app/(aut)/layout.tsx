import Headers from "./Headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="w-[10vw] h-screen bg-blue-400"></div>
      <div>
        <Headers />
        {children}
      </div>
    </div>
  );
}
