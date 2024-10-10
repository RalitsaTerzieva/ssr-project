import { hydrateRoot } from 'react-dom/client';
import App from './App';

type Gist = {
  id: string;
  description: string;
};

declare global {
  interface Window {
    gists: Gist[];
  }
}

const container = document.getElementById('app');

if (container) {
  hydrateRoot(container, <App gists={window.gists} />);
} else {
  console.error("Element with ID 'app' not found");
}
