import Navbar from '@/components/navbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className='container my-5'>{children}</main>
    </>

  );
}
