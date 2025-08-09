export const getMeAPI = async () => {
    const res = await fetch('/api/auth/me');

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to fetch user');
    }

    return res.json();
};
