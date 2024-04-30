import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
    

const queryClient = new QueryClient()



const QueryProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>


    )
}

export default QueryProvider
