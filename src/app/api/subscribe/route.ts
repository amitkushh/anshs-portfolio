import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    let { email } = await req.json();

    if (typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    email = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const MailchimpKey = process.env.MAILCHIMP_API_KEY;
    const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
    const MailchimpAudience = process.env.MAILCHIMP_LIST_ID;

    if (!MailchimpKey || !MailchimpServer || !MailchimpAudience) {
      console.error('Missing Mailchimp environment variables');
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }

    const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;

    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(customUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${MailchimpKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
      signal: controller.signal,
    });

    // Clear timeout since fetch completed successfully
    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = 'An error occurred while subscribing';
      
      try {
        // Attempt to parse as JSON first
        const errorData = await response.json();
        
        // Check for known error fields in order of preference
        if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.title) {
          errorMessage = errorData.title;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else {
          // If no known fields, use a generic message with status
          errorMessage = `Subscription failed (${response.status})`;
        }
      } catch (jsonError) {
        // If JSON parsing fails, try to get text response
        try {
          const errorText = await response.text();
          errorMessage = errorText || `Subscription failed (${response.status})`;
        } catch (textError) {
          // If both JSON and text parsing fail, use generic message with status
          errorMessage = `Subscription failed (${response.status})`;
        }
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter!',
    });
  } catch (error) {
    console.error('Error:', error);
    
    // Handle timeout/abort errors specifically
    if (error instanceof Error && (error.name === 'AbortError' || error.message.includes('aborted'))) {
      return NextResponse.json(
        { error: 'Request timeout - please try again' },
        { status: 408 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
