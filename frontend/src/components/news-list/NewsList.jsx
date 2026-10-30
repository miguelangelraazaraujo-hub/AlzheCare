import { Link } from "react-router";

const news = [
    {
        id: "bienestar-diario",
        category: "CUIDADOS",
        title: "Pequeños hábitos para favorecer el bienestar diario",
        date: "Consejos prácticos",
    },
    {
        id: "apoyo-cuidadores",
        category: "ASISTENCIA",
        title: "La importancia del apoyo a familiares y cuidadores",
        date: "Recursos de apoyo",
    },
];

export default function NewsList() {
    return (
        <section className="public-section latest-section">
            <div className="section-heading">
                <div>
                    <span className="section-eyebrow">PARA ESTAR AL DÍA</span>
                    <h2>Información y novedades</h2>
                </div>
            </div>

            <div className="latest-list">
                {news.map((article) => (
                    <Link
                        key={article.id}
                        to={`/publico/articulo/${article.id}`}
                        className="latest-article"
                    >
                        <span className="latest-visual" aria-hidden="true">+</span>
                        <span className="latest-content">
                            <span className="article-category">{article.category}</span>
                            <strong>{article.title}</strong>
                            <span className="latest-date">{article.date}</span>
                        </span>
                        <span className="latest-arrow" aria-hidden="true">→</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}