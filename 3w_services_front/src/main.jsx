import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.scss'
import { MyContextProvider } from "./hooks/MyContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <MyContextProvider>
        <App />
     </MyContextProvider>
  </React.StrictMode>,
)
