import React, { Component } from "react";
import { Spin } from "antd";
export default class Loading extends Component {
  render() {
    return (
      <div style={{ textAlign: "center", margin: "80px 0" }}>
        <Spin size="large" />
      </div>
    );
  }
}
