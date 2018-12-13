import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ClassItem extends Component {
  render() {
    const { classItem } = this.props;
    return (
      <Link to={'/member/'+classItem.id}>
        <div className="cl-list-item">
          <img src={require('../../resource'+classItem.img)} alt="班级图片" className="cl-list-item__pic" />
          <div className="cl-list-item__info">
              <span className="cl-item__grade">{classItem.classTitle}</span><br />
              班级：<span className="cl-item__classname">{classItem.grade}</span><br />
              班主任：<span className="cl-item__headteacher"><strong>{classItem.headteacher}</strong></span><br />
              学生：<span className="cl-item__student">{classItem.studentNum}人</span>
          </div>
          <button className="o-setting-btn o-btn">
              <i className="o-icon o-icon--setting"></i>
          </button>
          {classItem.administrative ? <div className="cl-tag">行政班</div> : null}
        </div>
      </Link>
    );
  }
}

export default ClassItem;