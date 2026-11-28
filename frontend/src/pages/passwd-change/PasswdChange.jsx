
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, LockKeyhole, Eye, EyeOff } from "lucide-react";

import userService from "../../services/userService";
import { useNotification } from "../../contexts/NotificationContext";

import "./PasswdChange.css";

function PasswdChange() {
    const navigate = useNavigate();
    const { notify } = useNotification();

    const [modalOpen, setModalOpen] = useState(true);
    const [verified, setVerified] = useState(false);

    const [contrasenaActual, setContrasenaActual] = useState("");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    const [verActual, setVerActual] = useState(false);
    const [verNueva, setVerNueva] = useState(false);
    const [verConfirmacion, setVerConfirmacion] = useState(false);

    const [loadingVerification, setLoadingVerification] = useState(false);
    const [loadingChange, setLoadingChange] = useState(false);

    const handleVerifyPassword = async (event) => {
        event.preventDefault();

        if (!contrasenaActual.trim()) {
            notify("Introduce tu contraseña actual.", "warning");
            return;
        }

        try {
            setLoadingVerification(true);

            await userService.verifyPassword(contrasenaActual);

            setVerified(true);
            setModalOpen(false);

            notify("Contraseña verificada correctamente.", "success");
        } catch (error) {
            notify(
                error.message || "No se ha podido verificar la contraseña.",
                "error"
            );
        } finally {
            setLoadingVerification(false);
        }
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();

        if (nuevaContrasena.length < 8 || nuevaContrasena.length > 100) {
            notify(
                "La nueva contraseña debe tener entre 8 y 100 caracteres.",
                "warning"
            );
            return;
        }

        if (nuevaContrasena !== confirmarContrasena) {
            notify("Las contraseñas no coinciden.", "warning");
            return;
        }

        if (nuevaContrasena === contrasenaActual) {
            notify(
                "La nueva contraseña debe ser diferente de la actual.",
                "warning"
            );
            return;
        }

        try {
            setLoadingChange(true);

            await userService.changePassword(
                contrasenaActual,
                nuevaContrasena
            );

            notify("Tu contraseña se ha actualizado correctamente.", "success");

            navigate("/perfil");
        } catch (error) {
            notify(
                error.message || "No se ha podido cambiar la contraseña.",
                "error"
            );
        } finally {
            setLoadingChange(false);
        }
    };

    return (
        <main className="change-password-page">
            <section className="change-password-container">
                <Link to="/perfil" className="change-password-back">
                    <ArrowLeft size={18} />
                    Volver al perfil
                </Link>

                <div className="change-password-header">
                    <div className="change-password-icon">
                        <LockKeyhole size={28} />
                    </div>

                    <h1>Cambiar contraseña</h1>
                    <p>
                        Actualiza tu contraseña para mantener protegida
                        tu cuenta de AlzheCare.
                    </p>
                </div>

                <form onSubmit={handleChangePassword}>
                    <div className="change-password-field">
                        <label htmlFor="nuevaContrasena">
                            Nueva contraseña
                        </label>

                        <div className="change-password-input-wrapper">
                            <input
                                id="nuevaContrasena"
                                type={verNueva ? "text" : "password"}
                                value={nuevaContrasena}
                                onChange={(e) =>
                                    setNuevaContrasena(e.target.value)
                                }
                                disabled={!verified || loadingChange}
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                onClick={() => setVerNueva(!verNueva)}
                                disabled={!verified}
                                aria-label={
                                    verNueva
                                        ? "Ocultar contraseña"
                                        : "Mostrar contraseña"
                                }
                            >
                                {verNueva ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="change-password-field">
                        <label htmlFor="confirmarContrasena">
                            Confirmar nueva contraseña
                        </label>

                        <div className="change-password-input-wrapper">
                            <input
                                id="confirmarContrasena"
                                type={verConfirmacion ? "text" : "password"}
                                value={confirmarContrasena}
                                onChange={(e) =>
                                    setConfirmarContrasena(e.target.value)
                                }
                                disabled={!verified || loadingChange}
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setVerConfirmacion(!verConfirmacion)
                                }
                                disabled={!verified}
                                aria-label={
                                    verConfirmacion
                                        ? "Ocultar contraseña"
                                        : "Mostrar contraseña"
                                }
                            >
                                {verConfirmacion
                                    ? <EyeOff size={18} />
                                    : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <p className="change-password-hint">
                        La contraseña debe tener entre 8 y 100 caracteres.
                    </p>

                    <button
                        type="submit"
                        disabled={!verified || loadingChange}
                        className="change-password-submit"
                    >
                        {loadingChange
                            ? "Actualizando..."
                            : "Guardar nueva contraseña"}
                    </button>
                </form>
            </section>

            {modalOpen && (
                <div
                    className="change-password-modal-overlay"
                    role="presentation"
                >
                    <section
                        className="change-password-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="verify-password-title"
                    >
                        <div className="change-password-modal-icon">
                            <LockKeyhole size={26} />
                        </div>

                        <h2 id="verify-password-title">
                            Verificar identidad
                        </h2>

                        <p>
                            Por seguridad, introduce tu contraseña actual
                            para continuar.
                        </p>

                        <form onSubmit={handleVerifyPassword}>
                            <label htmlFor="contrasenaActual">
                                Contraseña actual
                            </label>

                            <div className="change-password-input-wrapper">
                                <input
                                    id="contrasenaActual"
                                    type={verActual ? "text" : "password"}
                                    value={contrasenaActual}
                                    onChange={(e) =>
                                        setContrasenaActual(e.target.value)
                                    }
                                    autoComplete="current-password"
                                    autoFocus
                                />

                                <button
                                    type="button"
                                    onClick={() => setVerActual(!verActual)}
                                    aria-label={
                                        verActual
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                >
                                    {verActual
                                        ? <EyeOff size={18} />
                                        : <Eye size={18} />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loadingVerification}
                                className="change-password-submit"
                            >
                                {loadingVerification
                                    ? "Verificando..."
                                    : "Verificar contraseña"}
                            </button>
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
}

export default PasswdChange;