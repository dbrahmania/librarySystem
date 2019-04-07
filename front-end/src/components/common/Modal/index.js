import React, { Component } from "react";
import "./styles.css";
export default class Modal extends Component {
  render() {
    return (
      <div className="modal-container-back">
        <div className="modal-container-front">
          <div className="modal-title">
            <h2>{this.props.title}</h2>
            <button onClick={this.props.reset}>X</button>
          </div>
          <div className="modal-body">{this.props.children}</div>
          <div className="modal-action">
            <button onClick={this.props.reset}>CLOSE</button>
            <button onClick={this.props.onSubmit}>SUBMIT</button>
          </div>
        </div>
      </div>
    );
  }
}
