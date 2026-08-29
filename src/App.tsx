import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero/Hero.tsx'
import Cursor from './components/Cursor/Cursor.tsx';
import DefaultLayout from './layouts/DefaultLayout.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About/About.tsx';
import Contact from './pages/Contact/Contact.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';


export default function App() {
  return (
    <DefaultLayout>
      <Hero />
      <Cursor />
      
      <Routes> 
        <Route path="/" element={<Home />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes> 
    </DefaultLayout>
  );
}