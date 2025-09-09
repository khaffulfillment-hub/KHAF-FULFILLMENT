// App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Industries from "./components/Industries";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PopupForm from "./components/PopupForm";
import Pricing from "./components/Pricing";
import { TeamSection } from "./components/TeamSection";

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div className="bg-background text-foreground min-h-screen"> 
      {/* ✅ Use Tailwind tokens */}
      <Header onOpenPopup={handleOpenPopup} />
      <main className="pt-20">
        <Hero />
        <About />
        <Services />
        <Industries />
        <Contact />
        <Pricing />
        <TeamSection />
      </main>
      <Footer />
      <PopupForm isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
}
