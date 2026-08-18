import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/images/logo.png'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact us', href: '#contact' },
]

const primaryCta = {
  label: 'Start your Transformation',
  href: '#contact',
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleAnchorClick = (event, href) => {
    if (!href.startsWith('#')) {
      setOpen(false)
      return
    }

    event.preventDefault()
    setOpen(false)

    const element = document.querySelector(href)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-[#111111]/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:py-4">

        {/* Logo */}
        <a
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center"
          aria-label="Dr. Amol Mourya home"
        >
          <img
            src={logo}
            alt="Dr. Amol Mourya"
            className="h-9 w-auto object-contain sm:h-10"
          />
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(event) =>
                handleAnchorClick(event, item.href)
              }
              className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-[#d8b56a]"
            >
              {item.label}
            </a>
          ))}

          <a
            href={primaryCta.href}
            onClick={(event) =>
              handleAnchorClick(event, primaryCta.href)
            }
            className="ml-1 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#d8b56a] to-[#f0d58c] px-5 py-3 text-[0.8rem] font-semibold tracking-wide text-[#111111] shadow-lg transition-all duration-200 hover:brightness-105 hover:shadow-xl active:scale-[0.98]"
          >
            {primaryCta.label}
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white lg:hidden"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#111111] px-4 pb-8 pt-2 lg:hidden">
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) =>
                  handleAnchorClick(event, item.href)
                }
                className="block border-b border-white/10 py-4 text-2xl font-medium text-white transition-colors hover:text-[#d8b56a]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={primaryCta.href}
            onClick={(event) =>
              handleAnchorClick(event, primaryCta.href)
            }
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#d8b56a] to-[#f0d58c] px-6 py-3 text-sm font-semibold tracking-wide text-[#111111] shadow-lg"
          >
            {primaryCta.label}
          </a>
        </div>
      )}
    </header>
  )
}

export default Navbar