"use client"

import Link from "next/link"
import MeetTeam from "@/components/home/meet-team"
import { Values } from "@/components/home/values"
import { Reveal } from "@/components/ui/reveal"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const slideshowImages = [
  {
    src: "/images/who-we-are.jpg",
    alt: "Hive Financial Systems team collaboration",
    description: "Our diverse team working together to transform lending infrastructure"
  },
  {
    src: "/images/who we are two.jpg", 
    alt: "Hive Financial Systems office environment",
    description: "Modern workspace where innovation meets financial technology expertise"
  },
  {
    src: "/images/who we are three.jpg",
    alt: "Hive Financial Systems technology platform", 
    description: "Advanced systems powering the future of lending infrastructure"
  },
  {
    src: "/images/news-events.jpeg",
    alt: "Hive Financial Systems market presence",
    description: "Strategic insights and analysis from our thought leadership"
  }
]

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index)
  }

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + slideshowImages.length) % slideshowImages.length)
  }
  return (
    <>
      <section style={{ background: '#1a1810', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.07,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32L28 66zm0 34L0 84V52l28 16 28-16v32L28 100z' fill='none' stroke='%238b7d3a' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '56px 100px',
          }}
        />
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #8b7d3a, transparent)' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px 72px', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ height: '1px', width: '40px', background: '#8b7d3a' }} />
            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8b7d3a' }}>
              Hive Financial Systems
            </span>
            <div style={{ height: '1px', width: '40px', background: '#8b7d3a' }} />
          </div>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(42px, 6vw, 64px)',
              fontWeight: 600,
              color: '#f5f0e8',
              lineHeight: 1.05,
              margin: '0 0 24px',
              letterSpacing: '-0.01em',
            }}
          >
            About Us
          </h1>
        </div>
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #8b7d3a40, transparent)' }} />
      </section>

      <section id="who-we-are" className="bg-[#ece7db]">
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex items-center">
              <div className="max-w-2xl">
                <div className="h-px w-16 bg-gold/55" />
                <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">Who We Are</h2>
                <p className="mt-5 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Hive Financial Systems was built around a simple premise — that lending infrastructure should be as sophisticated as the markets it serves. We combine experienced leadership with purpose-built technology to support operators across acquisition, underwriting, scoring, and loan lifecycle management.
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById('leadership')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className="btn-gold mt-8 inline-flex items-center justify-center gap-2"
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#f5f0e8',
                    backgroundColor: '#8b7d3a',
                    padding: '14px 32px',
                    borderRadius: '2px',
                    border: '1px solid #8b7d3a',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#8b7d3a'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#8b7d3a'
                    e.currentTarget.style.color = '#f5f0e8'
                  }}
                >
                  Meet Our Team
                </button>
              </div>
            </div>

            <div className="relative min-h-[260px] sm:min-h-[340px] rounded-sm overflow-hidden group">
              {/* Slideshow Images */}
              {slideshowImages.map((slide, index) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1d1766] to-transparent" />
              
              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slideshowImages.map((slide, index) => (
                  <button
                    key={slide.src}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGIN STORY SECTION */}
      <section id="our-story" style={{ backgroundColor: '#f7f4ee' }}>
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="font-sans text-[13px] font-medium uppercase tracking-[0.3em]" style={{ color: '#8b7d3a' }}>
                OUR STORY
              </p>
              <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl" style={{ color: '#1f1d18' }}>
                Built in Atlanta, Built for the World.
              </h2>
              <p className="mt-6 font-sans text-sm sm:text-base leading-relaxed" style={{ color: '#1f1d18', opacity: 0.8 }}>
                Founded in 2017, Hive Financial Systems set out to solve a problem that legacy institutions ignored — how to build lending infrastructure that is fast, intelligent, and accessible across emerging and high-growth markets. From Atlanta, we serve lenders across three continents.
              </p>
            </motion.div>

            {/* Right Column - Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col justify-center space-y-8"
            >
              <div className="text-center">
                <div className="font-serif text-3xl font-semibold sm:text-4xl lg:text-5xl" style={{ color: '#8b7d3a' }}>
                  2017
                </div>
                <p className="mt-2 font-sans text-[13px] font-medium uppercase tracking-[0.2em]" style={{ color: '#1f1d18' }}>
                  Year Founded
                </p>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-semibold sm:text-4xl lg:text-5xl" style={{ color: '#8b7d3a' }}>
                  3
                </div>
                <p className="mt-2 font-sans text-[13px] font-medium uppercase tracking-[0.2em]" style={{ color: '#1f1d18' }}>
                  Global Markets Served
                </p>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-semibold sm:text-4xl lg:text-5xl" style={{ color: '#8b7d3a' }}>
                  40+
                </div>
                <p className="mt-2 font-sans text-[13px] font-medium uppercase tracking-[0.2em]" style={{ color: '#1f1d18' }}>
                  Team Members
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Reveal>
        <Values />
      </Reveal>

      <div id="leadership" className="scroll-mt-20 pt-20">
        <Reveal>
          <MeetTeam />
        </Reveal>
      </div>

      {/* MARKETS SECTION */}
      <section id="global-reach" style={{ backgroundColor: '#2a281f' }}>
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <p className="font-sans text-[13px] font-medium uppercase tracking-[0.3em]" style={{ color: '#8b7d3a' }}>
              GLOBAL REACH
            </p>
            <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl" style={{ color: '#f7f4ee' }}>
              Our Global Footprint
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-t pt-8"
              style={{ borderColor: '#8b7d3a' }}
            >
              <h3 className="font-serif text-xl font-semibold sm:text-2xl" style={{ color: '#f7f4ee' }}>
                United States
              </h3>
              <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed" style={{ color: '#f7f4ee', opacity: 0.8 }}>
                Consumer lending infrastructure supporting acquisition, underwriting, and loan lifecycle management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-t pt-8"
              style={{ borderColor: '#8b7d3a' }}
            >
              <h3 className="font-serif text-xl font-semibold sm:text-2xl" style={{ color: '#f7f4ee' }}>
                Latin America
              </h3>
              <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed" style={{ color: '#f7f4ee', opacity: 0.8 }}>
                Scalable lending technology built for regional lenders navigating high-growth regional lending markets.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-t pt-8"
              style={{ borderColor: '#8b7d3a' }}
            >
              <h3 className="font-serif text-xl font-semibold sm:text-2xl" style={{ color: '#f7f4ee' }}>
                Southeast Asia
              </h3>
              <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed" style={{ color: '#f7f4ee', opacity: 0.8 }}>
                Purpose-built infrastructure enabling accessible credit in high-demand, emerging financial ecosystems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ backgroundColor: '#f7f4ee' }}>
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-3xl rounded-sm border p-6 text-center shadow-sm sm:p-8"
            style={{ borderColor: 'rgba(139, 125, 58, 0.2)', backgroundColor: '#ffffff' }}
          >
            <p className="font-sans text-[13px] font-medium uppercase tracking-[0.3em]" style={{ color: '#8b7d3a' }}>
              WORK WITH US
            </p>
            <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl" style={{ color: '#1f1d18' }}>
              Let's Build Something That Lasts.
            </h2>
            <p className="mt-6 font-sans text-sm sm:text-base leading-relaxed" style={{ color: '#1f1d18', opacity: 0.8 }}>
              We partner with lending teams who are serious about infrastructure. If that's you, we'd like to talk.
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-8"
            >
              <Link
                href="/contact?tab=partnership&subject=Request A Conversation"
                className="inline-flex items-center justify-center rounded-sm px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-300"
                style={{ backgroundColor: '#8b7d3a', color: '#f7f4ee' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b5a44e'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#8b7d3a'
                }}
              >
                Request A Conversation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </>
  )
}
