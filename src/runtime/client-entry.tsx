import { createRoot } from 'react-dom/client';
import App from './App';
import siteData from 'wille:site-data';

const renderInBrowser = () => {
  console.log(siteData);
  const el = document.getElementById('root');
  if (!el) {
    throw new Error('#root element is not exist');
  }
  createRoot(el).render(<App />);
};

renderInBrowser();
