import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { TasksProvider } from './ContextProviders/TasksProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TasksProvider>
      <TooltipProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TooltipProvider>
    </TasksProvider>
  </StrictMode>,
)
