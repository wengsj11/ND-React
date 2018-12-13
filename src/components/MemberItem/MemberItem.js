import React, { Component } from 'react';

class MemberItem extends Component {

  createMemberTag(type, tag, index) {
    // 没有标签则返回空
    if (!tag) {
        return null;
    }
    let tagJSX = null;
    if (tag === '班主任') {
      tagJSX = <span className="mem-tag mem-tag--headteacher" key={index}>班主任</span>
    } else if (tag === '管理员') {
      tagJSX = <span className="mem-tag mem-tag--admin" key={index}>管理员</span>
    } else if (tag === '班长') {
      tagJSX = <span className="mem-tag mem-tag--moniter" key={index}>班长</span>
    } else {
      tagJSX = <span className={'mem-tag mem-tag--' + type} key={index}>{tag}</span>
    }
    return tagJSX;
  }


  render() {
    const { memberItem } = this.props;
    return (
      <div className="mem-list__item">
        <div className="mem-item__pic">
          <img src={require('../../resource' + memberItem.avatar)} alt="avatar"></img>
          {
            memberItem.tags ?
              <div className="mem-tag-box">
                {
                  memberItem.tags.map((tag, index) => {
                    return this.createMemberTag(memberItem.type, tag, index);
                  })
                }
              </div>
              : null
          }
          
        </div>
        <div className="mem-item__name"><strong>{memberItem.name}</strong></div>
      </div>
    );
  }
}

export default MemberItem;