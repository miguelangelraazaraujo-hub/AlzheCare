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

function parseCategoryIds(value) {
    if (!value) return [];

    return [...new Set(
        value
            .split(",")
            .map((id) => id.trim())
            .filter((id) => /^\d+$/.test(id))
    )];
}

export default function PublicCategories() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { notify } = useNotification();

    const search = searchParams.get("q") || "";
    const categoryIds = parseCategoryIds(searchParams.get("categoryIds"));

    const categoryIdsKey = categoryIds.join(",");

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
                    search,
                    categoryIds: categoryIdsKey
                        ? categoryIdsKey.split(",").map(Number)
                        : undefined,
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
    }, [search, categoryIdsKey, notify]);

    function handleSearch(query) {
        const nextParams = new URLSearchParams(searchParams);

        if (query) {
            nextParams.set("q", query);
        } else {
            nextParams.delete("q");
        }

        setSearchParams(nextParams);
    }

    function handleCategorySelect(id) {
        const idString = String(id);
        const nextParams = new URLSearchParams(searchParams);
        const currentIds = parseCategoryIds(
            nextParams.get("categoryIds")
        );

        const updatedIds = currentIds.includes(idString)
            ? currentIds.filter((currentId) => currentId !== idString)
            : [...currentIds, idString];

        if (updatedIds.length > 0) {
            nextParams.set("categoryIds", updatedIds.join(","));
        } else {
            nextParams.delete("categoryIds");
        }

        setSearchParams(nextParams);
    }

    const hasFilters = Boolean(search || categoryIds.length > 0);

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

                <section
                    className="category-filters"
                    aria-labelledby="category-filters-title"
                >
                    <div className="category-filters-heading">
                        <h2 id="category-filters-title">Categorías</h2>

                        {categoryIds.length > 0 && (
                            <button
                                type="button"
                                className="clear-category-filter"
                                onClick={() => {
                                    const nextParams = new URLSearchParams(searchParams);
                                    nextParams.delete("categoryIds");
                                    setSearchParams(nextParams);
                                }}
                            >
                                Quitar filtros de categoría
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

                    {!categoriesLoading &&
                        !categoriesError &&
                        categories.length === 0 && (
                            <p>No hay categorías disponibles actualmente.</p>
                        )}

                    {!categoriesLoading &&
                        !categoriesError &&
                        categories.length > 0 && (
                            <div
                                className="category-filter-list"
                                role="group"
                                aria-label="Filtrar artículos por categoría"
                            >
                                {categories.map((category) => {
                                    const Icon =
                                        categoryIcons[category.nombre] || Brain;

                                    const isSelected = categoryIds.includes(
                                        String(category.idCategoria)
                                    );

                                    return (
                                        <button
                                            key={category.idCategoria}
                                            type="button"
                                            className={`category-filter-button ${isSelected ? "active" : ""
                                                }`}
                                            onClick={() =>
                                                handleCategorySelect(
                                                    category.idCategoria
                                                )
                                            }
                                            aria-pressed={isSelected}
                                        >
                                            <Icon
                                                size={18}
                                                aria-hidden="true"
                                            />
                                            <span>{category.nombre}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                    <PublicSearchBar
                        key={search}
                        value={search}
                        onSearch={handleSearch}
                    />
                </section>

                <section className="category-results">
                    <div className="category-results-heading">
                        <div>
                            <span className="section-eyebrow">
                                RESULTADOS
                            </span>

                            <h2>
                                {hasFilters
                                    ? "Artículos encontrados"
                                    : "Todos los artículos"}
                            </h2>
                        </div>

                        {!articlesLoading && !articlesError && (
                            <span
                                className="article-results-count"
                                role="status"
                                aria-live="polite"
                            >
                                {articles.length}{" "}
                                {articles.length === 1
                                    ? "artículo"
                                    : "artículos"}
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
                            hasFilters
                                ? "No se han encontrado artículos con los criterios seleccionados."
                                : "Todavía no hay artículos publicados."
                        }
                    />
                </section>
            </main>
            <PublicBottomNav />
        </div>
    );
}