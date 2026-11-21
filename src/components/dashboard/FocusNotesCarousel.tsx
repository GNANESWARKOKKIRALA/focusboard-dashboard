import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

export const FocusNotesCarousel: React.FC = () => {
  const { slides, activeSlideIndex, nextSlide, prevSlide, goToSlide } = useTaskContext();
  const currentSlide = slides[activeSlideIndex];

  return (
    <section 
      aria-label="Focus Notes" 
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#4f46e5] via-[#584ee8] to-[#6366f1] text-white p-5 sm:p-6 lg:p-7 shadow-lg shadow-brand-500/15"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
        {/* Left Side: Copy, Headline & Indicators */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center justify-between md:justify-start gap-2 mb-2">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-indigo-200 uppercase">
              <span>FOCUS NOTES</span>
              <span className="text-indigo-300/60">•</span>
              <span className="bg-white/15 px-2 py-0.5 rounded-full text-[10px] text-white font-mono">
                {currentSlide.slideNumber}
              </span>
            </div>

            {/* Mobile-only Nav Buttons placed conveniently on the top-right */}
            <div className="flex md:hidden items-center gap-1.5" aria-label="Mobile slide navigation">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1.5 transition-all duration-300">
            {currentSlide.title}
          </h2>

          <p className="text-xs sm:text-sm text-indigo-100/90 font-normal leading-relaxed">
            {currentSlide.subtitle}
          </p>

          {/* Mobile inline task progress (Figma mobile frame 1:167) */}
          <div className="mt-4 md:hidden">
            <div className="flex items-center justify-between text-xs text-indigo-100 font-medium mb-1.5">
              <span className="truncate pr-2 font-semibold">{currentSlide.featuredTitle}</span>
              <span className="font-mono font-bold">{currentSlide.featuredProgress}%</span>
            </div>
            <div className="w-full bg-white/25 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${currentSlide.featuredProgress}%` }}
              />
            </div>
          </div>

          {/* Slide Indicator Bars matching Figma */}
          <div className="flex items-center gap-2 mt-4 sm:mt-5" role="tablist" aria-label="Slide indicators">
            {slides.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/80 ${
                    isActive ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                  aria-selected={isActive}
                  role="tab"
                />
              );
            })}
          </div>
        </div>

        {/* Desktop / Tablet: Featured Task Floating Card & Navigation */}
        <div className="hidden md:flex items-center justify-end gap-3 sm:gap-4 shrink-0">
          {/* Floating task status card matching Figma */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 text-slate-800 shadow-xl border border-white/40 min-w-[240px] max-w-[280px] transition-all duration-300">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  {currentSlide.featuredStatus}
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {currentSlide.featuredTitle}
                </p>

                {/* Progress bar and percentage */}
                <div className="mt-2 flex items-center gap-2.5">
                  <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-brand-600 h-1.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${currentSlide.featuredProgress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 font-mono">
                    {currentSlide.featuredProgress}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Carousel Navigation Buttons */}
          <div className="flex items-center gap-1.5 shrink-0" aria-label="Desktop slide navigation">
            <button
              onClick={prevSlide}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-all duration-150 backdrop-blur-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-all duration-150 backdrop-blur-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
