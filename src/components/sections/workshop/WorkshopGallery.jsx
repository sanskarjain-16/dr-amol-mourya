export default function WorkshopGallery({ galleryImages }) {
  return (
    <section className="py-20 bg-white border-t border-slate-100 overflow-hidden relative">
      <div className="w-full flex group">
        <div 
          className="flex w-max shrink-0 group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 40s linear infinite' }}
        >
          {[...galleryImages, ...galleryImages].map((imgUrl, idx) => (
            <div key={idx} className="w-80 h-64 mx-4 shrink-0 overflow-hidden rounded-2xl shadow-md border border-slate-100">
              <img 
                src={imgUrl} 
                alt="Workshop Attendees" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
