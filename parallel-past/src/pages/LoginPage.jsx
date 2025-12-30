import React from 'react';
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-prussian flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-heading text-4xl sm:text-6xl text-white mb-6 tracking-widest uppercase">
            Coming Soon
          </h1>
          <div className="w-24 h-1 bg-gold/50 mx-auto mb-6"></div>
          <p className="font-body text-white/80 text-lg sm:text-xl max-w-lg mx-auto">
            We are working on bringing you a personalized museum experience.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
