import React from 'react';
import europeicon from '../../assets/europe icon.png';
import asiaicon from '../../assets/asia icon.png';
import  middleeasticon from '../../assets/middleeast icon.png';

const RegionCards = () => {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
        
        {/* EUROPE CARD */}
        <div className="bg-white rounded-xl p-6 md:p-8 text-center border-4 border-prussian">
          <div className="w-20 h-20 mx-auto mb-6 bg-sage rounded-full border-4 border-prussian flex items-center justify-center">
            <img src={europeicon} alt="europe map icon" />
          </div>
          <h3 className="text-2xl font-heading text-prussian mb-4">
            EUROPE
          </h3>
          <p className="text-sm font-body text-prussian">
            Featuring a modified roundel, a gorget, a gauntlet from a jousting set, and a helmet. Both made with even and uniform steel with brass mounts.
          </p>
        </div>

        {/* ASIA CARD */}
        <div className="bg-white rounded-xl p-6 md:p-8 text-center border-4 border-prussian">
          <div className="w-20 h-20 mx-auto mb-6 bg-sage rounded-full border-4 border-prussian flex items-center justify-center">
            <img src={asiaicon} alt="asia map icon" />
          </div>
          <h3 className="text-2xl font-heading text-prussian mb-4">
            ASIA
          </h3>
          <p className="text-sm font-body text-prussian">
            Kabuto Helmet (c. 1455) - Feudal Japan Somani armor featuring a smell fest test (shikoro), and prominent ornamental fasteners (fukuragata).
          </p>
        </div>

        {/* MIDDLE EAST CARD */}
        <div className="bg-white rounded-xl p-6 md:p-8 text-center border-4 border-prussian">
          <div className="w-20 h-20 mx-auto mb-6 bg-sage rounded-full border-4 border-prussian flex items-center justify-center">
            <img src={middleeasticon} alt="middleeast map icon" />
          </div>
          <h3 className="text-2xl font-heading text-prussian mb-4">
            MIDDLE EAST
          </h3>
          <p className="text-sm font-body text-prussian">
            Turban Helmet (c. 1400) - Ottoman Empire - Steted steel with chimed areeted, designed to warn a turban featuring Arabic engraphy engravings.
          </p>
        </div>

      </div>
    </section>
  );
};

export default RegionCards;