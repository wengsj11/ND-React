import React, { Component } from 'react';
import './form.css';

class Form extends Component {
  render() {
    return (
      <form className="c-form"
        id={this.props.form_id}
        onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;