import { saveToLocalStorage } from "./local";

/**
 * Wraps a request and handles 401 http errors and redirects the user to /login page.
 * @param {Promise} promise the request
 * @returns {Promise}
 */
export async function handleUnauthorized(promise) {
    try {
        return await promise;
    } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
            saveToLocalStorage("unauthorizedMsg", "Sua sessão expirou, por favor faça login novamente.");
            document.location = "/login";
        }
        throw err;
    }
}