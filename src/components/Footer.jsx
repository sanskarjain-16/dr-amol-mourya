import logo from '../assets/images/logo.png'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact us', href: '#contact' },
]

const services = [
  'RGC Champions Launchpad',
  'RGC Mastermind Training',
  'RGC CEO Coaching',
  'RGC System Training',
]

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/amolmouryaofficial',
    text: 'f',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/realestatewithdr.amol',
    text: '◎',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@dramolmourya',
    text: '▶',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/dr-amol-mourya',
    text: 'in',
  },
]

function handleAnchorClick(event, href) {
  if (!href.startsWith('#')) return

  event.preventDefault()

  const element = document.querySelector(href)

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#111111] py-12 text-white sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="Dr. Amol Mourya"
              className="h-10 w-auto object-contain"
              loading="lazy"
            />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Asia's Leading Real Estate Coach helping investors
              build wealth through strategic real estate investments.
            </p>

            {/* Social links */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-sm font-semibold text-white transition-colors hover:border-[#d8b56a] hover:text-[#d8b56a]"
                >
                  {social.text}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-[#e0c078]">
              Quick Links
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(event) =>
                      handleAnchorClick(event, item.href)
                    }
                    className="transition-colors hover:text-[#d8b56a]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-[#e0c078]">
              Services
            </h2>

            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
              {services.map((service) => (
                <li key={service}>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Headquarters */}
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-[#e0c078]">
              Headquarters
            </h2>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
              <p>RGC Headquarters</p>

              <p>
                304-05-06, Anandam Business Centre,
                Ganeshpeth, Nagpur
              </p>

              <p>
                Monday – Saturday | 10 AM – 7 PM
              </p>

              <p>
                Contact Us on
              </p>

              <div className="flex flex-col gap-1">
                <a
                  href="tel:+918767538186"
                  className="hover:text-[#d8b56a]"
                >
                  +91 8767538186
                </a>

                <a
                  href="tel:+918087010150"
                  className="hover:text-[#d8b56a]"
                >
                  +91 8087010150
                </a>
              </div>

              <a
                href="mailto:dramolmourya@gmail.com"
                className="block break-words hover:text-[#d8b56a]"
              >
                dramolmourya@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © 2026 Dr. Amol Mourya. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer