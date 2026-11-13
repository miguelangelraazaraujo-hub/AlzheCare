import { useEffect, useState } from "react";
import { Link } from "react-router";
import contentService from "../../services/contentService";

function formatDate(date) {
    if (!date) {
        return "Fecha no disponible";
    }

    return new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

export default function NewsList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadArticles() {
            try {
                const data = await contentService.getArticles();

                if (active) {
                    setArticles(data.slice(0, 3));
                    setError("");
                }
            } catch (error) {
                if (active) {
                    setError(error.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadArticles();

        return () => {
            active = false;
        };
    }, []);

    return (
        <section className="public-section latest-section">
            <div className="section-heading">
                <div>
                    <span className="section-eyebrow">PARA ESTAR AL DÍA</span>
                    <h2>Información y novedades</h2>
                </div>
            </div>

            {loading && (
                <p role="status">Cargando artículos...</p>
            )}

            {error && (
                <p role="alert" className="error-message">
                    No se pudieron cargar los artículos: {error}
                </p>
            )}

            {!loading && !error && articles.length === 0 && (
                <p>No hay artículos publicados actualmente.</p>
            )}

            {!loading && !error && articles.length > 0 && (
                <div className="latest-list">
                    {articles.map((article) => (
                        <Link
                            key={article.idArticulo}
                            to={`/publico/articulo/${article.idArticulo}`}
                            className="latest-article"
                        >
                            <span
                                className="latest-visual"
                                aria-hidden="true"
                            >
                                +
                            </span>

                            <span className="latest-content">
                                <span className="article-category">
                                    {article.categorias
                                        ?.map((category) => category.nombre)
                                        .join(", ") || "INFORMACIÓN"}
                                </span>

                                <strong>{article.titulo}</strong>

                                <span className="latest-date">
                                    {formatDate(article.fechaPublicacion)}
                                </span>
                            </span>

                            <span
                                className="latest-arrow"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}