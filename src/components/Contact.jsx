function Contact({ showSentMessage = false }) {
  const openWhatsApp = (form) => {
    if (!form) return;

    const nombre = form.nombre.value || '';
    const mensaje = form.message.value || '';
    const text = encodeURIComponent(
      `Hola soy ${nombre}, mi objetivo es ${mensaje || '...'}`
    );
    window.open(`https://wa.me/5491128818819?text=${text}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openWhatsApp(e.target);
    window.location.assign('/mensaje-enviado#contacto');
  };

  return (
    <section 
      id="contacto"
      data-section-id="contact"
      className="section-shell relative isolate z-20 flex min-h-screen items-center justify-center bg-vekka-deep px-6 py-32 sm:py-36"
    >
      <div data-contact-block className="relative z-10 w-full max-w-3xl">
        <p
          data-contact-kicker
          className="font-mono text-[0.72rem] uppercase tracking-[0.35em] text-vekka-gold/40"
        >
          Contacto
        </p>

        <h2
          data-contact-title
          className="mt-4 font-display text-[clamp(2.6rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight text-vekka-gold"
        >
          Hablemos
        </h2>

        <p
          data-contact-support
          className="mt-3 max-w-2xl text-base leading-relaxed text-vekka-gold/70 sm:text-lg"
        >
          Contanos tu objetivo y te propondremos una estructura web clara, rápida y fácil de mantener sin costo.
        </p>

        <form
          data-contact-form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          <div className="space-y-3">
            <label
              htmlFor="nombre"
              className="block text-xs uppercase tracking-[0.24em] text-vekka-gold/50"
            >
              Tu nombre
            </label>
            <input
              data-contact-input
              id="nombre"
              name="nombre"
              type="text"
              required
              placeholder="Juan Pérez"
              className="w-full min-h-[3.4rem] rounded-sm border border-vekka-amber/30 bg-vekka-off px-5 text-base text-vekka-gold placeholder:text-vekka-gold/30 outline-none transition-[border-color,box-shadow] duration-200 focus:border-vekka-amber focus:shadow-[0_0_0_1px_rgba(217,119,6,0.35)]"
            />
          </div>

          <div className="space-y-3">
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-[0.24em] text-vekka-gold/50"
            >
              Tu email
            </label>
            <input
              data-contact-input
              id="email"
              name="email"
              type="email"
              required
              placeholder="nombre@ejemplo.com"
              className="w-full min-h-[3.4rem] rounded-sm border border-vekka-amber/30 bg-vekka-off px-5 text-base text-vekka-gold placeholder:text-vekka-gold/30 outline-none transition-[border-color,box-shadow] duration-200 focus:border-vekka-amber focus:shadow-[0_0_0_1px_rgba(217,119,6,0.35)]"
            />
          </div>

          <div className="space-y-3">
            <label
              htmlFor="telefono"
              className="block text-xs uppercase tracking-[0.24em] text-vekka-gold/50"
            >
              Tu teléfono
            </label>
            <input
              data-contact-input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="+54 11 1234-5678"
              className="w-full min-h-[3.4rem] rounded-sm border border-vekka-amber/30 bg-vekka-off px-5 text-base text-vekka-gold placeholder:text-vekka-gold/30 outline-none transition-[border-color,box-shadow] duration-200 focus:border-vekka-amber focus:shadow-[0_0_0_1px_rgba(217,119,6,0.35)]"
            />
          </div>

          <div className="space-y-3">
            <label
              htmlFor="message"
              className="block text-xs uppercase tracking-[0.24em] text-vekka-gold/50"
            >
              Tu mensaje
            </label>
            <textarea
              data-contact-input
              id="message"
              name="message"
              rows={4}
              placeholder="Contanos brevemente sobre tu proyecto..."
              className="w-full min-h-[7rem] resize-y rounded-sm border border-vekka-amber/30 bg-vekka-off px-5 py-4 text-base text-vekka-gold placeholder:text-vekka-gold/30 outline-none transition-[border-color,box-shadow] duration-200 focus:border-vekka-amber focus:shadow-[0_0_0_1px_rgba(217,119,6,0.35)]"
            />
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              className="min-h-[3.8rem] w-full rounded-sm border-2 border-vekka-amber bg-vekka-ink px-10 font-display text-base font-bold uppercase tracking-[0.22em] text-vekka-amber shadow-[0_0_24px_rgba(217,119,6,0.35),0_0_52px_rgba(217,119,6,0.22)] transition-all duration-200 hover:bg-vekka-amber hover:text-vekka-ink hover:shadow-[0_0_40px_rgba(217,119,6,0.55),0_0_70px_rgba(217,119,6,0.3)] sm:w-auto"
            >
              Enviar Mensaje
            </button>
          </div>

          {showSentMessage ? (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-vekka-amber">
              Tu mensaje ha sido enviado.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

export default Contact;

