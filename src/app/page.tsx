"use client";

import { useState, useEffect } from "react";
import { RouterProvider, useRouter } from "@/components/nvision/router";
import { ThemeProvider } from "@/components/nvision/ThemeProvider";
import { SoundProvider } from "@/components/nvision/SoundProvider";
import { useLenis } from "@/components/nvision/useLenis";
import FlyingCodeBackground from "@/components/nvision/FlyingCodeBackground";
import CustomCursor from "@/components/nvision/CustomCursor";
import Loader from "@/components/nvision/Loader";
import Navbar from "@/components/nvision/Navbar";
import Footer from "@/components/nvision/Footer";
import SoundToggle from "@/components/nvision/SoundToggle";
import SoundBridge from "@/components/nvision/SoundBridge";
import KonamiEasterEgg from "@/components/nvision/KonamiEasterEgg";
import HomePage from "@/components/nvision/pages/HomePage";
import AboutPage from "@/components/nvision/pages/AboutPage";
import ServicesPage from "@/components/nvision/pages/ServicesPage";
import PortfolioPage from "@/components/nvision/pages/PortfolioPage";
import CaseStudyPage from "@/components/nvision/pages/CaseStudyPage";
import ProcessPage from "@/components/nvision/pages/ProcessPage";
import TestimonialsPage from "@/components/nvision/pages/TestimonialsPage";
import BlogPage from "@/components/nvision/pages/BlogPage";
import ContactPage from "@/components/nvision/pages/ContactPage";
import NotFoundPage from "@/components/nvision/pages/NotFoundPage";
import { PrivacyPage, TermsPage } from "@/components/nvision/pages/LegalPages";

function PageRouter() {
  const { page, navKey } = useRouter();
  useLenis(true);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "about": return <AboutPage />;
      case "services": return <ServicesPage />;
      case "portfolio": return <PortfolioPage />;
      case "case-study": return <CaseStudyPage />;
      case "process": return <ProcessPage />;
      case "testimonials": return <TestimonialsPage />;
      case "blog": return <BlogPage />;
      case "contact": return <ContactPage />;
      case "404": return <NotFoundPage />;
      case "privacy": return <PrivacyPage />;
      case "terms": return <TermsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <main key={navKey} className="relative z-10 flex-1">
      {renderPage()}
    </main>
  );
}

function Shell() {
  return (
    <>
      <FlyingCodeBackground />
      <div className="noise-overlay" />
      <CustomCursor />
      <SoundBridge />
      <Navbar />
      <PageRouter />
      <Footer />
      <SoundToggle />
      <KonamiEasterEgg />
    </>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loaded]);

  return (
    <ThemeProvider>
      <SoundProvider>
        <RouterProvider>
          <Loader onComplete={() => setLoaded(true)} />
          <div className="relative min-h-screen-flex flex flex-col" style={{ position: "relative" }}>
            <Shell />
          </div>
        </RouterProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}
