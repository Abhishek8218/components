'use client';
import React from 'react';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
var QueryProvider = function (_a) {
    var children = _a.children;
    var queryClient = new QueryClient();
    return (<div>


        <QueryClientProvider client={queryClient}>
         {children}
   
      </QueryClientProvider>
    
        
        </div>);
};
export default QueryProvider;
