import React from 'react';
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-sage flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 flex items-center justify-center">
        {/* Central Card Container */}
        <div className="w-full max-w-[600px] bg-[#F9F8F4] shadow-xl p-8 sm:p-12 md:p-16 relative">
          
          {/* Decorative Corner Borders (Optional elegant touch) */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold/30"></div>
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/30"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/30"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold/30"></div>

          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl sm:text-4xl text-prussian mb-4">
              Get in Touch
            </h1>
            <div className="w-12 h-px bg-gold/30 mx-auto mb-6"></div>
            <p className="font-body text-gold/80 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              Have a suggestion for an era or artifact? We would love to hear from you.
            </p>
          </div>

          <form className="space-y-8">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gold/60 font-body">
                Name
              </label>
              <input 
                type="text" 
                id="name"
                className="w-full bg-transparent border-b border-gold/30 py-2 font-heading text-gold focus:outline-none focus:border-prussian transition-colors placeholder-gold/30"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gold/60 font-body">
                Email
              </label>
              <input 
                type="email" 
                id="email"
                className="w-full bg-transparent border-b border-gold/30 py-2 font-heading text-gold focus:outline-none focus:border-prussian transition-colors placeholder-gold/30"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gold/60 font-body">
                Message
              </label>
              <textarea 
                id="message"
                rows="4"
                className="w-full bg-transparent border-b border-gold/30 py-2 font-heading text-gold focus:outline-none focus:border-prussian transition-colors placeholder-gold/30 resize-none"
                placeholder="How can we help?"
              ></textarea>
            </div>

            <div className="pt-4 text-center">
              <button 
                type="submit"
                className="px-8 py-3 border border-prussian text-prussian font-heading text-sm tracking-widest hover:bg-prussian hover:text-white transition-all duration-300 uppercase"
              >
                Send Message
              </button>
            </div>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
