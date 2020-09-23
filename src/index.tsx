import './polyfill'
import "core-js/stable";
import "regenerator-runtime/runtime";
import './lib/style/antd.less'
require("./pages/m-data/dark")
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
      <App />
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
