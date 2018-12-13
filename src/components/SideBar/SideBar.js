import React, { Component } from 'react';
import './sidebar.css';

class SideBar extends Component {
  render() {
    return (
      <aside className="l-sidebar">
        <header className="o-sidebar__hd">
          <button className="o-btn o-back-btn">
              <i className="o-icon o-icon--back"></i>
              <span className="o-btn__txt">个人中心</span>
          </button>
          <button className="o-btn o-menu-btn">
              <i className="o-icon o-icon--menu"></i>
          </button>
        </header>
        <ul className="c-menu__bd">
          <li>
              <a href="###" className="c-menu__item">其他内容</a>
          </li>
          <li>
              <a href="###" className="c-menu__item">其他内容</a>
          </li>
          <li className="ui-active">
              <a href="###" className="c-menu__item">我的班级</a>
          </li>
          <li>
              <a href="###" className="c-menu__item">其他内容</a>
          </li>
        </ul>
      </aside>
    );
  }
}

export default SideBar;