//import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero.tsx'
import DefaultLayout from './layouts/DefaultLayout.tsx';
import Home from './pages/Home.tsx'

export default function App() {
  return (
    <DefaultLayout>
      <Hero />
    </DefaultLayout>
  );
}