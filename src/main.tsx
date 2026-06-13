import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { TasksProvider } from './ContextProviders/TasksProvider.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // so data always is valid no need to background update only if i triggered on my own...
      staleTime: Infinity,
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <TasksProvider>
        <TooltipProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TooltipProvider>
      </TasksProvider>
    </QueryClientProvider>
  </StrictMode>,
)
