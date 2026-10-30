
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import PublicHeader from "../../components/layout/PublicHeader";
import PublicBottomNav from "../../components/layout/PublicBottomNav";
import "./PublicHome.css";

const categories = [
  {
    title: "Tratamientos",
    description: "Conoce las opciones de tratamiento.",
    icon: "✚",
    color: "blue",
    path: "/publico/categorias?tipo=tratamientos",
  },
  {
    title: "Cuidados",
    description: "Consejos para el día a día.",
    icon: "♡",
    color: "purple",
    path: "/publico/categorias?tipo=cuidados",
  },
  {
    title: "Asistencia",
    description: "Recursos y servicios de apoyo.",
    icon: "⌂",
    color: "teal",
    path: "/publico/categorias?tipo=asistencia",
  },
  {
    title: "Noticias",
    description: "Novedades e información reciente.",
    icon: "▤",
    color: "amber",
    path: "/publico/categorias?tipo=noticias",
  },
];

const news = [
  {
    id: "bienestar-diario",
    category: "CUIDADOS",
    title: "Pequeños hábitos para favorecer el bienestar diario",
    date: "Consejos prácticos",
  },
  {
    id: "apoyo-cuidadores",
    category: "ASISTENCIA",
    title: "La importancia del apoyo a familiares y cuidadores",
    date: "Recursos de apoyo",
  },
];

export default function PublicHome() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const search = query.trim();
    navigate(
      search
        ? `/publico/resultados?q=${encodeURIComponent(search)}`
        : "/publico/busqueda"
    );
  };

  return (
    <div className="public-home">
      <PublicHeader />

      <main className="public-main">
        <section className="public-hero">
          <span className="public-eyebrow">INFORMACIÓN Y ACOMPAÑAMIENTO</span>
          <h1>Información para cuidar mejor</h1>
          <p>
            Encuentra información clara y recursos de apoyo sobre el Alzheimer
            para ti y las personas que te rodean.
          </p>

          <form className="public-search" onSubmit={handleSearch}>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="¿Qué información necesitas?"
              aria-label="Buscar información"
            />
            <button type="submit">Buscar</button>
          </form>
        </section>

        <section className="public-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">EXPLORA</span>
              <h2>¿Qué necesitas saber?</h2>
            </div>
            <Link to="/publico/categorias" className="text-link">
              Ver todas →
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={category.path}
                className="category-card"
              >
                <span className={`category-icon ${category.color}`}>
                  {category.icon}
                </span>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className="category-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="public-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">RECOMENDADO</span>
              <h2>Artículo destacado</h2>
            </div>
          </div>

          <Link
            to="/publico/articulo/primeros-pasos"
            className="featured-article"
          >
            <div className="featured-visual" aria-hidden="true">
              <div className="featured-circle">
                <span>+</span>
              </div>
            </div>
            <div className="featured-content">
              <span className="article-category">GUÍA INFORMATIVA</span>
              <h3>Comprender el Alzheimer: primeros pasos</h3>
              <p>
                Una introducción a la enfermedad, sus síntomas y los recursos
                disponibles para pacientes y cuidadores.
              </p>
              <span className="article-read">Leer artículo →</span>
            </div>
          </Link>
        </section>

        <section className="public-section latest-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">PARA ESTAR AL DÍA</span>
              <h2>Información y novedades</h2>
            </div>
          </div>

          <div className="latest-list">
            {news.map((article) => (
              <Link
                key={article.id}
                to={`/publico/articulo/${article.id}`}
                className="latest-article"
              >
                <span className="latest-visual" aria-hidden="true">+</span>
                <span className="latest-content">
                  <span className="article-category">{article.category}</span>
                  <strong>{article.title}</strong>
                  <span className="latest-date">{article.date}</span>
                </span>
                <span className="latest-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="public-help">
          <div>
            <h2>¿Necesitas ayuda?</h2>
            <p>Consulta cómo utilizar AlzheCare y encontrar sus recursos.</p>
          </div>
          <Link to="/publico/ayuda" className="help-link">
            Consultar ayuda →
          </Link>
        </section>
      </main>

      <PublicBottomNav />
    </div>
  );
}