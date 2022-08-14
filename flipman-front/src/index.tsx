import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css'
import './Web/Styles/general.css'
import PlayersPage from './Web/Pages/Players/PlayersPage'

ReactDOM.render(
  <React.StrictMode>
    <PlayersPage />
  </React.StrictMode>,
  document.getElementById("root")
);
