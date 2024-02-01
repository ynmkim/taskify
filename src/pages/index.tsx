import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';
import Point from '@/components/home/Point';
import Settings from '@/components/home/Settings';

export default function Home() {
  return (
    <div>
      <Header />
      <div>
        <Hero />
        <Point />
        <Settings />
      </div>
      <Footer />
    </div>
  );
}
