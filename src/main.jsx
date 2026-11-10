import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/site.css';
import './styles/stitch.css';
import './styles/floating-dock.css';
import './styles/button-motion.css';
import './styles/page-motion.css';
createRoot(document.getElementById('root')).render(<StrictMode><BrowserRouter><App/></BrowserRouter></StrictMode>);

import './styles/refix.css';

import './styles/home-backgrounds.css';
import './styles/route-backgrounds.css';
import './styles/walking-paws.css';

import './styles/brand.css';
