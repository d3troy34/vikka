import { createLayout, stagger } from 'animejs';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const PROJECTS = [
  {
    id: 'aurora',
    title: 'Fundacion Aurora',
    category: 'Scholarship Portal',
    year: '2025',
    summary: 'Portal de becas con foco en conversion y lectura clara.',
    url: '/proyectos/fundacion-aurora',
  },
  {
    id: 'atlas',
    title: 'Campus Atlas',
    category: 'Admissions Campaign',
    year: '2025',
    summary: 'Landing de admisiones optimizada para mobile.',
    url: '/proyectos/campus-atlas',
  },
  {
    id: 'beca-norte',
    title: 'Beca Norte',
    category: 'Program Microsite',
    year: '2024',
    summary: 'Micrositio de captacion para programas de becas.',
    url: '/proyectos/beca-norte',
  },
  {
    id: 'future-bridge',
    title: 'Future Bridge',
    category: 'Application Suite',
    year: '2024',
    summary: 'Suite de postulacion multi-etapa para equipos de admision.',
    url: '/proyectos/future-bridge',
  },
  {
    id: 'residency',
    title: 'Andes Residency',
    category: 'Editorial Website',
    year: '2023',
    summary: 'Sitio editorial para programas residenciales universitarios.',
    url: '/proyectos/andes-residency',
  },
  {
    id: 'nodo-fellows',
    title: 'Nodo Fellows',
    category: 'Mentorship Platform',
    year: '2023',
    summary: 'Plataforma de mentoria con onboarding y seguimiento.',
    url: '/proyectos/nodo-fellows',
  },
];

const VISIBLE_COUNT = 3;

function getVisibleProjects(items, startIndex, count) {
  const visible = [];
  for (let offset = 0; offset < count; offset += 1) {
    visible.push(items[(startIndex + offset) % items.length]);
  }
  return visible;
}

function Portfolio() {
  const [startIndex, setStartIndex] = useState(0);
  const [openProjectId, setOpenProjectId] = useState(null);
  const gridRef = useRef(null);
  const layoutRef = useRef(null);
  const shouldAnimateRef = useRef(false);

  const visibleProjects = useMemo(
    () => getVisibleProjects(PROJECTS, startIndex, VISIBLE_COUNT),
    [startIndex]
  );

  useEffect(() => {
    if (!gridRef.current) return () => {};

    layoutRef.current = createLayout(gridRef.current, {
      duration: 520,
      ease: 'out(3)',
    });

    return () => {
      if (layoutRef.current) {
        layoutRef.current.revert();
        layoutRef.current = null;
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (!shouldAnimateRef.current || !layoutRef.current) return;

    layoutRef.current.animate({
      delay: stagger(130),
    });

    shouldAnimateRef.current = false;
  }, [startIndex, openProjectId]);

  const recordLayout = () => {
    if (!layoutRef.current) return;
    layoutRef.current.record();
    shouldAnimateRef.current = true;
  };

  const prevProjects = () => {
    recordLayout();
    setStartIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    setOpenProjectId(null);
  };

  const nextProjects = () => {
    recordLayout();
    setStartIndex((prev) => (prev + 1) % PROJECTS.length);
    setOpenProjectId(null);
  };

  const toggleProject = (projectId) => {
    recordLayout();
    setOpenProjectId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <section
      id="portafolio"
      data-section-id="portfolio"
      className="section-shell relative isolate z-10 mt-20 text-white sm:mt-28"
    >
      <div className="mx-auto flex min-h-[58vh] w-full max-w-[1200px] flex-col items-center justify-start px-6 pb-28 pt-6 sm:pb-36 sm:pt-10">
        <header data-portfolio-header className="text-center">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-white/55">
            Portafolio
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.8vw,3.9rem)] font-medium leading-[1.06] tracking-tight text-white">
            Nuestros proyectos
          </h2>
        </header>

        <div data-projects-nav className="mt-9 w-full">
          <div ref={gridRef} data-projects-grid className="projects-grid">
            {visibleProjects.map((project) => {
              const isOpen = openProjectId === project.id;

              return (
                <div key={project.id} className="project-slot">
                  <article
                    data-project-card
                    className={`project-card ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="project-card-toggle"
                      onClick={() => toggleProject(project.id)}
                      aria-expanded={isOpen}
                      aria-controls={`project-expand-${project.id}`}
                    >
                      <p className="project-card-category">{project.category}</p>
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-year">{project.year}</p>
                      <p className="project-card-summary">{project.summary}</p>
                    </button>

                    <div
                      id={`project-expand-${project.id}`}
                      className={`project-card-expand ${isOpen ? 'is-open' : ''}`}
                    >
                      <p className="project-card-expand-text">
                        Vista extendida del proyecto disponible para revisar objetivos, estructura y resultados.
                      </p>
                      <a href={project.url} className="project-card-link">
                        Ir al proyecto
                      </a>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prevProjects}
              className="projects-arrow"
              aria-label="Ver proyectos anteriores"
            >
              &larr;
            </button>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/45">
              {startIndex + 1}&#8211;{startIndex + VISIBLE_COUNT} / {PROJECTS.length}
            </span>
            <button
              type="button"
              onClick={nextProjects}
              className="projects-arrow"
              aria-label="Ver proyectos siguientes"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
