import React from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';

const CollectionDrawer = () => {
  const { isDrawerOpen, toggleDrawer, savedItems, toggleSavedItem } = useDashboardStore();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={toggleDrawer}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#F9F8F4] h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
          <h2 className="font-heading text-xl text-prussian tracking-wide">
            My Collection
          </h2>
          <button 
            onClick={toggleDrawer}
            className="text-gray-400 hover:text-prussian transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {savedItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="font-body text-gray-500 text-lg">Your collection is empty.</p>
              <p className="font-body text-gray-400 text-sm mt-2">Start curating the past.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedItems.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex gap-4 group hover:border-gold/30 transition-colors">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm text-prussian line-clamp-2 mb-1 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      {item.subtitle}
                    </p>
                    <button 
                      onClick={() => toggleSavedItem(item)}
                      className="text-xs text-red-400 hover:text-red-600 underline font-body"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <p className="text-center text-xs text-gray-400 font-body">
            {savedItems.length} artifact{savedItems.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollectionDrawer;
