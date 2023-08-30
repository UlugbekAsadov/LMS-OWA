const subdomain = window.location.host.split(".")[0];

export const loginMutationFn = (formData) =>
  fetch(
    `https://${subdomain}.${
      import.meta.env.VITE_CONFIG_BASE_API
    }/users/auth/signin`,
    {
      body: JSON.stringify(formData),
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data);
