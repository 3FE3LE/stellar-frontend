export const fetcher = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
};
