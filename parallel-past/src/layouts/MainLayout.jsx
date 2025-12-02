//this component is like the frame of a picture,it will applt to all those pages like a outer wrapper.
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    // This div ensures the footer stays at the bottom even on short pages
    <div className="flex flex-col min-h-screen font-body bg-sage text-prussian">
      
      {/* Header Placeholder - We will replace this with the real Header later */}
      <header className="p-4 border-b-2 border-prussian bg-sage/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto font-heading font-bold text-xl text-center md:text-left">
          PARALLEL PAST (Header Placeholder)
        </div>
      </header>

      {/* the Main Content Area here  The pages will load here */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/*  the Footer */}
      <footer className="p-6 border-t-2 border-prussian text-center text-sm opacity-80">
        © {new Date().getFullYear()} Parallel Past KM Tech Studio. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;