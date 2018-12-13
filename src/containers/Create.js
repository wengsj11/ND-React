import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import apiService from '../service/api'
import Create from '../pages/Create/Create'
import { addClassItem } from '../redux/classList'


class CreateContainer extends Component {
  static propTypes = {
    classList: PropTypes.array,
    addClassItem: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      id: ''  //当前表单将要提交数据的id
    }
  }
  
  componentWillMount() {
    //获取最后一条list数据的id
    if (this.props.classList) {
      const { classList } = this.props;
      const len = classList.length;
      const last_item = classList[len - 1];
      console.log('last id :'+last_item.id);
      this.setState({ id: last_item.id + 1 });
    } else {
      console.log('表单加载失败')
    }
  }
  handleAddClassItem() {
    if (this.props.addClassItem) {
      // this.props.addClassItem();
    }
  }

  render() {
    return (
      // <Create
      //   id={this.state.id}
      //   onSubmit={this.handleAddClassItem.bind(this)}
      // />
      <h1 style={{ fontSize: '30px' }}>
        id：{this.state.id}
      </h1>
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
    addClassItem: (classItem) => {
      dispatch(addClassItem(classItem));
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContainer)