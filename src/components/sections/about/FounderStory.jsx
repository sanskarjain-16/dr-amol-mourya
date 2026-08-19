import { Reveal } from '../../Reveal'
import { aboutMeet } from '../../../data/about'
import editorialImg from '../../../assets/images/amol-editorial.jpg'

export default function FounderStory() {
  const storyParagraphs = aboutMeet.paragraphs.slice(2)

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <Reveal className="w-full max-w-4xl mb-12">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-lift bg-muted">
            <img 
              src={editorialImg} 
              alt="Dr. Amol Mourya interacting with audience" 
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </Reveal>

        <div className="w-full max-w-3xl space-y-8 md:space-y-10 text-lg md:text-2xl text-foreground/80 font-light leading-relaxed">
          {storyParagraphs.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
