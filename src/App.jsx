import { useLayoutEffect } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import { initVekkaMotion } from './animations/anime';

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

const TICKER_ITEMS = [
  'Ingeniería Full Stack',
  'Implementación Pixel Perfect',
  'Optimización de Rendimiento',
  'Infraestructura SEO',
];

function App() {
  useLayoutEffect(() => {
    const cleanup = initVekkaMotion();
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  return (
    <div data-page-root>
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-display text-base font-semibold tracking-[0.14em] text-vekka-gold/80">
          VIKKA
        </span>
        <div className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-vekka-gold/50 transition-colors duration-200 hover:text-vekka-gold/90"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <Hero />

      <div className="ticker-wrap">
        <div className="ticker">
          {/* Duplicated for seamless infinite loop */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <Services />
      <About />
      <Contact />

      <footer className="footer-mirror">
        <div className="select-none whitespace-nowrap font-display text-[clamp(4rem,12vw,14rem)] font-bold leading-[0.85] tracking-[-0.04em] opacity-[0.15] rotate-180">
          ESTUDIO VIKKA
        </div>
      </footer>
    </div>
  );
}

export default App;
