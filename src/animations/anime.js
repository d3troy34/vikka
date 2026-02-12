import { animate, createTimeline, splitText, svg, stagger } from 'animejs';

const $one = (selector, scope) => (scope || document).querySelector(selector);

const isWhiteShape = (shape) => {
  const className = shape.getAttribute('class') || '';
  const classes = className.split(/\s+/).filter(Boolean);
  if (classes.includes('cls-1')) return true;

  const fill = (shape.getAttribute('fill') || '').trim().toLowerCase();
  return fill === '#fff' || fill === '#ffffff' || fill === 'white';
};

function createHeroIntro() {
  const logoEl = $one('[data-hero-logo]');
  if (!logoEl) return () => {};

  const corners = Array.from(document.querySelectorAll('[data-hero-corner]'));

  logoEl.style.opacity = '0';
  logoEl.style.transform = 'translateY(10px)';
  corners.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
  });

  let cancelled = false;
  let introInAnim = null;
  let drawLoopTimeline = null;
  const cornerAnims = [];

  const revealFallback = () => {
    if (cancelled) return;
    logoEl.style.opacity = '1';
    logoEl.style.transform = '';
    corners.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = '';
    });
  };

  const revealCorners = () => {
    if (cancelled) return;
    corners.forEach((el, i) => {
      cornerAnims.push(
        animate(el, {
          opacity: [0, 1],
          translateY: ['12px', '0px'],
          duration: 400,
          ease: 'outQuad',
          delay: 300 + i * 100,
          autoplay: true,
        })
      );
    });
  };

  fetch('/vikka-logo-amarillo.svg')
    .then((r) => r.text())
    .then((svgText) => {
      if (cancelled) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, 'image/svg+xml');
      const svgEl = doc.querySelector('svg');
      if (!svgEl) {
        revealFallback();
        return;
      }

      svgEl.setAttribute('aria-label', 'VIKKA');
      svgEl.setAttribute('role', 'img');
      svgEl.removeAttribute('width');
      svgEl.removeAttribute('height');
      svgEl.style.width = '100%';
      svgEl.style.height = 'auto';
      svgEl.style.display = 'block';

      logoEl.innerHTML = '';
      logoEl.appendChild(document.adoptNode(svgEl));

      const shapeSelector = 'path, polygon, rect, polyline, line, circle, ellipse';
      const allShapes = Array.from(logoEl.querySelectorAll(shapeSelector));
      const drawTargets = allShapes.filter((shape) => !isWhiteShape(shape));
      const whiteShapes = allShapes.filter((shape) => isWhiteShape(shape));
      if (!drawTargets.length) {
        revealFallback();
        return;
      }

      whiteShapes.forEach((shape) => {
        shape.setAttribute('fill', 'none');
        shape.setAttribute('stroke', 'none');
        shape.style.opacity = '0';
      });

      const baseFillOpacity = 0.24;
      const fullFillOpacity = 1;

      drawTargets.forEach((shape) => {
        shape.setAttribute('fill', '#f8ed44');
        shape.setAttribute('stroke', '#f8ed44');
        shape.setAttribute('stroke-width', '2.4');
        shape.setAttribute('stroke-linecap', 'round');
        shape.setAttribute('stroke-linejoin', 'round');
        shape.style.fillOpacity = String(baseFillOpacity);
        shape.style.strokeOpacity = '1';
      });

      introInAnim = animate(logoEl, {
        opacity: [0, 1],
        translateY: ['10px', '0px'],
        duration: 260,
        ease: 'outQuad',
        autoplay: true,
      });

      revealCorners();

      const drawables = svg.createDrawable(drawTargets);

      drawLoopTimeline = createTimeline({
        autoplay: true,
        loop: true,
        defaults: { ease: 'inOutQuad' },
      });

      const drawForwardDuration = 3200;
      const drawBackwardDuration = 2800;
      const strokeDelay = stagger(120);
      const fillTransitionDuration = 360;
      const fillInStart = 2680;
      const eraseStart = 4200;

      drawLoopTimeline.add(
        drawables,
        {
          draw: ['0 0', '0 1'],
          duration: drawForwardDuration,
          delay: strokeDelay,
        },
        0
      );

      drawLoopTimeline.add(
        drawTargets,
        {
          fillOpacity: [baseFillOpacity, fullFillOpacity],
          strokeOpacity: [1, 0],
          duration: fillTransitionDuration,
          ease: 'linear',
        },
        fillInStart
      );

      drawLoopTimeline.add(
        drawables,
        {
          draw: ['0 1', '0 0'],
          duration: drawBackwardDuration,
          delay: strokeDelay,
        },
        eraseStart
      );

      drawLoopTimeline.add(
        drawTargets,
        {
          fillOpacity: [fullFillOpacity, baseFillOpacity],
          strokeOpacity: [0, 1],
          duration: fillTransitionDuration,
          ease: 'linear',
        },
        eraseStart
      );
    })
    .catch(() => {
      revealFallback();
    });

  return () => {
    cancelled = true;
    if (introInAnim) introInAnim.revert();
    if (drawLoopTimeline) drawLoopTimeline.revert();
    cornerAnims.forEach((a) => a.revert());
    logoEl.style.opacity = '';
    logoEl.style.transform = '';
    corners.forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
    });
  };
}

function createServicesReveal() {
  const section = $one('[data-section-id="services"]');
  if (!section) return () => {};

  const leftCol = section.querySelector('[data-services-col="left"]');
  const serviceItems = Array.from(section.querySelectorAll('[data-service-item]'));

  const leftChildren = leftCol ? Array.from(leftCol.children) : [];
  const allTargets = [...leftChildren, ...serviceItems];

  allTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
  });

  let hasPlayed = false;

  const playReveal = () => {
    if (hasPlayed) return;
    hasPlayed = true;

    leftChildren.forEach((el, i) => {
      animate(el, {
        opacity: [0, 1],
        translateY: ['24px', '0px'],
        duration: 500,
        ease: 'outQuad',
        delay: i * 80,
        autoplay: true,
      });
    });

    serviceItems.forEach((el, i) => {
      animate(el, {
        opacity: [0, 1],
        translateY: ['24px', '0px'],
        duration: 480,
        ease: 'outQuad',
        delay: 200 + i * 120,
        autoplay: true,
      });
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playReveal();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(section);

  return () => {
    observer.disconnect();
    allTargets.forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
    });
  };
}

function createAboutReveal() {
  const section = $one('[data-section-id="about"]');
  const shell = $one('[data-about-reveal]', section);
  if (!section || !shell) return () => {};

  const label = $one('[data-about-label]', shell);
  const name = $one('[data-about-name]', shell);
  const role = $one('[data-about-role]', shell);
  const desc = $one('[data-about-desc]', shell);

  const sequencedEls = [label, name, role, desc].filter(Boolean);

  shell.style.opacity = '0';
  shell.style.transform = 'translateY(24px)';

  sequencedEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
  });

  let hasPlayed = false;

  const playReveal = () => {
    if (hasPlayed) return;
    hasPlayed = true;

    animate(shell, {
      opacity: [0, 1],
      translateY: ['24px', '0px'],
      duration: 600,
      ease: 'outQuad',
      autoplay: true,
    });

    sequencedEls.forEach((el, i) => {
      animate(el, {
        opacity: [0, 1],
        translateY: ['14px', '0px'],
        duration: 480,
        ease: 'outQuad',
        delay: 260 + i * 90,
        autoplay: true,
      });
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playReveal();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.22 }
  );

  observer.observe(section);

  return () => {
    observer.disconnect();
    shell.style.opacity = '';
    shell.style.transform = '';
    sequencedEls.forEach((el) => {
      el.style.opacity = '';
      el.style.transform = '';
    });
  };
}

function createContactReveal() {
  const section = $one('[data-section-id="contact"]');
  const block = $one('[data-contact-block]', section);
  if (!section || !block) return () => {};

  const inputs = Array.from(block.querySelectorAll('[data-contact-input]'));
  const kicker = $one('[data-contact-kicker]', block);
  const form = $one('[data-contact-form]', block);
  const mail = $one('[data-contact-mail]', block);
  const title = $one('[data-contact-title]', block);
  const support = $one('[data-contact-support]', block);

  const revealTargets = [kicker, form, mail].filter(Boolean);
  const splitters = [];
  const splitWords = [];

  [title, support].forEach((element) => {
    if (!element) return;
    const splitter = splitText(element, { words: true });
    splitters.push(splitter);
    splitter.words.forEach((word) => {
      word.style.display = 'inline-block';
      word.style.opacity = '0';
      word.style.transform = 'translateY(12px)';
    });
    splitWords.push(...splitter.words);
  });

  let hasPlayed = false;

  const playReveal = () => {
    if (hasPlayed) return;
    hasPlayed = true;

    revealTargets.forEach((element, index) => {
      animate(element, {
        opacity: [0, 1],
        translateY: ['24px', '0px'],
        duration: 560,
        ease: 'outQuad',
        delay: index * 90,
        autoplay: true,
      });
    });

    if (splitWords.length) {
      animate(splitWords, {
        opacity: [0, 1],
        translateY: ['12px', '0px'],
        duration: 520,
        ease: 'outQuad',
        delay: stagger(48),
        autoplay: true,
      });
    }

    if (inputs.length) {
      inputs.forEach((input) => {
        input.style.opacity = '0';
        input.style.transform = 'translateY(12px)';
      });

      animate(inputs, {
        opacity: [0, 1],
        translateY: ['12px', '0px'],
        duration: 400,
        ease: 'outQuad',
        delay: (_, i) => 200 + i * 80,
        autoplay: true,
      });
    }
  };

  revealTargets.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(24px)';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playReveal();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.32 }
  );

  observer.observe(section);

  return () => {
    observer.disconnect();
    revealTargets.forEach((element) => {
      element.style.opacity = '';
      element.style.transform = '';
    });
    splitters.forEach((splitter) => splitter.revert());
    inputs.forEach((input) => {
      input.style.opacity = '';
      input.style.transform = '';
    });
  };
}

export const initVekkaMotion = () => {
  const heroCleanup = createHeroIntro();
  const servicesCleanup = createServicesReveal();
  const aboutCleanup = createAboutReveal();
  const contactCleanup = createContactReveal();

  return () => {
    heroCleanup();
    servicesCleanup();
    aboutCleanup();
    contactCleanup();
  };
};
