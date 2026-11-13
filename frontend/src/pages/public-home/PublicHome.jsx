import { useEffect, useState } from "react";
import { Link } from "react-router";

import PublicHeader from "../../components/layout/PublicHeader";
import PublicBottomNav from "../../components/layout/PublicBottomNav";
import CategoriesSection from "../../components/categories-grid/CategoriesSection";
import ArticleList from "../../components/article-list/ArticleList";
import PublicSearchBar from "../../components/public-search-bar/PublicSearchBar";

import contentService from "../../services/contentService";
import "./PublicHome.css";

export default function PublicHome() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadArticles() {
            try {
                const data = await contentService.getArticles();

                if (active) {
                    setArticles(data);
                    setError("");
                }
            } catch {
                if (active) {
                    setError(
                        "No se ha podido cargar la información. Compruebe su conexión e inténtelo de nuevo más tarde."
                    );
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

    const featuredArticle = articles[0] || null;

    const newsArticles = articles.filter((article) =>
        article.categorias?.some(
            (category) => category.nombre === "Noticias"
        )
    );

    return (
        <div className="public-home">
            <PublicHeader />

            <main className="public-main">
                <section className="public-hero">
                    <span className="public-eyebrow">
                        INFORMACIÓN Y ACOMPAÑAMIENTO
                    </span>

                    <h1>Información para cuidar mejor</h1>

                    <p>
                        Encuentra información clara y recursos de apoyo sobre el Alzheimer
                        para ti y las personas que te rodean.
                    </p>

                    <PublicSearchBar />
                </section>

                <CategoriesSection />

                <section className="public-section">
                    <div className="section-heading">
                        <div>
                            <span className="section-eyebrow">RECOMENDADO</span>
                            <h2>Artículo destacado</h2>
                        </div>
                    </div>

                    {loading && (
                        <p role="status">Cargando artículo destacado...</p>
                    )}

                    {!loading && error && (
                        <p role="alert" className="error-message">
                            No se ha podido cargar el artículo destacado.
                        </p>
                    )}

                    {!loading && !error && !featuredArticle && (
                        <p>No hay artículos disponibles actualmente.</p>
                    )}

                    {!loading && !error && featuredArticle && (
                        <Link
                            to={`/publico/articulo/${featuredArticle.idArticulo}`}
                            className="featured-article"
                        >
                            <div className="featured-visual" aria-hidden="true">
                                <div className="featured-circle">
                                    <span>+</span>
                                </div>
                            </div>

                            <div className="featured-content">
                                <span className="article-category">
                                    {featuredArticle.categorias
                                        ?.map((category) => category.nombre)
                                        .join(", ") || "GUÍA INFORMATIVA"}
                                </span>

                                <h3>{featuredArticle.titulo}</h3>

                                <p>
                                    {featuredArticle.contenido.length > 180
                                        ? `${featuredArticle.contenido.slice(0, 180)}...`
                                        : featuredArticle.contenido}
                                </p>

                                <span className="article-read">
                                    Leer artículo →
                                </span>
                            </div>
                        </Link>
                    )}
                </section>

                <ArticleList
                    articles={newsArticles}
                    loading={loading}
                    error={error}
                    title="Información y novedades"
                    eyebrow="PARA ESTAR AL DÍA"
                    emptyMessage="Todavía no hay noticias publicadas."
                    limit={3}
                />

                <section className="public-help">
                    <div>
                        <h2>¿Necesitas ayuda?</h2>
                        <p>
                            Consulta cómo utilizar AlzheCare y encontrar sus recursos.
                        </p>
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