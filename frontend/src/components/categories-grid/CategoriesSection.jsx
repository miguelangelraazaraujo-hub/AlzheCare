import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
    Brain,
    Activity,
    Heart,
    Pill,
    Users,
    Newspaper,
} from "lucide-react";

import contentService from "../../services/contentService";
import { useNotification } from "../../contexts/NotificationContext";

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

export default function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { notify } = useNotification();

    useEffect(() => {
        let active = true;

        async function loadCategories() {
            try {
                const data = await contentService.getCategories();

                if (active) {
                    setCategories(data);
                    setError("");
                }
            } catch (error) {
                notify(error.message, "error");
                if (active) {
                    setError(error.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadCategories();

        return () => {
            active = false;
        };
    }, [notify]);

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

            {loading && (
                <p role="status">Cargando categorías...</p>
            )}

            {error && (
                <p role="alert" className="error-message">
                    No se pudieron cargar las categorías: {error}
                </p>
            )}

            {!loading && !error && categories.length === 0 && (
                <p>No hay categorías disponibles actualmente.</p>
            )}

            {!loading && !error && categories.length > 0 && (
                <div className="category-grid">
                    {categories.map((category) => {
                        const Icon = categoryIcons[category.nombre] || Brain;
                        const color = categoryColors[category.nombre] || "blue";

                        return (
                            <Link
                                key={category.idCategoria}
                                to={`/publico/categorias?categoryId=${category.idCategoria}`}
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