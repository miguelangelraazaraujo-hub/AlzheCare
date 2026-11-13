import { Link } from "react-router";

function formatDate(date) {
    if (!date) {
        return "Fecha no disponible";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Fecha no disponible";
    }

    return new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(parsedDate);
}

export default function ArticleList({
    articles = [],
    loading = false,
    error = "",
    title = "Artículos",
    eyebrow = "INFORMACIÓN",
    emptyMessage = "No hay artículos disponibles.",
    limit,
}) {
    const visibleArticles =
        typeof limit === "number"
            ? articles.slice(0, limit)
            : articles;

    return (
        <section className="public-section articles-section">
            <div className="section-heading">
                <div>
                    <span className="section-eyebrow">{eyebrow}</span>
                    <h2>{title}</h2>
                </div>
            </div>

            {loading && (
                <p role="status">Cargando artículos...</p>
            )}

            {!loading && error && (
                <p role="alert" className="error-message">
                    {error}
                </p>
            )}

            {!loading && !error && visibleArticles.length === 0 && (
                <p>{emptyMessage}</p>
            )}

            {!loading && !error && visibleArticles.length > 0 && (
                <div className="articles-list">
                    {visibleArticles.map((article) => (
                        <Link
                            key={article.idArticulo}
                            to={`/publico/articulo/${article.idArticulo}`}
                            className="article-item"
                        >
                            <span
                                className="article-visual"
                                aria-hidden="true"
                            >
                                +
                            </span>

                            <span className="article-content">
                                <span className="article-category">
                                    {article.categorias
                                        ?.map((category) => category.nombre)
                                        .join(", ") || "INFORMACIÓN"}
                                </span>

                                <strong>{article.titulo}</strong>

                                <span className="article-date">
                                    {formatDate(article.fechaPublicacion)}
                                </span>
                            </span>

                            <span
                                className="article-arrow"
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