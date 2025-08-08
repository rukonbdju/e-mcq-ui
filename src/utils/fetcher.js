
/**
 * A reusable API fetcher function for Next.js that works with cookies (including HttpOnly),
 * supports all HTTP methods, and handles JSON requests/responses automatically.
 *
 * @param {string} url - The API endpoint (relative to NEXT_PUBLIC_API_BASE_URL).
 * @param {object} [options={}] - Optional fetch configuration.
 * @param {string} [options.method="GET"] - HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {object} [options.headers] - Additional request headers.
 * @param {object|string} [options.body] - Request payload (object will be JSON-stringified automatically).
 * @returns {Promise<object>} - Resolves with parsed JSON response or throws an error if the request fails.
 *
 * @example
 * // GET request
 * const data = await apiFetcher("/user/me");
 *
 * @example
 * // POST request with body
 * await apiFetcher("/auth/login", {
 *   method: "POST",
 *   body: { email: "test@example.com", password: "123456" }
 * });
 *
 * @example
 * // Custom headers
 * const data = await apiFetcher("/custom", {
 *   headers: { "X-Custom-Header": "value" }
 * });
 */
export async function apiFetcher(url, options = {}) {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1"

    const config = {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        credentials: "include",
        ...options,
    };

    // Auto stringify body if it's an object
    if (config.body && typeof config.body === "object") {
        config.body = JSON.stringify(config.body);
    }

    const res = await fetch(`${baseURL}${url}`, config);

    // Handle HTTP errors
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${res.status}`);
    }

    return res.json();
}
