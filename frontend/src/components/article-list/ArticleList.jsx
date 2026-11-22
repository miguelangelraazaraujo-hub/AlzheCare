import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./ArticleList.css";

const MOBILE_BREAKPOINT = 700;
const MOBILE_INCREMENT = 3;
const DESKTOP_PAGE_SIZE = 5;

function formatDate(date) {
    if (!date) return "Fecha no disponible";

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

export default function ArticleList(props) {
    const articles = props.articles ?? [];

    const articlesKey = articles
        .map(article => article.idArticulo)
        .join(",");

    return (
        <ArticleListContent
            key={`${articlesKey}-${props.limit ?? "all"}`}
            {...props}
        />
    );
}

function ArticleListContent({
    articles = [],
    loading = false,
    error = "",
    title = "Artículos",
    eyebrow = "INFORMACIÓN",
    emptyMessage = "No hay artículos disponibles.",
    limit,
}) {
    const [isMobile, setIsMobile] = useState(
        () => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [visibleCount, setVisibleCount] = useState(MOBILE_INCREMENT);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            `(max-width: ${MOBILE_BREAKPOINT}px)`
        );

        const handleChange = (event) => {
            setIsMobile(event.matches);
            setCurrentPage(1);
            setVisibleCount(MOBILE_INCREMENT);
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    const availableArticles = typeof limit === "number"
        ? articles.slice(0, limit)
        : articles;

    const totalPages = Math.ceil(
        availableArticles.length / DESKTOP_PAGE_SIZE
    );

    const visibleArticles = isMobile
        ? availableArticles.slice(0, visibleCount)
        : availableArticles.slice(
            (currentPage - 1) * DESKTOP_PAGE_SIZE,
            currentPage * DESKTOP_PAGE_SIZE
        );

    const hasMoreArticles = visibleCount < availableArticles.length;

    function handlePageChange(page) {
        setCurrentPage(page);
    }

    return (
        <section
            className="public-section articles-section"
            aria-label={title || "Resultados de artículos"}
        >
            {(title || eyebrow) && (
                <div className="section-heading">
                    <div>
                        {eyebrow && (
                            <span className="section-eyebrow">{eyebrow}</span>
                        )}
                        {title && <h2>{title}</h2>}
                    </div>
                </div>
            )}

            {loading && <p role="status">Cargando artículos...</p>}

            {!loading && error && (
                <p role="alert" className="error-message">{error}</p>
            )}

            {!loading && !error && availableArticles.length === 0 && (
                <p role="status">{emptyMessage}</p>
            )}

            {!loading && !error && availableArticles.length > 0 && (
                <>
                    <div className="articles-list">
                        {visibleArticles.map((article) => (
                            <Link
                                key={article.idArticulo}
                                to={`/publico/articulo/${article.idArticulo}`}
                                className="article-item"
                                aria-label={`${article.titulo}. Categorías: ${article.categorias?.map(category => category.nombre).join(", ") || "Información"
                                    }. Fecha de publicación: ${formatDate(article.fechaPublicacion)}. Leer artículo`}
                            >
                                <div className="article-image">
                                    <div className="article-visual" aria-hidden="true">
                                        +
                                    </div>
                                </div>

                                <div className="article-content">
                                    <span className="article-category">
                                        {article.categorias?.map(
                                            category => category.nombre
                                        ).join(", ") || "INFORMACIÓN"}
                                    </span>

                                    <h3 className="article-title">{article.titulo}</h3>

                                    <time
                                        className="article-date"
                                        dateTime={article.fechaPublicacion || undefined}
                                    >
                                        {formatDate(article.fechaPublicacion)}
                                    </time>
                                </div>

                                <span className="article-arrow" aria-hidden="true">
                                    →
                                </span>
                            </Link>
                        ))}
                    </div>

                    {isMobile && hasMoreArticles && (
                        <div className="articles-pagination mobile-pagination">
                            <button
                                type="button"
                                onClick={() => setVisibleCount(
                                    count => count + MOBILE_INCREMENT
                                )}
                            >
                                Cargar más artículos
                            </button>
                            <span>
                                Mostrando {visibleArticles.length} de {availableArticles.length}
                            </span>
                        </div>
                    )}

                    {!isMobile && totalPages > 1 && (
                        <nav
                            className="articles-pagination desktop-pagination"
                            aria-label="Paginación de artículos"
                        >
                            <button
                                type="button"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map(page => (
                                <button
                                    key={page}
                                    type="button"
                                    className={currentPage === page ? "active" : ""}
                                    aria-current={
                                        currentPage === page ? "page" : undefined
                                    }
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Siguiente
                            </button>
                        </nav>
                    )}
                </>
            )}
        </section>
    );
}