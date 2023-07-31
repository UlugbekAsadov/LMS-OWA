export const loginMutationFn = (formData) =>
  fetch(`${import.meta.env.VITE_CONFIG_BASE_API}/users/auth/signin`, {
    body: JSON.stringify(formData),
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data);
