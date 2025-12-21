import React from 'react';

// Reusable horizontal time slider shown under the tri-region grid.
//
// Props:
// - value: the currently selected year (controlled by the parent)
// - onChange: callback that receives the new year when the user drags the slider
// - minYear / maxYear: numeric bounds for the slider
//
// Right now this just displays the chosen year, but once the API is integrated
// we will:
// - Use `value` to build queries to the Met search endpoint
// - Possibly snap the slider to important periods (Renaissance, etc.).
const TimelineSlider = ({ value, onChange, minYear, maxYear }) => {
  return (
    <section className="mt-10 bg-white/70 border-4 border-prussian rounded-2xl px-4 sm:px-6 py-4">
      <div className="flex flex-col gap-4">
        {/* Labels across the top show the start, middle, and end of the timeline.
            These help orient the user, especially on smaller screens. */}
        <div className="flex justify-between text-[10px] sm:text-xs font-body text-prussian">
          <span>{minYear} CE</span>
          <span>{Math.round((minYear + maxYear) / 2)} CE</span>
          <span>{maxYear} CE</span>
        </div>

        {/* Native range input, styled via Tailwind.
            It is fully controlled by the `value` and `onChange` props so that
            the parent DashboardPage owns the state. */}
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-gold"
        />

        {/* Live readout of the currently selected year. This text will help the
            user understand what time slice the artifacts correspond to once
            filtering is driven by real data. */}
        <p className="text-center text-xs sm:text-sm font-body text-prussian">
          Currently Exploring: <span className="font-semibold">{value} CE</span>
        </p>
      </div>
    </section>
  );
};

export default TimelineSlider;
