import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import apiService from '../service/api'
import ClassList from '../pages/ClassList/ClassList'
import { initClassList } from '../redux/classList'

class ClassListContainer extends Component {
  static propTypes = {
    classList: PropTypes.array,
    initClassList: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      classList: []
    }
  }
  

  componentWillMount () {
    // componentWillMount 生命周期中初始化班级数据
    this._loadClassList();
  }

  _loadClassList () {
    // axois 加载评论
    // 获取本地json数据
    apiService.getClassList().then((result) => {
      // console.log(result)
      if (result.data) {
        this.props.initClassList(result.data);
      }
    });
  }

  render() {
    return (
      <ClassList classList={this.state.classList}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    classList: state.classList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initClassList: (classList) => {
      dispatch(initClassList(classList))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassListContainer)