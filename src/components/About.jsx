function About() {
  return (
    <section
      id="nosotros"
      data-section-id="about"
      className="section-shell relative isolate px-6 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div
          data-about-reveal
          className="rounded-sm border border-vekka-amber/20 bg-vekka-off p-6 sm:p-10"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <p
                data-about-label
                className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-vekka-gold/50"
              >
                Sobre nosotros
              </p>
              <h3
                data-about-name
                className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.9rem)] font-bold leading-[1.02] tracking-tight text-vekka-gold"
              >
                <a
                  href="https://instagram.com/USERNAME" /* TODO: reemplazar USERNAME con tu usuario de Instagram */
                  target="_blank"
                  rel="noopener noreferrer"
                  className="logo-breathe inline-block text-inherit no-underline transition-colors duration-200 hover:text-vekka-amber"
                >
                  Franco Balesteri
                </a>
              </h3>
              <p
                data-about-role
                className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-vekka-amber"
              >
                Fundador / Líder de Producto
              </p>
            </div>

            <p
              data-about-desc
              className="max-w-2xl text-[clamp(0.95rem,1.3vw,1.08rem)] leading-relaxed text-vekka-gold/80"
            >
              En VIKKA diseñamos y desarrollamos experiencias web para becas, admisiones y equipos educativos.
              <br />
              Nos enfocamos en claridad, estructura y rendimiento para que cada sitio sea fácil de entender y fácil
              de gestionar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
