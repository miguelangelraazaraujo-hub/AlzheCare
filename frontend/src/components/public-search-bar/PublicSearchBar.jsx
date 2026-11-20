import { useState } from "react";
import { useNavigate } from "react-router";
import "./PublicSearchBar.css";

export default function PublicSearchBar({ value = "", onSearch }) {
    const [query, setQuery] = useState(value);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const search = query.trim();

        if (onSearch) {
            onSearch(search);
            return;
        }

        navigate(
            search
                ? `/publico/categorias?q=${encodeURIComponent(search)}`
                : "/publico/busqueda"
        );
    };

    return (
        <form className="public-search" onSubmit={handleSubmit}>
            <span className="search-icon" aria-hidden="true">⌕</span>

            <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="¿Qué información necesitas?"
                aria-label="Buscar información"
            />

            <button type="submit">Buscar</button>
        </form>
    );
}