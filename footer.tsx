import Image from "next/image"
import Link from "next/link"

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
]

const contactLinks = [
  { href: "mailto:contact@hivefinancialsystems.com", label: "Contact Us" },
  { href: "https://www.linkedin.com/company/hivefs/", label: "LinkedIn", external: true },
]

const regionList = ["United States", "Latin America", "Southeast Asia"]

function HexOutline({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M12 2 20 6.5v11L12 22 4 17.5v-11L12 2Z" stroke="#8b7d3a" strokeOpacity="0.55" strokeWidth="1" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-[#8b7d3a]/30 bg-gradient-to-br from-[#4a453a] via-[#3f3a32] to-[#353029]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_1fr_0.8fr]">
          <div>
            <Image src="/images/logo.png" alt="Hive Financial Systems Logo" width={165} height={55} className="h-14 w-auto" />
            <p className="mt-6 max-w-[220px] font-sans text-sm leading-relaxed text-[#f7f4ee]/80">
              Infrastructure for modern lending teams across US, LATAM, and Southeast Asia.
            </p>
          </div>

          <div>
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b7d3a]">COMPANY</p>
            <nav className="flex flex-col gap-4">
              {companyLinks.map((link) => (
                <Link key={link.label} href={link.href} className="font-sans text-sm text-[#f7f4ee]/70 transition-colors hover:text-[#8b7d3a]">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b7d3a]">CONNECT</p>
            <nav className="flex flex-col gap-4">
              {contactLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="font-sans text-sm text-[#f7f4ee]/70 transition-colors hover:text-[#8b7d3a]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b7d3a]">REGIONS</p>
            <ul className="flex flex-col gap-2">
              {regionList.map((region) => (
                <li key={region} className="font-sans text-sm text-[#f7f4ee]/70">
                  {region}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-6">
          <div className="h-px flex-1 bg-[#8b7d3a]/25" />
          <div className="flex items-center gap-4">
            <HexOutline size={32} />
            <HexOutline size={22} />
            <HexOutline size={32} />
          </div>
          <div className="h-px flex-1 bg-[#8b7d3a]/25" />
        </div>

        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-sm text-[#f7f4ee]/70">
            © 2026 Hive Financial Systems.
          </p>
          <div className="flex flex-wrap items-center gap-6 md:justify-end">
            <Link href="/privacy" className="font-sans text-sm text-[#f7f4ee]/70 transition-colors hover:text-[#8b7d3a]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-sans text-sm text-[#f7f4ee]/70 transition-colors hover:text-[#8b7d3a]">
              Terms of Service
            </Link>
            <span className="font-sans text-sm text-[#f7f4ee]/70">Atlanta, GA</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
