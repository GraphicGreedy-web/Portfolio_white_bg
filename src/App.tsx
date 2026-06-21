import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import BrandDesigning from './pages/BrandDesigning';
import BrandDesignCard from './pages/BrandDesignCard';
import VisualCommunication from './pages/VisualCommunication';
import VisualCommunicationCard from './pages/VisualCommunicationCard';
import Videos from './pages/Videos';
import About from './pages/About';
import Contact from './pages/Contact';
import CMSLogin from './pages/CMSLogin';
import CMSDashboard from './pages/CMSDashboard';
import CMSManager from './pages/CMSManager';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main id="main-content">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/logo-designing" element={<BrandDesigning />} />
              <Route path="/logo-designing/:brandId/:slug?" element={<BrandDesignCard />} />
              <Route path="/visual-communication" element={<VisualCommunication />} />
              <Route path="/visual-communication/:visualId/:slug?" element={<VisualCommunicationCard />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cms/login" element={<CMSLogin />} />
              <Route path="/cms" element={<CMSDashboard />} />
              <Route path="/cms/manage/:type" element={<CMSManager />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
