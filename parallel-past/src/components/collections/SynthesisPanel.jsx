import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Layers, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

const SynthesisPanel = ({ items }) => {
  // Only process if we have valid items
  const validItems = useMemo(() => {
    return items ? items.slice(0, 3).filter(item => item) : [];
  }, [items]);

  // Don't render if we don't have enough data for a meaningful comparison LIKE TWO OF THEM
  if (validItems.length < 2) return null;

  // LOGIC: Material Divergence
  const materialInsight = useMemo(() => {
    const materials = validItems
      .map(item => item.medium || '')
      .filter(Boolean)
      .map(m => {
        // Clean string: remove common words, take first distinct material or first 2 words
        return m.split(',')[0].trim();
      });

    if (materials.length === 0) return null;
    
    // Unique check
    const unique = [...new Set(materials)];
    return unique.join(' vs. ');
  }, [validItems]);

  // LOGIC: Timeline Check
  const timelineInsight = useMemo(() => {
    const dates = validItems
      .map(item => item.objectBeginDate)
      .filter(d => typeof d === 'number');

    if (dates.length < 2) return null;

    const min = Math.min(...dates);
    const max = Math.max(...dates);
    const diff = max - min;
    
    // Format range
    const range = `${min} - ${max}`;

    return {
      isSynchronous: diff < 50,
      diff,
      range
    };
  }, [validItems]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative group">
        
        {/* THE Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70"></div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* HEADER:THAT  Technical "HUD" feel */}
          <div className="col-span-1 border-b md:border-b-0 md:border-r border-slate-800/50 pb-6 md:pb-0 md:pr-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-mono text-lg tracking-tight font-bold">
                SYNTHESIS<span className="text-slate-600">_PANEL</span>
              </h3>
            </div>
            <p className="text-slate-400 text-xs font-mono leading-relaxed">
              ANALYZING {validItems.length} ARTIFACTS<br/>
              CROSS-CULTURAL METADATA COMPARISON
            </p>
          </div>

          {/* INSIGHT 1: Timeline */}
          <div className="col-span-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-mono uppercase tracking-widest">
              <GitCompare className="w-3 h-3" />
              <span>Temporal alignment</span>
            </div>
            
            {timelineInsight ? (
              <div className="flex items-start gap-3">
                {timelineInsight.isSynchronous ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                )}
                <div>
                  <div className={`text-lg font-bold font-mono ${timelineInsight.isSynchronous ? 'text-green-400' : 'text-yellow-400'}`}>
                    {timelineInsight.isSynchronous ? 'SYNCHRONOUS' : 'ASYNCHRONOUS'}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {timelineInsight.isSynchronous 
                      ? 'Contemporary artifacts (<50y)' 
                      : `Span of ${timelineInsight.diff} years (${timelineInsight.range})`
                    }
                  </div>
                </div>
              </div>
            ) : (
              <span className="text-slate-600 text-sm font-mono">Insufficient temporal data</span>
            )}
          </div>

          {/* INSIGHT 2: Material */}
          <div className="col-span-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-800/50 pt-6 md:pt-0 md:pl-8">
            <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-mono uppercase tracking-widest">
              <Layers className="w-3 h-3" />
              <span>Material Divergence</span>
            </div>
            
            {materialInsight ? (
              <div className="group/mat">
                <div className="text-white text-base md:text-lg font-bold font-mono leading-tight break-words group-hover/mat:text-blue-200 transition-colors">
                  {materialInsight}
                </div>
                <div className="text-slate-500 text-xs mt-1 font-mono">
                  Primary composition analysis
                </div>
              </div>
            ) : (
               <span className="text-slate-600 text-sm font-mono">No material data extracted</span>
            )}
          </div>

        </div>

        {/* Background Grid Pattern for "Tech" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0"></div>
      </div>
    </motion.div>
  );
};

export default SynthesisPanel;
