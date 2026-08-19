import { useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "../../Reveal";
import { reviewsPageData } from "../../../data/reviews";
import VideoModal from "./VideoModal";
import SectionHeading from "../../ui/SectionHeading";

export default function FeaturedResults() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          eyebrow="Proven Outcomes"
          title="Featured Stories" 
          align="left" 
        />
        
        <div className="mt-12 space-y-24 md:space-y-32">
          {reviewsPageData.featured.map((item, idx) => {
            const hasVideo = Boolean(item.videoUrl);
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={item.name}
                className={`flex flex-col gap-8 lg:gap-16 lg:items-center ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Media Side */}
                <div className="w-full lg:w-[55%] shrink-0">
                  <Reveal delay={100}>
                    <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-lg group">
                      <img
                        src={item.thumbnail}
                        alt={`Result story from ${item.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {hasVideo && (
                        <button
                          onClick={() => setActiveVideo(item.videoUrl)}
                          className="absolute inset-0 flex items-center justify-center bg-ink/10 transition-colors hover:bg-ink/30 group-hover:bg-ink/20"
                          aria-label={`Play story of ${item.name}`}
                        >
                          <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gold-soft/95 text-ink backdrop-blur shadow-xl transition-transform hover:scale-110">
                            <Play className="h-8 w-8 ml-1" fill="currentColor" />
                          </div>
                        </button>
                      )}
                    </div>
                  </Reveal>
                </div>

                {/* Content Side */}
                <div className={`w-full lg:w-[45%] flex flex-col ${isEven ? "lg:pl-8" : "lg:pr-8"}`}>
                  <Reveal delay={200}>
                    {/* Section Label / Number */}
                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-sm font-bold text-muted-foreground">0{idx + 1}</span>
                      <div className="h-[1px] w-8 bg-border"></div>
                      <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                        Featured Story
                      </span>
                    </div>
                    
                    {/* Reviewer Name (Refined & Compact) */}
                    <h3 className="text-2xl lg:text-3xl font-display font-bold uppercase text-ink tracking-tight mb-3">
                      {item.name}
                    </h3>
                    
                    {/* Accent Line */}
                    <div className="h-[2px] w-10 bg-gold mb-6 rounded-full"></div>

                    {/* Result Highlight */}
                    {item.result && (
                      <div className="mb-6 inline-block bg-accent/5 px-4 py-2.5 rounded-lg border border-accent/10">
                        <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Result</span>
                        <span className="block text-lg md:text-xl font-bold text-accent">{item.result}</span>
                      </div>
                    )}

                    {/* Supporting Text (Quote) */}
                    <blockquote className="text-base text-ink/80 leading-relaxed mb-8">
                      "{item.quote}"
                    </blockquote>

                    {/* CTA */}
                    <div>
                      {hasVideo ? (
                        <button 
                          onClick={() => setActiveVideo(item.videoUrl)}
                          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:text-gold-soft"
                        >
                          <Play className="w-5 h-5" />
                          Watch Story
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          <span className="w-8 h-[1px] bg-muted-foreground/50"></span>
                          Verified Experience
                        </div>
                      )}
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <VideoModal
        videoUrl={activeVideo}
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
