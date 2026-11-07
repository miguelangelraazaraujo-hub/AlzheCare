
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import Logo from "../../components/common/Logo";
import { useAuth } from "../../contexts/AuthContext";
import "./Auth.css";

const roles = {
    paciente: {
        value: "PATIENT",
        label: "Paciente",
    },
    cuidador: {
        value: "CAREGIVER",
        label: "Cuidador",
    },
};

export default function Register() {
    const { rol } = useParams();
    const selectedRole = roles[rol];

    const { register } = useAuth();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!selectedRole) {
        return <Navigate to="/registro" replace />;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (contrasena !== confirmarContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (contrasena.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        if (new TextEncoder().encode(contrasena).length > 72) {
            setError("La contraseña supera el máximo permitido de 72 bytes.");
            return;
        }

        setIsSubmitting(true);

        try {
            const user = await register({
                nombre: nombre.trim(),
                apellidos: apellidos.trim(),
                correoElectronico: correoElectronico.trim(),
                contrasena,
                rol: selectedRole.value,
            });

            const destination =
                user.rol === "PATIENT"
                    ? "/paciente/inicio"
                    : "/cuidador/inicio";

            navigate(destination, { replace: true });
        } catch (err) {
            setError(err.message || "No se pudo crear la cuenta.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <Logo />

                <div className="auth-heading">
                    <span className="auth-eyebrow">
                        REGISTRO DE CUENTA
                    </span>
                    <h1>Crear cuenta</h1>
                    <p>
                        Estás creando una cuenta como{" "}
                        <strong>{selectedRole.label.toLowerCase()}</strong>.
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            autoComplete="given-name"
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                            maxLength={100}
                            placeholder="TU NOMBRE"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input
                            id="apellidos"
                            type="text"
                            autoComplete="family-name"
                            value={apellidos}
                            onChange={(event) => setApellidos(event.target.value)}
                            maxLength={150}
                            placeholder="TUS APELLIDOS"
                            required
                        />
                    </div>

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
                            maxLength={150}
                            placeholder="nombre@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="contrasena">Contraseña</label>
                        <input
                            id="contrasena"
                            type="password"
                            autoComplete="new-password"
                            value={contrasena}
                            onChange={(event) =>
                                setContrasena(event.target.value)
                            }
                            minLength={8}
                            required
                        />
                        <span className="auth-hint">
                            Debe contener al menos 8 caracteres.
                        </span>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="confirmarContrasena">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirmarContrasena"
                            type="password"
                            autoComplete="new-password"
                            value={confirmarContrasena}
                            onChange={(event) =>
                                setConfirmarContrasena(event.target.value)
                            }
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
                        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                    </button>
                </form>

                <p className="auth-alternative">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login">Iniciar sesión</Link>
                </p>

                <Link to="/registro" className="auth-back">
                    Cambiar tipo de cuenta
                </Link>
            </section>
        </main>
    );
}
