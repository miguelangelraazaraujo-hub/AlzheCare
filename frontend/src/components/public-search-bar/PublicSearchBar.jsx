import { useState } from "react";
import { useNavigate } from "react-router";


export default function PublicSearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    
    const handleSearch = (event) => {
        event.preventDefault();
    
        const search = query.trim();
        navigate(
          search
            ? `/publico/resultados?q=${encodeURIComponent(search)}`
            : "/publico/busqueda"
        );
    };

    return (
        <form className="public-search" onSubmit={handleSearch}>
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