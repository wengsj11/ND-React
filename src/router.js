import { BrowserRouter, Route} from 'react-router-dom';
import React, { Component } from 'react';
import App from './App';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
// import ClassList from './pages/ClassList/ClassList';
import ClassList from './containers/ClassList';
// import Create from './pages/Create/Create';
import Create from './containers/Create';
import Member from './pages/Member/Member';
import Main from './pages/Main/index'

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Header />
          <SideBar />
          <Main>
            <Route exact path="/" component={ClassList}/>
            <Route path="/member/:id" component={Member} />
            <Route path="/create" component={Create}/>
            {/* <Route path="/join" component={}/> */}
          </Main>
        </App>
      </BrowserRouter>
    )
  };
}