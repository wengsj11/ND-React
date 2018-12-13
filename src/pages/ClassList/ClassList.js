import React, { Component } from 'react';
import apiService from '../../service/api';
import ClassItem from '../../components/ClassItem/ClassItem';
import NoClass from '../NoClass/NoClass'
import Loading from '../../components/Loading/Loading'
import './classlist.css'

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminClass: [],
      teachClass: [],
      //显示正在加载动画
      loading: true,
      // 获取数据失败状态
      failed: false
    }
  }
  
  componentDidMount() {
    // 获取本地json数据
    /*
    apiService.getClassList().then((result) => {
      // console.log(result)
      if (result.data) {
        let adminClass = [];
        let teachClass = [];
        result.data.forEach(item => {
          if (item.administrative) {
            adminClass.push(item)
          } else {
            teachClass.push(item);
          }
        });
        this.setState({
          adminClass: adminClass,
          teachClass: teachClass,
          loading: false
        })
      }
    }).catch((error) => {
      //获取数据失败，显示未加入班级
      this.setState({
        failed: true,
        loading: false
      })
    })
    */
    if (this.props.classList) {
      let adminClass = [];
        let teachClass = [];
        this.props.classList.forEach(item => {
          if (item.administrative) {
            adminClass.push(item)
          } else {
            teachClass.push(item);
          }
        });
        this.setState({
          adminClass: adminClass,
          teachClass: teachClass,
          loading: false
        })
    } else {
      this.setState({
        failed: true,
        loading: false
      })
    }
  }
  render() {
    //加载中...
    if (this.state.loading) {
      return <Loading />
    }
    //获取数据失败，显示未加入班级
    if (this.state.failed) {
      return <NoClass />
    }
    const { adminClass, teachClass } = this.state;
    return (
      <section className="l-main__bd">
        {
          adminClass.length > 0 ? (
            <div>
              <p className="cl-intro">行政班是为学生管理和教学管理而设置的班级</p>
              <div className="cl-list cl-list-admin">
                {
                  this.state.adminClass.map( (classItem) =>{
                    return <ClassItem key={classItem.id} classItem={classItem} />;
                  })
                }
              </div>
            </div>
          ):null
        }
        {
          teachClass.length > 0 ? (
            <div>
              <p className="cl-intro">教学班是根据课程教学要求而设置的班级</p>
              <div className="cl-list cl-list-teach">
                {
                  this.state.teachClass.map( (classItem) =>{
                    return <ClassItem key={classItem.id} classItem={classItem} />;
                  })
                }
              </div>
            </div>
          ):null
        }
      </section>
    );
  }
}

export default ClassList;