import React from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Chatbot from './components/ui/Chatbot';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Skills from './sections/Skills';
import Portfolio from './sections/Portfolio';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Solutions from './sections/Solutions';
import Technology from './sections/Technology';
import Process from './sections/Process';
import Industries from './sections/Industries';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative text-gray-200">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Solutions />
        <Skills />
        <Technology />
        <Portfolio />
        <Process />
        <Industries />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
