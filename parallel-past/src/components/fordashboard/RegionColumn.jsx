import React from 'react';
import ArtifactCard from './ArtifactCard';

// Column that represents a single region (Europe, Asia, Middle East).
//
// Props:
// - regionName: label shown in the header at the top of the column
// - armorArtifact: data for the top row (armor-related object)
// - weaponArtifact: data for the bottom row (sword / weapon object)
//
// This component stays simple on purpose: it now focuses purely on Armor.
const RegionColumn = ({ regionName, armorArtifact }) => {
  // CRITICAL NULL CHECK: Prevent "Cannot read properties of null" crash
  if (!armorArtifact) {
    return (
      <div className="flex flex-col gap-4 h-full">
        <div className="text-center border-b-2 border-prussian pb-2 mb-2">
          <h3 className="font-heading text-prussian text-sm sm:text-base md:text-lg tracking-wide">
            {regionName}
          </h3>
        </div>
        <div className="p-4 border-2 border-dashed opacity-50">
          <p className="text-center text-gray-500">Data Unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Column header showing the region name. */}
      <div className="text-center border-b-2 border-prussian pb-2 mb-2">
        <h3 className="font-heading text-prussian text-sm sm:text-base md:text-lg tracking-wide">
          {regionName}
        </h3>
      </div>

      {/* Single large artifact card for armor. */}
      <div className="flex-1">
        <ArtifactCard
          title={armorArtifact?.title || 'Unknown Artifact'}
          subtitle={armorArtifact?.subtitle || 'Details unavailable'}
          description={armorArtifact?.description || 'No description available'}
          ctaLabel={armorArtifact?.ctaLabel}
          imageUrl={armorArtifact?.imageUrl}
          objectUrl={armorArtifact?.objectUrl}
          isLarge={true} // Hint to make it bigger
        />
      </div>
    </div>
  );
};

export default RegionColumn;
