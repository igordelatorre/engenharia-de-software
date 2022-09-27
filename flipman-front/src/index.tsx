import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css'
import './Web/Styles/general.css'
import App from "./App"
import {BrowserRouter} from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
