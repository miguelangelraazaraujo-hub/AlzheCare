import { request } from "./authService";

const userService = {
    getProfile() {
        return request("/api/users/me", {
            method: "GET",
        });
    },

    updateProfile(profileData) {
        return request("/api/users/me", {
            method: "PUT",
            body: JSON.stringify(profileData),
        });
    },

    verifyPassword(contrasenaActual) {
        return request("/api/users/me/verify-password", {
            method: "POST",
            body: JSON.stringify({ contrasenaActual }),
        });
    },

    changePassword(contrasenaActual, nuevaContrasena) {
        return request("/api/users/me/password", {
            method: "PUT",
            body: JSON.stringify({
                contrasenaActual,
                nuevaContrasena,
            }),
        });
    },
};

export default userService;