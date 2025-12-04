import Header from '../components/Header';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-sage">
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-4xl font-heading text-prussian mb-4">Dashboard</h2>
        <p className="text-prussian font-body">This is where your tri-view grid will go in Week 2</p>
      </main>
    </div>
  );
};

export default DashboardPage;