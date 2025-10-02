import { useState, useEffect, useCallback } from 'react';
import type { StudioSettingItem } from '../types';

// --- MOCK DATABASE ---
// This would be a real database in a full-stack application.
// We are simulating it here with a local variable.

import { studioSettingItems as initialStudioSettings } from '../data/overlay_setting/studio/settings';

let MOCK_DB = {
    studioSettings: JSON.parse(JSON.stringify(initialStudioSettings)) as StudioSettingItem[],
};

// --- MOCK tRPC API ---
// This simulates the structure of a tRPC router.

const mockApi = {
    studio: {
        getSettings: {
            // This simulates a tRPC query procedure.
            query: async (): Promise<StudioSettingItem[]> => {
                console.log('tRPC MOCK: Fetching studio settings...');
                // Simulate network latency
                await new Promise(resolve => setTimeout(resolve, 800));
                console.log('tRPC MOCK: Fetched studio settings successfully.', MOCK_DB.studioSettings);
                return JSON.parse(JSON.stringify(MOCK_DB.studioSettings));
            },
        },
        updateSettings: {
            // This simulates a tRPC mutation procedure.
            mutate: async (newSettings: StudioSettingItem[]): Promise<{ success: boolean }> => {
                console.log('tRPC MOCK: Updating studio settings with:', newSettings);
                // Simulate network latency
                await new Promise(resolve => setTimeout(resolve, 1200));
                MOCK_DB.studioSettings = JSON.parse(JSON.stringify(newSettings));
                console.log('tRPC MOCK: Update successful. New DB state:', MOCK_DB);
                return { success: true };
            },
        },
    },
};

// --- MOCK tRPC HOOKS ---
// These custom hooks mimic the behavior of @trpc/react-query hooks.

// Mimics useQuery
function useQuery<T>(queryFn: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const refetch = useCallback(() => {
        setIsLoading(true);
        setError(null);
        queryFn()
            .then(setData)
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, [queryFn]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, isLoading, error, refetch };
}

// Mimics useMutation
function useMutation<TVariables, TResult>(mutationFn: (variables: TVariables) => Promise<TResult>) {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<TResult | null>(null);

    const mutate = useCallback((variables: TVariables, options?: { onSuccess?: (data: TResult) => void; onError?: (error: Error) => void }) => {
        setIsPending(true);
        setError(null);
        mutationFn(variables)
            .then(result => {
                setData(result);
                options?.onSuccess?.(result);
            })
            .catch(err => {
                setError(err);
                options?.onError?.(err);
            })
            .finally(() => setIsPending(false));
    }, [mutationFn]);

    return { mutate, isPending, error, data };
}


// --- EXPORTED tRPC CLIENT ---
// This is the object the React components will import and use.
export const trpc = {
    studio: {
        getSettings: {
            useQuery: () => useQuery(mockApi.studio.getSettings.query),
        },
        updateSettings: {
            useMutation: () => useMutation(mockApi.studio.updateSettings.mutate),
        },
    },
};