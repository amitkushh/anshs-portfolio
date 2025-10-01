export interface NewsletterResponse {
  message: string;
  data?: unknown;
}

export const subscribeToNewsletter = async (
  email: string
): Promise<NewsletterResponse> => {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to subscribe to newsletter';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      // Response body is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};
