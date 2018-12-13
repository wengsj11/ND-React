import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { name, label, placeholder, required, onChange, valid} = this.props;
    return (
      <div className="c-form-item">
        <label htmlFor={name} className={"c-form__label o-text" + (required ? ' label--required':'')}>{label}</label>
        <div className="c-form-input">
          <input type="text"
            className="c-input"
            name={name}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            {...this.props} />
          {
          // 校验错误信息
            !Boolean(valid) ? (
              <span className="o-text--error">{this.props.error}</span>
            ):''
          }
        </div>
      </div>
    );
  }
}

export default Input;