import React, { Component } from 'react';
import apiService from '../../service/api';
import MemberItem from '../../components/MemberItem/MemberItem'
import './member.css'
import chineseToPinYin from '../../utils/chinese2pinyin';

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberData: {},
            teacher: [], //老师
            student: [], //学生
            parent: [], //家长
            currTab: 'teacher', //当前选项卡
            searchData: null //搜索结果
        }
    }
    componentDidMount() {
        // 根据班级id获取班级成员数据
        const id = this.props.match.params.id;
        if (id) {
            apiService.getClassMembers(id).then((result) => {
                let members = result.data;
                this.classifyMemberData(members);
            })
        }
    }

    classifyMemberData(members) {
        let teacher = [];
        let student = [];
        let parent = [];
        //把班级成员数据据分类
        members.data.forEach(item => {
            if (item.type === 'teacher') {
                teacher.push(item);
            } else if (item.type === 'student') {
                student.push(item);
            } else if (item.type === 'parent') {
                parent.push(item);
            }
        });
        this.setState({
            memberData: members,
            teacher: teacher,
            student: student,
            parent: parent
        });
    }

    handleTabSwitch(currTab) {
        this.setState({
            currTab: currTab,
            searchData: null //清空搜索数据
        });
    }
    handleSearch() {
        // 模糊搜索
        const value = this.inputText.value;
        const { currTab } = this.state;
        const members = this.state[currTab];
        let tmpMembers = members.filter((item, index) => {
            const name = item.name;
            const pinyin = chineseToPinYin(item.name)
            if (name.indexOf(value) !== -1 || pinyin === value || pinyin[0] === value) {
                return true;
            }
            return false;
        });
        this.setState({
            searchData: tmpMembers
        });
    }

    render() {
        const { memberData, teacher, student, parent, currTab} = this.state;
        return (
            <section className="l-main__bd">
                <div className="l-mem__hd">
                    <div className="mem-class-name">{memberData ? memberData.class_name:'暂无班级信息'}</div>
                    <div className="o-search">
                        <input type="text"
                            className="o-search__input"
                            placeholder="快捷查找"
                            ref={(text) => {this.inputText = text}}/>
                        <button className="o-search-btn" onClick={this.handleSearch.bind(this)}>
                            <i className="o-icon o-icon--search--white"></i>
                        </button>
                    </div>
                </div>
                <div className="l-mem__bd">
                    <ul className="mem-tab">
                        <li className={'mem-tab__item' + (currTab === 'teacher' ? ' ui-active':'')}
                            onClick={this.handleTabSwitch.bind(this, 'teacher')}>
                            所有老师（{teacher.length}）
                        </li>
                        <li className={'mem-tab__item' + (currTab === 'student' ? ' ui-active':'')}
                            onClick={this.handleTabSwitch.bind(this, 'student')}>
                            所有学生（{student.length}）
                        </li>
                        <li className={'mem-tab__item' + (currTab === 'parent' ? ' ui-active':'')}
                            onClick={this.handleTabSwitch.bind(this, 'parent')}>
                            所有家长（{parent.length}）
                        </li>
                    </ul>
                    <div className="mem-list">
                        {
                            this.state.searchData
                                ? this.state.searchData.map((memberItem, index) => {
                                    return <MemberItem key={index} memberItem={memberItem}/>
                                }) :
                                (this.state[currTab]
                                    ? this.state[currTab].map((memberItem, index) => {
                                        return <MemberItem key={index} memberItem={memberItem}/>
                                    }):null
                                )
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default Member;