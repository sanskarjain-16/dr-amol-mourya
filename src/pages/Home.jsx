import Hero from '../components/sections/home/Hero'
import PrimaryVisual from '../components/sections/home/PrimaryVisual'
import Stats from '../components/sections/home/Stats'
import Intro from '../components/sections/home/Intro'
import Workshop from '../components/sections/home/Workshop'
import Programs from '../components/sections/home/Programs'
import Testimonials from '../components/sections/home/Testimonials'
import SuccessStories from '../components/sections/home/SuccessStories'
import Mastery from '../components/sections/home/Mastery'
import Media from '../components/sections/home/Media'
import FinalCta from '../components/sections/home/FinalCta'

export default function Home() {
  return (
    <main>
      <Hero />
      <PrimaryVisual />
      <Stats />
      <Intro />
      <Workshop />
      <Programs />
      <Testimonials />
      <SuccessStories />
      <Mastery />
      <Media />
      <FinalCta />
    </main>
  )
}