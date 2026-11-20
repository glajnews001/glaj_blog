/** Browser-side helper for calling the JSON API route handlers. */
export async function callApi<T = unknown>(
  url: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const response = await fetch(url, {
    method: options.method ?? (options.body ? "POST" : "GET"),
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "same-origin",
  });

  let payload: { ok?: boolean; data?: T; error?: string } = {};
  try {
    payload = await response.json();
  } catch {
    // non-JSON response
  }
  if (!response.ok || payload.ok === false) {
    throw new Error(payload.error ?? "Something went wrong. Please try again.");
  }
  return payload.data as T;
}
