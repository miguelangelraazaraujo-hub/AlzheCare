import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { useNotification } from "../../contexts/NotificationContext";
import "./Profile.css";

const initialProfile = {
    nombre: "",
    apellidos: "",
    correoElectronico: "",
};

export default function Profile() {
    const { notify } = useNotification();

    const [profile, setProfile] = useState(initialProfile);
    const [originalProfile, setOriginalProfile] = useState(initialProfile);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let active = true;

        async function loadProfile() {
            try {
                const data = await userService.getProfile();

                const loadedProfile = {
                    nombre: data.nombre ?? "",
                    apellidos: data.apellidos ?? "",
                    correoElectronico: data.correoElectronico ?? "",
                };

                if (active) {
                    setProfile(loadedProfile);
                    setOriginalProfile(loadedProfile);
                }
            } catch (error) {
                if (active) {
                    notify(
                        error.message || "No se pudo cargar el perfil.",
                        "error"
                    );
                }
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        }

        loadProfile();

        return () => {
            active = false;
        };
    }, [notify]);

    function handleChange(event) {
        const { name, value } = event.target;

        setProfile((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function handleReset() {
        setProfile(originalProfile);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (isSubmitting) return;

        const updatedProfile = {
            nombre: profile.nombre.trim(),
            apellidos: profile.apellidos.trim(),
            correoElectronico: profile.correoElectronico
                .trim()
                .toLowerCase(),
        };

        if (
            !updatedProfile.nombre
            || !updatedProfile.apellidos
            || !updatedProfile.correoElectronico
        ) {
            notify("Todos los campos son obligatorios.", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await userService.updateProfile(updatedProfile);

            const savedProfile = {
                nombre: data.nombre,
                apellidos: data.apellidos,
                correoElectronico: data.correoElectronico,
            };

            setProfile(savedProfile);
            setOriginalProfile(savedProfile);

            notify("Tu perfil se ha actualizado correctamente.", "success");
        } catch (error) {
            notify(
                error.message || "No se pudo actualizar el perfil.",
                "error"
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    const hasChanges = (
        profile.nombre !== originalProfile.nombre
        || profile.apellidos !== originalProfile.apellidos
        || profile.correoElectronico !== originalProfile.correoElectronico
    );

    if (isLoading) {
        return (
            <section className="profile-page" aria-live="polite">
                <p className="profile-loading">Cargando perfil...</p>
            </section>
        );
    }

    return (
        <main className="profile-page">
            <header className="profile-heading">
                <span className="profile-eyebrow">
                    GESTIÓN PERSONAL
                </span>
                <h1>Mi perfil</h1>
                <p>
                    Consulta y modifica tus datos personales.
                </p>
            </header>

            <section className="profile-card">
                <form onSubmit={handleSubmit}>
                    <div className="profile-form">
                        <div className="auth-field">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                autoComplete="given-name"
                                autoCapitalize="words"
                                value={profile.nombre}
                                onChange={handleChange}
                                maxLength={100}
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input
                                id="apellidos"
                                name="apellidos"
                                type="text"
                                autoComplete="family-name"
                                autoCapitalize="words"
                                value={profile.apellidos}
                                onChange={handleChange}
                                maxLength={150}
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="correoElectronico">
                                Correo electrónico
                            </label>
                            <input
                                id="correoElectronico"
                                name="correoElectronico"
                                type="email"
                                autoComplete="email"
                                autoCapitalize="none"
                                spellCheck={false}
                                value={profile.correoElectronico}
                                onChange={handleChange}
                                maxLength={150}
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                    </div>

                    <p className="profile-password-note">
                        La contraseña no se muestra ni se modifica desde
                        este apartado.
                    </p>

                    <div className="profile-actions">
                        {hasChanges && (
                            <button
                                className="profile-reset"
                                type="button"
                                onClick={handleReset}
                                disabled={isSubmitting}
                            >
                                Descartar cambios
                            </button>
                        )}

                        <button
                            className="auth-submit profile-submit"
                            type="submit"
                            disabled={isSubmitting || !hasChanges}
                        >
                            {isSubmitting
                                ? "Guardando..."
                                : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}