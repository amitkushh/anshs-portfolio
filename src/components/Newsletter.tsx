'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';
import { subscribeToNewsletter } from '@/services/newsletterService';
import React, { useState } from 'react';

interface NewsletterState {
  email: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export const Newsletter = () => {
  const [state, setState] = useState<NewsletterState>({
    email: '',
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous states
    setState(prev => ({ ...prev, error: null, isSuccess: false }));

    // Validate email
    if (!state.email.trim()) {
      setState(prev => ({ ...prev, error: 'Email is required' }));
      return;
    }

    if (!validateEmail(state.email)) {
      setState(prev => ({
        ...prev,
        error: 'Please enter a valid email address',
      }));
      return;
    }

    // Prevent multiple submissions
    if (state.isLoading) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await subscribeToNewsletter(state.email);

      setState(prev => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        email: '',
      }));

      toast.success(
        result.message || "Thanks for subscribing! I'll keep you updated."
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to subscribe. Please try again.';

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      toast.error(errorMessage);
    }
  };

  return (
    <section className="mb-16 flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated</h2>
      <p className="text-gray-400 mb-6">
        Subscribe to my email list. I do not spam, ever.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-md w-full"
      >
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email"
              value={state.email}
              onChange={e =>
                setState(prev => ({
                  ...prev,
                  email: e.target.value,
                  error: null,
                }))
              }
              className={`bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 ${
                state.error ? 'border-red-500 focus:border-red-500' : ''
              }`}
              disabled={state.isLoading}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={state.isLoading || !state.email.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            {state.isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </div>

        {state.error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{state.error}</span>
          </div>
        )}
      </form>
    </section>
  );
};
