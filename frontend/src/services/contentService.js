import { request } from "./authService";

const contentService = {
    getCategories() {
        return request("/api/categories");
    },

    getArticles({ search, categoryId } = {}) {
        const params = new URLSearchParams();

        if (search?.trim()) {
            params.set("search", search.trim());
        }

        if (categoryId) {
            params.set("categoryId", categoryId);
        }

        const query = params.toString();

        return request(`/api/articles${query ? `?${query}` : ""}`);
    },

    getArticleById(id) {
        return request(`/api/articles/${id}`);
    },
};

export default contentService;