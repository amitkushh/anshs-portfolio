// Newsletter subscription service with Mailchimp integration

export interface NewsletterSubscriptionResult {
  success: boolean;
  message: string;
  error?: string;
}

// Mailchimp integration
export const subscribeToNewsletter = async (
  email: string
): Promise<NewsletterSubscriptionResult> => {
  const MAILCHIMP_API_KEY = import.meta.env.VITE_MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = import.meta.env.VITE_MAILCHIMP_LIST_ID;
  const MAILCHIMP_SERVER_PREFIX = import.meta.env.VITE_MAILCHIMP_SERVER_PREFIX; // e.g., 'us1'

  // If Mailchimp is not configured, use simulation mode for development
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER_PREFIX) {
    console.warn('Mailchimp configuration missing. Using simulation mode.');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For development, always succeed in simulation mode
    console.log('Newsletter subscription (simulation):', email);

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
    };
  }

  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: '', // Optional: extract first name from email
          LNAME: '', // Optional: extract last name from email
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to subscribe to newsletter');
    }

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
    };
  } catch (error) {
    // If API call fails, provide a more user-friendly error message
    if (error instanceof Error) {
      console.error('Newsletter subscription error:', error.message);

      // Check if it's a specific Mailchimp error
      if (error.message.includes('already a list member')) {
        throw new Error('This email is already subscribed to our newsletter.');
      } else if (error.message.includes('Invalid email')) {
        throw new Error('Please enter a valid email address.');
      } else {
        throw new Error(
          'Unable to subscribe at the moment. Please try again later.'
        );
      }
    }
    throw error;
  }
};
