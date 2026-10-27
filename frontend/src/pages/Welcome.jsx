
import { useState } from "react";
import "./Welcome.css";

const slides = [
  {
    eyebrow: "BIENVENIDO A ALZHECARE",
    title: "Información hoy, cuidado siempre",
    description:
      "Un espacio de información y apoyo para personas con Alzheimer, sus familias y cuidadores.",
    visual: "welcome",
  },
  {
    eyebrow: "INFORMACIÓN PARA TODOS",
    title: "Comprende. Aprende. Acompaña.",
    description:
      "Consulta información sobre Alzheimer, tratamientos, cuidados y novedades en un mismo lugar.",
    visual: "information",
  },
  {
    eyebrow: "TU ESPACIO PERSONAL",
    title: "Un apoyo adaptado a ti",
    description:
      "Accede a tu espacio personal como paciente o cuidador y descubre los recursos de AlzheCare.",
    visual: "personal",
  },
];

export default function Welcome({ onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === slides.length;

  const nextSlide = () => {
    setCurrentSlide((current) => Math.min(current + 1, slides.length));
  };

  const previousSlide = () => {
    setCurrentSlide((current) => Math.max(current - 1, 0));
  };

  const finishIntro = () => setCurrentSlide(slides.length);

  return (
    <main className="welcome-page">
      <section className="welcome-card">
        <header className="welcome-header">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <img src="src/assets/AlzheCare.png" height={39} width={39}/>
            </div>
            <span>AlzheCare</span>
          </div>

          {!isLastSlide && (
            <button className="skip-button" onClick={finishIntro}>
              Saltar introducción
            </button>
          )}
        </header>

        {!isLastSlide ? (
          <>
            <div className={`welcome-visual visual-${slides[currentSlide].visual}`}>
              {currentSlide === 0 && (
                <div className="illustration-content">
                  <div className="illustration-circle circle-one" />
                  <div className="illustration-circle circle-two" />
                  <div className="care-symbol">
                    <svg viewBox="0 0 120 120" fill="none">
                      <path
                        d="M60 100S15 74 15 43a24 24 0 0 1 45-12 24 24 0 0 1 45 12c0 31-45 57-45 57Z"
                        fill="#4658D9"
                      />
                      <path
                        d="M30 61h17l9-17 12 34 9-17h14"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="floating-note note-one">
                    <span className="note-dot" />
                    Información fiable
                  </div>
                  <div className="floating-note note-two">
                    <span className="note-dot turquoise" />
                    Apoyo para cuidadores
                  </div>
                </div>
              )}

              {currentSlide === 1 && (
                <div className="feature-illustration">
                  <div className="feature-main-icon">
                    <svg viewBox="0 0 80 80" fill="none">
                      <rect x="15" y="10" width="50" height="60" rx="8"
                        stroke="currentColor" strokeWidth="3" />
                      <path d="M27 27h26M27 39h26M27 51h17"
                        stroke="currentColor" strokeWidth="3"
                        strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="feature-mini mini-one">Artículos</div>
                  <div className="feature-mini mini-two">Cuidados</div>
                  <div className="feature-mini mini-three">Noticias</div>
                </div>
              )}

              {currentSlide === 2 && (
                <div className="feature-illustration personal-illustration">
                  <div className="profile-circle">
                    <svg viewBox="0 0 80 80" fill="none">
                      <circle cx="40" cy="26" r="13"
                        stroke="currentColor" strokeWidth="3" />
                      <path d="M15 68c0-15 10-24 25-24s25 9 25 24"
                        stroke="currentColor" strokeWidth="3"
                        strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="profile-label">Tu espacio, a tu ritmo</div>
                  <div className="profile-decoration decoration-one" />
                  <div className="profile-decoration decoration-two" />
                </div>
              )}
            </div>

            <div className="welcome-copy" aria-live="polite">
              <span className="welcome-eyebrow">
                {slides[currentSlide].eyebrow}
              </span>
              <h1>{slides[currentSlide].title}</h1>
              <p>{slides[currentSlide].description}</p>
            </div>

            <div className="welcome-footer">
              <div className="slide-indicators" aria-label="Progreso de introducción">
                {slides.map((slide, index) => (
                  <button
                    key={slide.visual}
                    className={`slide-dot ${index === currentSlide ? "active" : ""}`}
                    aria-label={`Ir a la diapositiva ${index + 1}`}
                    aria-current={index === currentSlide ? "step" : undefined}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>

              <div className="welcome-actions">
                {currentSlide > 0 && (
                  <button className="secondary-button" onClick={previousSlide}>
                    Anterior
                  </button>
                )}
                <button className="primary-button" onClick={nextSlide}>
                  Siguiente
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="access-screen">
            <div className="access-icon">
              <svg viewBox="0 0 80 80" fill="none">
                <path
                  d="M40 67S10 49 10 28a17 17 0 0 1 30-11 17 17 0 0 1 30 11c0 21-30 39-30 39Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span className="welcome-eyebrow">EMPIEZA CUANDO QUIERAS</span>
            <h1>¿Cómo quieres acceder?</h1>
            <p className="access-description">
              Consulta nuestros recursos o crea tu espacio personal.
            </p>

            <div className="access-options">
              <button
                className="primary-button access-button"
                onClick={() => onNavigate("public")}
              >
                Consultar sin cuenta <span aria-hidden="true">→</span>
              </button>
              <button
                className="secondary-button access-button"
                onClick={() => onNavigate("login")}
              >
                Iniciar sesión
              </button>
              <button
                className="outline-button access-button"
                onClick={() => onNavigate("register")}
              >
                Crear cuenta
              </button>
            </div>

            <button className="back-to-intro" onClick={previousSlide}>
              ← Volver a la introducción
            </button>
          </div>
        )}

        <footer className="welcome-legal">
          Información y acompañamiento para vivir y cuidar mejor.
        </footer>
      </section>
    </main>
  );
}
