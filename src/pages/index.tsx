import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';
import Points from '@/components/home/Points';
import Settings from '@/components/home/Settings';
import useCheckLogIn from '@/hooks/useCheckLogIn';

export default function Home() {
  useCheckLogIn();

  return (
    <div>
      <Header />
      <div>
        <Hero />
        <Points />
        <Settings />
      </div>
      <Footer />
    </div>
  );
}
