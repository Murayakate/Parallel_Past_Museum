import React from 'react';

// Generic card for displaying a single artifact (helmet, sword, etc.).
//
// This component is intentionally presentational only:
// - It receives all content via props
// - It does not know anything about regions, years, or APIs
//
// Now enhanced to display images from the Metropolitan Museum API.
const ArtifactCard = ({ title, subtitle, description, ctaLabel, imageUrl, objectUrl, isLarge = false }) => {
  return (
    // The outer container provides the white bordered card styling and ensures
    // the card stretches to fill the available vertical space in its grid cell.
    <div className="bg-white border-4 border-prussian rounded-xl overflow-hidden flex flex-col h-full">
      {/* Artifact image from Met API */}
      {imageUrl && (
        <div className={`w-full ${isLarge ? 'h-64 sm:h-80' : 'h-48'} bg-sage-light overflow-hidden`}>
          <img 
            src={imageUrl} 
            alt={title || 'Historical Artifact'}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="px-4 py-3 sm:px-5 sm:py-4 flex flex-col justify-between flex-1">
        <div>
          {/* Artifact main title: name, date, and region. */}
          <h4 className="font-heading text-prussian text-sm sm:text-base mb-1">
            {title}
          </h4>

          {/* Short secondary line: materials, construction, or other quick facts. */}
          <p className="font-body text-prussian text-xs sm:text-sm mb-2">
            {subtitle}
          </p>

          {/* Slightly longer description giving more historical or visual context. */}
          <p className="font-body text-prussian text-xs sm:text-sm line-clamp-3">
            {description}
          </p>
        </div>

        {/* Optional call-to-action button that links to Met Museum page */}
        {ctaLabel && objectUrl && (
          <a 
            href={objectUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-3 self-start text-xs sm:text-sm font-body text-prussian underline hover:text-gold"
          >
            {ctaLabel}
          </a>
        )}
        {ctaLabel && !objectUrl && (
          <button className="mt-3 self-start text-xs sm:text-sm font-body text-prussian underline hover:text-gold">
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ArtifactCard;
