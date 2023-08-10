export const api = async (url, config) => {
    const data = await fetch(`${import.meta.env.VITE_CONFIG_BASE_API}${url}`, {
        ...config,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${localStorage.getItem("u_at")}`,
        },
    })
        .then((res) => res.json())
        .then((data) => data);

    return data;
};