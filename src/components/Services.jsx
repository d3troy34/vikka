import { useEffect, useRef } from 'react';

const SERVICES = [
  { title: 'Análisis', meta: '01 / ENTENDEMOS' },
  { title: 'Reingeniería', meta: '02 / REFINAMOS' },
  { title: 'Construcción', meta: '03 / CONSTRUIMOS' },
  { title: 'Escalabilidad', meta: '04 / EVOLUCIONAMOS' },
];

function Services() {
  const timeRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (!timeRef.current) return;
      const now = new Date();
      timeRef.current.textContent = now.toLocaleTimeString('es-AR', {
        hour12: false,
        timeZone: 'America/Argentina/Buenos_Aires',
      });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="servicios"
      data-section-id="services"
      className="moss-block section-shell"
    >
      <div className="relative z-[1] mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div data-services-col="left">
          <h2 className="mt-4 font-display text-[clamp(1.5rem,4vw,3rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-vekka-amber-mid">
            Profesionaliza
            <br />
            Tu Presencia
            <br />
            Online
          </h2>

          <p className="mt-6 max-w-[40ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-vekka-gold/80">
            La web ya no es estática. Es un ecosistema vivo.
            Vikka transforma sitios web en activos de alto
            rendimiento. Estructura rígida, interacción fluida
            y precisión absoluta.
          </p>

          <a
            href="https://forms.example.com/iniciar-proyecto" /* TODO: reemplazar con la URL real del formulario */
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn mt-8"
          >
            Iniciar Proyecto
          </a>
        </div>

        <div data-services-col="right">
          <ul className="service-list">
            {SERVICES.map((service) => (
              <li key={service.title} className="service-item" data-service-item="">
                <span className="service-title">{service.title}</span>
                <span className="service-meta">{service.meta}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-[1] mt-6 flex flex-col gap-2 border-t border-vekka-gold/20 pt-4 font-mono text-[0.7rem] uppercase tracking-wide text-vekka-gold/40 md:absolute md:bottom-4 md:left-8 md:right-8 md:mt-0 md:border-0 md:pt-0 md:gap-1 md:flex-row md:justify-between">
        <span>&copy; VIKKA SYSTEMS INC. // TODOS LOS DERECHOS RESERVADOS</span>
        <span>HORA SERVIDOR: <span ref={timeRef}>00:00:00</span> UTC-3</span>
      </div>
    </section>
  );
}

export default Services;
