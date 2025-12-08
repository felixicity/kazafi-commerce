'use client';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// Optional: Import the Devtools for inspecting the cache
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

// 1. Create a client instance for the server/client boundary
// We use a React ref or state to ensure the client is created only once
// and maintains the same state across the component lifecycle.
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Set a default stale time, e.g., 5 minutes (in milliseconds)
        // Data is considered "fresh" for 5 minutes, reducing unnecessary fetches.
        staleTime: 1000 * 60 * 5, 
      },
    },
  });
}

// Global variable to hold the client instance
let browserQueryClient: QueryClient | undefined = undefined;

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Use a local state for the client on the client-side
  const [queryClient] = React.useState(() => makeQueryClient());
  
  // Use a global variable for the server-side to handle SSR
  // This ensures the client is initialized correctly for Server Components
  const getQueryClient = () => {
    if (typeof window === 'undefined') {
      // Server: always create a new client
      return makeQueryClient();
    } else {
      // Browser: use the global variable (singleton pattern)
      if (!browserQueryClient) browserQueryClient = makeQueryClient();
      return browserQueryClient;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
        {children}
        {/* 🔑 Optional: Add the Devtools for debugging */}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}