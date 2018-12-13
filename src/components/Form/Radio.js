import React, { Component } from 'react';

class Radio extends Component {
    _handleRadioClick(e) {
        // console.log(e.currentTarget);
        let radioed = e.currentTarget;
        let siblings = e.currentTarget.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList && siblings[i].classList.remove('c-radio--radioed');
        }
        radioed.classList.add('c-radio--radioed');
        // radioed.childNodes[0].checked = true; //没啥用
        //执行父元素onchange方法,传入一个自定义event对象,包含targe属性
        this.props.onChange({
            target: {
                value: radioed.childNodes[0].value,
                name: radioed.childNodes[0].name
            }
        });
    }
    render() {
        const { name, label, required, items, onChange} = this.props;
        return (
            <div className="c-form-item">
                <label htmlFor={name} className="c-form__label o-text">{label}</label>
                <div className="c-form-input">
                    {
                        // 渲染单选按钮组
                        items.map((item, index) => {
                            return (
                                <div className={"c-radio"+(index === 0 ? ' c-radio--radioed':'')} key={index} onClick={(e) => this._handleRadioClick(e)}>
                                    <input type="radio" name={name} value={item} required={required}/>
                                    <i className="c-radio__icon"></i>
                                    <div className="o-text">{item}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
  }
}

export default Radio;