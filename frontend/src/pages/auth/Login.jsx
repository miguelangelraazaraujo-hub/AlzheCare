
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "../../components/common/Logo";
import { useAuth } from "../../contexts/AuthContext";
import "./Auth.css";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [correoElectronico, setCorreoElectronico] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setIsSubmitting(true);

        try {
            await login({
                correoElectronico,
                contrasena,
            });

            navigate("/inicio", { replace: true });
        } catch (err) {
            setError(err.message || "No se pudo iniciar sesión.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <Logo />

                <div className="auth-heading">
                    <span className="auth-eyebrow">TU ESPACIO PERSONAL</span>
                    <h1>Iniciar sesión</h1>
                    <p>
                        Accede a tu cuenta para continuar utilizando AlzheCare.
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="correoElectronico">
                            Correo electrónico
                        </label>
                        <input
                            id="correoElectronico"
                            type="email"
                            autoComplete="email"
                            value={correoElectronico}
                            onChange={(event) =>
                                setCorreoElectronico(event.target.value)
                            }
                            placeholder="nombre@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="contrasena">Contraseña</label>
                        <input
                            id="contrasena"
                            type="password"
                            autoComplete="current-password"
                            value={contrasena}
                            onChange={(event) =>
                                setContrasena(event.target.value)
                            }
                            placeholder="Introduce tu contraseña"
                            required
                        />
                    </div>

                    {error && (
                        <p className="auth-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        className="auth-submit"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Accediendo..." : "Iniciar sesión"}
                    </button>
                </form>

                <p className="auth-alternative">
                    ¿Todavía no tienes cuenta?{" "}
                    <Link to="/registro">Crear cuenta</Link>
                </p>

                <Link to="/publico" className="auth-back">
                    Continuar sin cuenta
                </Link>
                <Link to="/bienvenida" className="auth-back">
                    Volver
                </Link>
            </section>
        </main>
    );
}
