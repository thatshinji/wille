import { createRoot } from 'react-dom/client'
import App from './App'

const renderInBrowser = () => {
  const el = document.getElementById('root')
  if (!el) {
    throw new Error("#root element is not exist")
  }
  createRoot(el).render(<App />)
}

renderInBrowser()
