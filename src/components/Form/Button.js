import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <div className="c-form-item">
          <div className="c-form-input">
          <button className="o-main__btn"
            type="submit"
            form="form">
            {this.props.value}
          </button>
          {
            Boolean(this.props.loding) ? (
              <span className="loading loading--small"></span>
            ):''
          }
          {
          // 错误信息
          Boolean(this.props.failed) ? (
              <span className="o-text--error">{this.props.error}</span>
            ):''
          }    
          </div>
      </div>
    );
  }
}

export default Button;