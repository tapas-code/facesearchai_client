import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Pricing from './pages/Pricing';
import Footer from './components/Footer';
import CursorFollow from './components/CursorFollow';
import Success from './pages/Success';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <CursorFollow />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<Success />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;