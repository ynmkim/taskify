import Link from 'next/link';

export default function Home() {
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
