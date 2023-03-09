import { createRoot } from 'react-dom/client';
import App from './app';
//import siteData from 'wille:site-data';
import { BrowserRouter } from 'react-router-dom';

const renderInBrowser = () => {
  const el = document.getElementById('root');
  if (!el) {
    throw new Error('#root element is not exist');
  }
  createRoot(el).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

renderInBrowser();
