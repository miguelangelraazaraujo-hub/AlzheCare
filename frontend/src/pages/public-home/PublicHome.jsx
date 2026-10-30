
import { Link } from "react-router";
import PublicHeader from "../../components/layout/PublicHeader";
import PublicBottomNav from "../../components/layout/PublicBottomNav";
import CategoriesSection from "../../components/categories-grid/CategoriesSection";
import NewsList from "../../components/news-list/NewsList";
import PublicSearchBar from "../../components/public-search-bar/PublicSearchBar";
import "./PublicHome.css";

export default function PublicHome() {
    return (
        <div className="public-home">
            <PublicHeader />

            <main className="public-main">
                <section className="public-hero">
                    <span className="public-eyebrow">INFORMACIÓN Y ACOMPAÑAMIENTO</span>
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

                    <Link
                        to="/publico/articulo/primeros-pasos"
                        className="featured-article"
                    >
                        <div className="featured-visual" aria-hidden="true">
                            <div className="featured-circle">
                                <span>+</span>
                            </div>
                        </div>
                        <div className="featured-content">
                            <span className="article-category">GUÍA INFORMATIVA</span>
                            <h3>Comprender el Alzheimer: primeros pasos</h3>
                            <p>
                                Una introducción a la enfermedad, sus síntomas y los recursos
                                disponibles para pacientes y cuidadores.
                            </p>
                            <span className="article-read">Leer artículo →</span>
                        </div>
                    </Link>
                </section>

                <NewsList />

                <section className="public-help">
                    <div>
                        <h2>¿Necesitas ayuda?</h2>
                        <p>Consulta cómo utilizar AlzheCare y encontrar sus recursos.</p>
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