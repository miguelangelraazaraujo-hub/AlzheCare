import { useEffect, useState } from "react";
import { Link } from "react-router";

import PublicHeader from "../../components/layout/PublicHeader";
import PublicBottomNav from "../../components/layout/PublicBottomNav";
import CategoriesSection from "../../components/categories-grid/CategoriesSection";
import ArticleList from "../../components/article-list/ArticleList";
import PublicSearchBar from "../../components/public-search-bar/PublicSearchBar";

import contentService from "../../services/contentService";
import { useNotification } from "../../contexts/NotificationContext";

import "./PublicHome.css";

export default function PublicHome() {
    const { notify } = useNotification();

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState("");

    const [articles, setArticles] = useState([]);
    const [articlesLoading, setArticlesLoading] = useState(true);
    const [articlesError, setArticlesError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadCategories() {
            try {
                const data = await contentService.getCategories();

                if (active) {
                    setCategories(data);
                    setCategoriesError("");
                }
            } catch (error) {
                if (active) {
                    setCategoriesError(error.message);
                    notify(error.message, "error");
                }
            } finally {
                if (active) {
                    setCategoriesLoading(false);
                }
            }
        }

        async function loadArticles() {
            try {
                const data = await contentService.getArticles();

                if (active) {
                    setArticles(data);
                    setArticlesError("");
                }
            } catch (error) {
                if (active) {
                    setArticlesError(error.message);
                    notify(error.message, "error");
                }
            } finally {
                if (active) {
                    setArticlesLoading(false);
                }
            }
        }

        loadCategories();
        loadArticles();

        return () => {
            active = false;
        };
    }, [notify]);

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

                <CategoriesSection
                    categories={categories}
                    loading={categoriesLoading}
                    error={categoriesError}
                />

                <section className="public-section">
                    <div className="section-heading">
                        <div>
                            <span className="section-eyebrow">RECOMENDADO</span>
                            <h2>Artículo destacado</h2>
                        </div>
                    </div>

                    {articlesLoading && (
                        <div className="featured-article featured-skeleton" aria-hidden="true">
                            <div className="featured-visual skeleton-block"></div>

                            <div className="featured-content">
                                <div className="skeleton-line skeleton-category"></div>
                                <div className="skeleton-line skeleton-title"></div>
                                <div className="skeleton-line skeleton-title short"></div>
                                <div className="skeleton-line skeleton-text"></div>
                                <div className="skeleton-line skeleton-text short"></div>
                                <div className="skeleton-line skeleton-button"></div>
                            </div>
                        </div>
                    )}

                    {!articlesLoading && articlesError && (
                        <p role="alert" className="error-message">
                            No se ha podido cargar el artículo destacado.
                        </p>
                    )}

                    {!articlesLoading && !articlesError && !featuredArticle && (
                        <p>No hay artículos disponibles actualmente.</p>
                    )}

                    {!articlesLoading && !articlesError && featuredArticle && (
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
                    loading={articlesLoading}
                    error={articlesError}
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