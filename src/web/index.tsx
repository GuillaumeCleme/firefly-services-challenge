import React from 'react'

import { Root, createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import store from './redux/store';

import App from './app'
import './index.css'


// Bootstrap the React App
const rootElement: HTMLElement = document.getElementById("root")!; //Force find the root
const root: Root = createRoot(rootElement);


root.render(
  <ReduxProvider store={store}>
      <App />
  </ReduxProvider>
);