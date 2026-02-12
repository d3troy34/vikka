function Hero() {
  return (
    <header data-section-id="hero" className="hero-section">
      <img
        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
        alt=""
        className="hero-bg-image"
        aria-hidden="true"
      />

      <div
        data-hero-corner
        className="pinned pinned-tl font-mono text-[0.8rem] uppercase leading-relaxed tracking-wide text-vekka-gold/70"
      >
        EST. MMXXIV
        <br />
        Arquitectura Web
      </div>

      <div
        className="relative z-[2]"
        style={{ mixBlendMode: 'color-dodge' }}
      >
        <div data-hero-logo className="logo-breathe w-[clamp(18rem,50vw,44rem)]">
          <img
            src="/vikka-logo-amarillo.svg"
            alt="VIKKA"
            className="h-auto w-full select-none"
            draggable={false}
          />
        </div>
      </div>

      <div
        data-hero-corner
        className="pinned pinned-bl font-mono text-[0.8rem] uppercase leading-relaxed tracking-wide text-vekka-gold/70"
      >
        Desarrollo Web
        <br />
        Para Empresas
      </div>

      <div
        data-hero-corner
        className="pinned pinned-br font-mono text-[0.8rem] uppercase leading-relaxed tracking-wide text-vekka-gold/70"
      >
        Desplazar para
        <br />
        Diagnostico
      </div>
    </header>
  );
}

export default Hero;
