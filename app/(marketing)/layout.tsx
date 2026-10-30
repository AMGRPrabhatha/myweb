import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { db } from '@/lib/db';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await db.getSettings();

  return (
    <div id="top" className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 bg-white">{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton number={settings.whatsappNumber} />
    </div>
  );
}
