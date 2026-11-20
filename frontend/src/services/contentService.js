import { request } from "./authService";

const contentService = {
    getCategories() {
        return request("/api/categories");
    },

    getArticles({ search, categoryIds } = {}) {
        const params = new URLSearchParams();

        if (search?.trim()) {
            params.set("search", search.trim());
        }

        if (categoryIds?.length) {
            params.set("categoryIds", categoryIds.join(","));
        }

        const query = params.toString();

        return request(`/api/articles${query ? `?${query}` : ""}`);
    },

    getArticleById(id) {
        return request(`/api/articles/${id}`);
    },
};

export default contentService;