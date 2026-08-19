import { useState } from "react";
import { Play, Quote } from "lucide-react";
import { Reveal } from "../../Reveal";
import VideoModal from "./VideoModal";

export default function ReviewVideoCard({ review, index = 0, featured = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasVideo = Boolean(review.videoUrl);

  return (
    <>
      <Reveal delay={index * 100}>
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {/* Media Header (Image or Fallback) */}
          {review.thumbnail ? (
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <img
                src={review.thumbnail}
                alt={`Review by ${review.name}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {hasVideo && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors hover:bg-ink/40 group-hover:bg-ink/30"
                  aria-label={`Play video review from ${review.name}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/90 text-ink backdrop-blur shadow-lg transition-transform hover:scale-110">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </button>
              )}
            </div>
          ) : (
            <div className="p-6 pb-0">
               <Quote className="h-8 w-8 text-accent/20" aria-hidden="true" />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-grow flex-col p-6">
            <blockquote className="mb-6 flex-grow text-sm font-light leading-relaxed text-ink md:text-base">
              "{review.quote || review.text}"
            </blockquote>

            {/* Footer / Context */}
            <div className="mt-auto border-t border-border pt-4">
              <div className="font-semibold text-ink">{review.name}</div>
              {(review.role || review.location) && (
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {review.role || review.location}
                </div>
              )}
            </div>
          </div>
        </article>
      </Reveal>

      {hasVideo && (
        <VideoModal
          videoUrl={review.videoUrl}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
