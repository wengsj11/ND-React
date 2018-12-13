import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  render() {
    return (
      <nav className="l-top">
        <a href="###" title="福建省教育信息化统一平台" className="o-logo">
            <img src={require('../../resource/images/logo.png')} alt='logo' />
        </a>
        <ul className="c-tab">
            <li><a href="###" className="c-tab__item">首页</a></li>
            <li className="ui-active"><a href="###" className="c-tab__item">教学管理</a></li>
            <li><a href="###" className="c-tab__item">学习</a></li>
            <li><a href="###" className="c-tab__item">资源超市</a></li>
            <li><a href="###" className="c-tab__item">教育应用</a></li>
            <li><a href="###" className="c-tab__item">新闻</a></li>
            <li><a href="###" className="c-tab__item">名师名校</a></li>
        </ul>
        <div className="new-btn-box">
            <a href="###" className="new-btn">新功能</a>
        </div>
        <button className="o-btn o-search-btn">
            <i className="o-icon o-icon--search"></i>
        </button>
        <div className="user-info">
            <div className="user-info__pic">
            </div>
            <span className="user-info__name">Coco</span>
        </div>
      </nav>
    );
  }
}

export default Header;