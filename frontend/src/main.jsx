import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/authContext.jsx'
import { ChatProvider } from '../context/ChatContext.jsx'
import { BlogProvider } from '../context/blogContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
        <BlogProvider>
        <App />
        </BlogProvider>
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>,
)
