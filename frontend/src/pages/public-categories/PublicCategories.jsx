import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
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
import PublicHeader from "../../components/layout/PublicHeader";
import PublicBottomNav from "../../components/layout/PublicBottomNav";
import ArticleList from "../../components/article-list/ArticleList";
import PublicSearchBar from "../../components/public-search-bar/PublicSearchBar";

import "./PublicCategories.css";

const categoryIcons = {
    Alzheimer: Brain,
    Síntomas: Activity,
    Cuidados: Heart,
    Tratamientos: Pill,
    "Familiares y cuidadores": Users,
    Noticias: Newspaper,
};

export default function PublicCategories() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { notify } = useNotification();

    const categoryId = searchParams.get("categoryId");

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState("");

    const [articles, setArticles] = useState([]);
    const [articlesLoading, setArticlesLoading] = useState(true);
    const [articlesError, setArticlesError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadCategories() {
            setCategoriesLoading(true);
            setCategoriesError("");

            try {
                const data = await contentService.getCategories();

                if (active) {
                    setCategories(data);
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

        loadCategories();

        return () => {
            active = false;
        };
    }, [notify]);

    useEffect(() => {
        let active = true;

        async function loadArticles() {
            setArticlesLoading(true);
            setArticlesError("");

            try {
                const data = await contentService.getArticles({
                    categoryId: categoryId || undefined,
                });

                if (active) {
                    setArticles(data);
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

        loadArticles();

        return () => {
            active = false;
        };
    }, [categoryId, notify]);

    const selectedCategory = categories.find(
        (category) => String(category.idCategoria) === categoryId
    );

    function handleCategorySelect(id) {
        const nextParams = new URLSearchParams(searchParams);

        if (String(id) === categoryId) {
            nextParams.delete("categoryId");
        } else {
            nextParams.set("categoryId", String(id));
        }

        setSearchParams(nextParams);
    }

    function handleClearFilter() {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete("categoryId");
        setSearchParams(nextParams);
    }

    return (
        <div className="public-categories">
            <PublicHeader />
            <main className="public-categories-page">
                <section className="categories-page-header">
                    <span className="section-eyebrow">EXPLORA</span>
                    <h1>Información por categorías</h1>
                    <p>
                        Encuentra información y recursos sobre el Alzheimer,
                        sus síntomas, cuidados y otros temas relacionados.
                    </p>
                </section>

                <section className="category-filters" aria-labelledby="category-filters-title">
                    <div className="category-filters-heading">
                        <h2 id="category-filters-title">Categorías</h2>

                        {categoryId && (
                            <button
                                type="button"
                                className="clear-category-filter"
                                onClick={handleClearFilter}
                            >
                                Quitar filtro
                            </button>
                        )}
                    </div>

                    {categoriesLoading && (
                        <p role="status">Cargando categorías...</p>
                    )}

                    {!categoriesLoading && categoriesError && (
                        <p role="alert" className="error-message">
                            No se pudieron cargar las categorías.
                        </p>
                    )}

                    {!categoriesLoading && !categoriesError && categories.length === 0 && (
                        <p>No hay categorías disponibles actualmente.</p>
                    )}

                    {!categoriesLoading && !categoriesError && categories.length > 0 && (
                        <div className="category-filter-list">
                            {categories.map((category) => {
                                const Icon = categoryIcons[category.nombre] || Brain;
                                const isSelected =
                                    String(category.idCategoria) === categoryId;

                                return (
                                    <button
                                        key={category.idCategoria}
                                        type="button"
                                        className={`category-filter-button ${isSelected ? "active" : ""
                                            }`}
                                        onClick={() =>
                                            handleCategorySelect(category.idCategoria)
                                        }
                                        aria-pressed={isSelected}
                                    >
                                        <Icon size={18} aria-hidden="true" />
                                        <span>{category.nombre}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    <PublicSearchBar />
                </section>

                <section className="category-results">
                    <div className="category-results-heading">
                        <div>
                            <span className="section-eyebrow">RESULTADOS</span>
                            <h2>
                                {selectedCategory
                                    ? selectedCategory.nombre
                                    : "Todos los artículos"}
                            </h2>
                            {selectedCategory?.descripcion && (
                                <p>{selectedCategory.descripcion}</p>
                            )}
                        </div>

                        {!articlesLoading && !articlesError && (
                            <span className="article-results-count">
                                {articles.length}{" "}
                                {articles.length === 1 ? "artículo" : "artículos"}
                            </span>
                        )}
                    </div>

                    <ArticleList
                        articles={articles}
                        loading={articlesLoading}
                        error={articlesError}
                        title=""
                        eyebrow=""
                        emptyMessage={
                            categoryId
                                ? "No hay artículos disponibles en esta categoría."
                                : "Todavía no hay artículos publicados."
                        }
                    />
                </section>
            </main>
            <PublicBottomNav />
        </div>
    );
}