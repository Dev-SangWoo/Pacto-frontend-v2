"use client";

import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getMissionPageDataAction, getWalletPageDataAction } from "../_actions/blogger-actions";

export const missionPageQueryKey = ["blogger", "missions"] as const;
export const walletPageQueryKey = ["blogger", "wallet"] as const;

type BloggerQueryProviderProps = {
  children: React.ReactNode;
};

export function BloggerQueryProvider({ children }: BloggerQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 10 * 60_000,
            refetchOnWindowFocus: true,
            retry: 1,
            staleTime: 30_000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BloggerQueryPrefetch />
      {children}
    </QueryClientProvider>
  );
}

function BloggerQueryPrefetch() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetchTimer = window.setTimeout(() => {
      void Promise.all([
        queryClient.prefetchQuery({
          queryFn: getMissionPageDataAction,
          queryKey: missionPageQueryKey,
        }),
        queryClient.prefetchQuery({
          queryFn: getWalletPageDataAction,
          queryKey: walletPageQueryKey,
        }),
      ]);
    }, 800);

    return () => {
      window.clearTimeout(prefetchTimer);
    };
  }, [queryClient]);

  return null;
}
