import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
const showSentMessagePage = currentPath === '/mensaje-enviado';

ReactDOM.createRoot(document.getElementById('root')).render(
  <App showSentMessage={showSentMessagePage} />
);
