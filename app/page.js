import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PopularCoins from './components/PopularCoins';
import ConversionTool from './components/ConversionTool';
import Footer from './components/Footer';
import PortfolioDashboard from './components/PortfolioDashboard';

export default function Home() {
  return (
    <div className='bg-white'>
      <Navbar />
      <HeroSection />
      <PortfolioDashboard />
      <PopularCoins />
      <ConversionTool />
      <Footer />
    </div>
  );
}
