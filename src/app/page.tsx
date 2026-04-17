import Navbar from '../components/layout/Navbar';
import Herosection from '../components/home/HeroSection/Herosection';
import Aboutsection from '../components/home/AboutSection/Aboutsection';
import Ministrycards from '../components/home/MinistryCards/Ministrycards';
import Musicsection from '../components/home/MusicSection/Musicsection';
import Youthsection from '../components/home/YouthSection/Youthsection';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Herosection />
      <Aboutsection />
      <Ministrycards />
      <Musicsection />
      <Youthsection />
      <Footer />
    </>
  );
}
