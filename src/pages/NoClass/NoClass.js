import React, { Component } from 'react';
import './noclass.css'

class NoClass extends Component {
  render() {
    return (
      <section className="l-main__bd no-content">
        <img src={require('../../resource/images/noclass.png')} alt="未加入班级" className="no-content__pic" />
        <div className="no-content__txt">你还没有加入班级，请立即</div>
        <button className="o-main__btn" id="join-btn">加入班级</button>
      </section>
    );
  }
}

export default NoClass;