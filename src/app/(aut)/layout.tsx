import Photo from "./_components/Photo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[1440px] h-[1024px] m-auto flex gap-[24px] justify-center items-center">
      {children}
      <Photo />
    </div>
  );
}
