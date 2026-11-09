
import { Link } from "react-router";
import "./Auth.css";

export default function RegisterRole() {
    return (
        <main className="auth-page">
            <section className="auth-card">
                <Link to="/bienvenida" className="auth-brand">
                    AlzheCare
                </Link>

                <div className="auth-heading">
                    <span className="auth-eyebrow">CREA TU CUENTA</span>
                    <h1>¿Cómo vas a utilizar AlzheCare?</h1>
                    <p>
                        Selecciona el tipo de cuenta que mejor se adapte a ti.
                    </p>
                </div>

                <div className="role-options">
                    <Link
                        to="/registro/paciente"
                        className="role-option"
                    >
                        <span className="role-icon pacient" aria-hidden="true">
                            P
                        </span>
                        <span className="role-content">
                            <strong>Soy paciente</strong>
                            <span>
                                Quiero acceder a mi espacio personal y a sus recursos.
                            </span>
                        </span>
                        <span className="role-arrow" aria-hidden="true">→</span>
                    </Link>

                    <Link
                        to="/registro/cuidador"
                        className="role-option caregiver"
                    >
                        <span className="role-icon caregiver" aria-hidden="true">
                            C
                        </span>
                        <span className="role-content">
                            <strong>Soy cuidador</strong>
                            <span>
                                Quiero acceder a herramientas y recursos de apoyo.
                            </span>
                        </span>
                        <span className="role-arrow" aria-hidden="true">→</span>
                    </Link>
                </div>

                <p className="auth-alternative">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login">Iniciar sesión</Link>
                </p>

                <Link to="/bienvenida" className="auth-back">
                    Volver
                </Link>
            </section>
        </main>
    );
}
