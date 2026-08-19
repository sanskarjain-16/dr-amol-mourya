import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function VideoModal({ videoUrl, isOpen, onClose }) {
  const modalRef = useRef(null);

  // Handle escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap / prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus modal when opened
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/90 backdrop-blur-sm">
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-5xl bg-ink rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 outline-none"
        role="dialog"
        aria-modal="true"
        aria-label="Video Player"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-ink-soft/80 hover:bg-gold/80 rounded-full text-white transition-colors"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative aspect-video w-full bg-ink">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              title="Review Video"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full text-white/50">
              Video unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
