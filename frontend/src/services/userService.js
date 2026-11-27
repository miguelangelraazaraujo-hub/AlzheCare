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
};

export default userService;