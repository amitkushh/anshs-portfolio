export interface NewsletterResponse {
  message: string;
  data?: any;
}

export const subscribeToNewsletter = async (email: string): Promise<NewsletterResponse> => {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to subscribe to newsletter');
  }

  return await response.json();
};
