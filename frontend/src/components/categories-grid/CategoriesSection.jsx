import { Link } from "react-router";
import {
    Brain,
    Activity,
    Heart,
    Pill,
    Users,
    Newspaper,
} from "lucide-react";

const categoryIcons = {
    Alzheimer: Brain,
    Síntomas: Activity,
    Cuidados: Heart,
    Tratamientos: Pill,
    "Familiares y cuidadores": Users,
    Noticias: Newspaper,
};

const categoryColors = {
    Alzheimer: "blue",
    Síntomas: "amber",
    Cuidados: "purple",
    Tratamientos: "teal",
    "Familiares y cuidadores": "purple",
    Noticias: "blue",
};

export default function CategoriesSection({
    categories = [],
    loading = false,
    error = "",
}) {
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

            {!loading && error && (
                <p role="alert" className="error-message">
                    No se pudieron cargar las categorías.
                </p>
            )}

            {loading && (
                <div className="category-grid category-skeleton-grid" aria-hidden="true">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div className="category-card category-skeleton" key={index}>
                            <div className="skeleton-block skeleton-icon"></div>
                            <div className="skeleton-line skeleton-title"></div>
                            <div className="skeleton-line skeleton-text"></div>
                            <div className="skeleton-line skeleton-text short"></div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && categories.length === 0 && (
                <p>No hay categorías disponibles actualmente.</p>
            )}

            {!loading && !error && categories.length > 0 && (
                <div className="category-grid">
                    {categories.map((category) => {
                        const Icon =
                            categoryIcons[category.nombre] || Brain;

                        const color =
                            categoryColors[category.nombre] || "blue";

                        return (
                            <Link
                                key={category.idCategoria}
                                to={`/publico/categorias?categoryIds=${category.idCategoria}`}
                                className="category-card"
                            >
                                <span className={`category-icon ${color}`}>
                                    <Icon
                                        size={24}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                </span>

                                <h3>{category.nombre}</h3>

                                <p>
                                    {category.descripcion ||
                                        "Consulta los artículos de esta categoría."}
                                </p>

                                <span
                                    className="category-arrow"
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    );
}