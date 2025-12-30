import React from 'react';
import { Heart } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';

// Editorial Style Artifact Card
// Designed to look like a high-end museum guide or travel magazine.
const ArtifactCard = ({ id, data, title, subtitle, description, ctaLabel, imageUrl, objectUrl }) => {
  const { savedItems, toggleSavedItem } = useDashboardStore();
  const isSaved = savedItems.some(item => item.id === id);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (data) toggleSavedItem(data);
  };

  return (
    // Container: Frameless, subtle shadow, warm paper background
    <div className="group h-full flex flex-col bg-[#F9F8F4] shadow-sm hover:shadow-lg transition-shadow duration-300 relative">
      
      {/* Image Section: 4:5 Aspect Ratio (Portrait), Top Center alignment */}
      <div className="relative w-full aspect-[4/5] bg-gray-200">
        
        {/* Save Button (Heart) */}
        <button
          onClick={handleSave}
          className={`absolute top-2 right-2 z-30 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isSaved 
              ? 'bg-red-900/10 text-red-900' 
              : 'bg-white/30 text-white hover:bg-white/50 border border-white/20'
          }`}
          aria-label={isSaved ? "Remove from collection" : "Save to collection"}
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-300 ${
              isSaved ? 'fill-red-900 stroke-red-900 scale-110' : 'stroke-white fill-none stroke-2'
            }`} 
          />
        </button>

        {/* Inner Wrapper for Image Zoom - Has overflow hidden to contain zoom */}
        <div className="w-full h-full overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title || 'Historical Artifact'}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-sans text-xs uppercase tracking-widest">
              No Image Available
            </div>
          )}
        </div>
        
        {/* The 'Tag': Region/Era Label overlapping bottom edge - Now outside overflow-hidden */}
        {subtitle && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
            <span className="inline-block bg-white px-3 py-1 border border-gray-300 shadow-sm text-[10px] uppercase tracking-[0.2em] font-sans text-gray-800 whitespace-nowrap">
              {subtitle}
            </span>
          </div>
        )}
      </div>

      {/* Content Section: Padding reduced to 1rem (p-4) + extra top padding for tag */}
      <div className="flex-1 px-4 pt-6 pb-4 text-center flex flex-col items-center">
        
        {/* Title: Serif, Dark Charcoal, Tighter spacing */}
        <h3 className="font-serif text-lg text-gray-800 mb-2 leading-snug">
          {title}
        </h3>

        {/* Description: Clean Sans-serif, Light, Readable */}
        <div className="w-6 h-px bg-gold/50 mb-3"></div> {/* Decorative divider */}
        
        <p className="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-4 mb-3">
          {description}
        </p>

        {/* View Link (Subtle) */}
        {objectUrl && (
          <a 
            href={objectUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto text-[10px] uppercase tracking-widest text-gray-500 hover:text-gold border-b border-transparent hover:border-gold transition-colors pb-0.5"
          >
            View Object
          </a>
        )}
      </div>
    </div>
  );
};

export default ArtifactCard;
