"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { HiveLogo } from "@/components/hive-logo"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-border/65 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="mx-auto h-24 w-full max-w-7xl px-3 sm:h-28 sm:px-6">
        <div className="hidden h-full items-center justify-between lg:flex">
          <div className="flex w-[360px] items-center justify-start">
            <Image
              src="/images/Top-workplace-badge.png"
              alt="Top Workplace badge"
              width={160}
              height={160}
              className="h-auto w-40 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          <HiveLogo className="shrink-0" imageClassName="h-[88px] w-auto" />

          <div className="flex w-[360px] items-center justify-end">
            <div className="flex items-center gap-5">
              <Link
                href="/"
                className={`relative font-sans text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                  pathname === "/" ? "text-gold" : "text-[#3a3420] hover:text-gold"
                }`}
              >
                Home
                {pathname === "/" && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gold rounded-full" />
                )}
              </Link>
              <Link
                href="/about"
                className={`relative font-sans text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                  pathname === "/about" ? "text-gold" : "text-[#3a3420] hover:text-gold"
                }`}
              >
                About Us
                {pathname === "/about" && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gold rounded-full" />
                )}
              </Link>
              <Link
                href="/blog"
                className={`relative font-sans text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                  pathname === "/blog" || pathname.startsWith("/blog/") ? "text-gold" : "text-[#3a3420] hover:text-gold"
                }`}
              >
                Blog
                {(pathname === "/blog" || pathname.startsWith("/blog/")) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gold rounded-full" />
                )}
              </Link>
              <Link
                href="/careers"
                className={`relative font-sans text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                  pathname === "/careers" ? "text-gold" : "text-[#3a3420] hover:text-gold"
                }`}
              >
                Careers
                {pathname === "/careers" && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gold rounded-full" />
                )}
              </Link>
              <Link
                href="/contact"
                className={`relative font-sans text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                  pathname === "/contact" ? "text-gold" : "text-[#3a3420] hover:text-gold"
                }`}
              >
                Contact
                {pathname === "/contact" && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gold rounded-full" />
                )}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex h-full items-center justify-between lg:hidden">
          <div className="flex w-[72px] items-center justify-start sm:w-[120px]">
            <Image
              src="/images/Top-workplace-badge.png"
              alt="Top Workplace badge"
              width={80}
              height={80}
              className="h-auto w-14 object-contain transition-transform duration-300 hover:scale-105 sm:w-20"
            />
          </div>
          <HiveLogo className="shrink-0" imageClassName="h-[42px] w-auto sm:h-[68px]" />
          <div className="flex w-[72px] items-center justify-end sm:w-[120px]">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center bg-gold text-cream transition-all duration-300 hover:bg-gold-light hover:scale-105 sm:h-10 sm:w-10 [clip-path:polygon(25%_5%,75%_5%,100%_50%,75%_95%,25%_95%,0_50%)]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="global-nav-panel"
            >
              {menuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div id="global-nav-panel" className="border-t border-[#8b7d3a]/30 bg-gradient-to-br from-[#f8f6f2] to-[#f5f0e8] backdrop-blur-sm animate-slideDown">
          <div className="mx-auto max-w-7xl px-6 py-7">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {navLinks.map((link) => {
                const isActive = link.href === "/blog" 
                  ? (pathname === "/blog" || pathname.startsWith("/blog/"))
                  : pathname === link.href
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg border p-5 transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? "border-[#8b7d3a] bg-white/70 shadow-lg"
                        : "border-[#8b7d3a]/20 bg-white/50 hover:border-[#8b7d3a]/40 hover:bg-white/70 hover:shadow-lg hover:scale-[1.03]"
                    }`}
                    style={{
                      boxShadow: isActive 
                        ? '0 10px 15px -3px rgba(139, 125, 58, 0.2), 0 4px 6px -2px rgba(139, 125, 58, 0.1)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="relative z-10">
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#8b7d3a]">{link.label}</p>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8b7d3a]/5 to-transparent pointer-events-none" />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
              <Link 
                href="/careers" 
                className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#8b7d3a] transition-all duration-300 hover:text-[#b5a44e] hover:scale-105 bg-white/60 px-4 py-2 rounded-lg border border-[#8b7d3a]/20"
                style={{
                  boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                Join Our Team <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
