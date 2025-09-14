import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Steps from '../components/Steps';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import useScrollAnimations from '../hooks/useScrollAnimations';

export default function Home() {
  useScrollAnimations();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Steps />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}