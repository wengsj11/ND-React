import React, { Component } from 'react';
import './create.css'
import Form from '../../components/Form/Form'
import Input from '../../components/Form/Input'
import Select from '../../components/Form/Select'
import Radio from '../../components/Form/Radio'
import Button from '../../components/Form/Button'
import apiService from '../../service/api'
import { Redirect } from 'react-router-dom';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //字段值状态
            school: '',
            grade: '',
            year: '',
            className: '',
            type: '行政班',
            permisson: '允许退出',
            //字段校验状态
            schoolValid: true,
            gradeValid: true,
            yearValid: true,
            classNameValid: true,
            //加载中状态
            loading: false,
            //提交是否失败状态
            failed: false,
            //router跳转状态
            redirect: false,
            //当前表单将要提交数据的id，为数据库中最后一条数据的id+1
            id: ''
        }
        this._handleValueChange = this._handleValueChange.bind(this);
        this._handleOnSubmit = this._handleOnSubmit.bind(this);
    }

    componentDidMount() {
        //获取最后一条list数据的id
        let param = '_sort=id&_order=desc&_start=0&_end=1';
        apiService.getClassList('', param).then((result) => {
            const lastClassItem = result.data[0];
            // console.log('last id :'+lastClassItem.id);
            this.setState({ id: lastClassItem.id + 1 });
        }).catch((error) =>
                console.log('表单初始化失败')
            )
    }

    _handleOnSubmit(e) {
        this.setState({ loading: true }); //显示加载中图标
        e.preventDefault();
        const { school, grade, year, className, type, permisson } = this.state;
        const data = {
            school: school,
            grade: grade,
            year: year,
            className: className,
            type: type,
            permisson: permisson
        }
        // console.log(data);
        // 校验数据
        if (this.validateData(data)) {
            //验证通过，提交数据
            this.submitData(data);
        }
    }
    _handleValueChange(e) {
        // console.log(e.target);
        let newState = {};
        //根据表单name的值修改state
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    /* 校验数据 */
    validateData(data) {
        let valid = true;
        const validStates = {
            schoolValid: true,
            gradeValid: true,
            yearValid: true,
            classNameValid: true
        }
        if (!data["grade"] || data["grade"].length === 0) {
            validStates.gradeValid = false;
            valid = false;
        }
        if (!data["year"] || data["year"].length === 0) {
            validStates.yearValid = false;
            valid = false;
        }
        if (!Boolean(data["className"].match(/^[^_%]{0,20}$/g))) {
            validStates.classNameValid = false;
            valid = false;
        }
        this.setState(validStates)
        return valid;
    }
    /* 提交表单数据 */
    submitData(data) {
        if (!this.state.id) {
            //当前表单没有获取到id，则无法提交
            this.setState({
                failed: true,
                loading:false
            });
            return
        }
        /* class数据添加 */
        let classItem = this.toClassItem(data);
        apiService.postClassList(classItem).then((result) => {
            //...
        }).catch((error) => {
            this.setState({ failed: true });
        })
        
        /* member数据添加 */
        let member = {
            "id": classItem.id,
            "class_id": classItem.id,
            "class_name": classItem.className,
            "data": []
        };
        apiService.postClassMembers(member).then((result) => {
            //添加数据成功跳转至首页
            this.setState({ redirect: true });
        }).catch((error) => {
            this.setState({
                failed: true,
                loading: false
            });
        })
    }
    /* 表单数据转为班级项 */
    toClassItem(formdata) {
        let item = {
            "id": this.state.id,
            "school": formdata.school,
            "classTitle": formdata.grade,
            "grade": formdata.year,
            "className": formdata.className,
            "headteacher": "暂未设置",
            "studentNum": 0,
            "administrative": formdata.type ==='行政班' ? true:false,
            "img": formdata.type ==='行政班' ? "/images/class_work.png" : "/images/class_crown.png"
        }
        return item;
    }

    render() {
        if (this.state.redirect) {
            //如果数据提交成功，跳转至首页
            return <Redirect push to="/" />;
        }
        const { school, grade, year, className, type, permisson } = this.state;
        const { schoolValid, gradeValid, yearValid, classNameValid } = this.state;
        return (
        <section className="l-main__bd cr-content">
            <div className="cr-title o-text">
            尊敬的<span className="o-text--blue">老师（刘老师）</span>，请填写班级信息：
            </div>
            <Form form_id='form' onSubmit={this._handleOnSubmit}>
                <Input name='school' label='学校' required={false} placeholder="请选择学校" value={school} onChange={this._handleValueChange} valid={schoolValid ? 1:0}/>
                <Select name='grade' label='学段' placeholder='请选择学段' required={true} items={['小学', '初中', '高中', '大学']} value={grade} onChange={this._handleValueChange} valid={gradeValid ? 1:0} error='年段不能为空'/>
                <Select name='year' label='年级' placeholder='请选择年级' required={true} items={['一年级', '二年级', '三年级']} value={year} onChange={this._handleValueChange} valid={yearValid ? 1:0} error='年级不能为空'/>
                <Input name='className' label='班级名' required={false} placeholder="请输入班级名称，限20个字符，不支持输入_和%" value={className} maxLength="20" onChange={this._handleValueChange} valid={classNameValid ? 1:0} error='班级名称限20个字符，不支持输入_和%'/>
                <Radio name='type' label='类型' items={['行政班', '教学班']} value={type} onChange={this._handleValueChange}/>
                <Radio name='permisson' label='退出权限设置' items={['允许退出', '通过班级管理员审核后退出', '禁止退出']} value={permisson} onChange={this._handleValueChange}/>
                <Button value='保存' form='form' loading={this.state.loading ? 1:0} failed={this.state.failed ? 1:0} error='提交失败'/>
            </Form>
        </section>
        );
    }
}

export default Create;