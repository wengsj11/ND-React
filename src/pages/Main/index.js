import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './index.css'

class Main extends Component {
  render() {
    return (
      <div className="l-main">
        <header className="l-main__hd clearfix">
          <div className="o-main__title">我的班级</div>
          <Route exact path="/" render={() => {
            return (
              <div className="o-main-btns">
                <Link to="/"><button className="o-main__btn">加入班级</button></Link>
                <Link to="/create"><button className="o-main__btn">创建班级</button></Link>
              </div>
            )
          }}/>
          <Route path="/create" render={() => {
            return (
              <div className="o-main-btns">
                <Link to="/"><button className="o-main__btn">返回上一级</button></Link>
              </div>
            )
          }}/>
          <Route path="/member" render={() => {
            return (
              <div className="o-main-btns">
                <Link to="/"><button className="o-main__btn">返回上一级</button></Link>
              </div>
            )
          }}/>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default Main;