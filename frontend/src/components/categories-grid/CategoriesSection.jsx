import { Link } from "react-router";

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

export default function CategoriesSection() {
    return (
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
    );
}