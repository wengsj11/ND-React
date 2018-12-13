import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false //表示是否处于下拉状态
    }

    this._handleSelectClick = this._handleSelectClick.bind(this);
  }
  componentWillMount() {
    //设置点击除下拉框外的元素触发隐藏
    document.body.addEventListener('click', (event) => {
      if (this.textDOM && event.target !== this.textDOM) {
        this.setState({selected: false});
        this.textDOM.parentNode.parentNode.classList.remove('c-select--selected');
      }
    }); 
  }
  _handleSelectClick() {
    //下拉框点击事件
    let selectDom = this.textDOM;
    let { selected } = this.state;
    let select = selectDom.parentNode.parentNode;
    if (!selected) {
      this.setState({selected: true});
      select.classList.add('c-select--selected');
    } else {
      select.classList.remove('c-select--selected');
      this.setState({selected: false});
    }
  }

  _handleItemSelect(e) {
    // 下拉列表选择赋值
    let selectDom = this.textDOM;
    selectDom.value = e.target.innerHTML;
    // 执行父元素的valueChange事件，由于下拉框无法触发onchange事件，直接传入一个自定义event对象,包含targe属性
    this.props.onChange({
      target: {
        name: selectDom.name,
        value:selectDom.value
      }
    })
    // selectDom.blur();
  }
  
  render() {
    const { name, label, placeholder, required, items, onChange, valid} = this.props;
    return (
      <div className="c-form-item">
        <label htmlFor="grade" className={"c-form__label o-text" + (required ? ' label--required':'')}>{label}</label>
        <div className="c-form-input">
          <div className="c-select">
            <div className="c-select__title">
              <input type="text"
                className="c-input"
                name={name}
                placeholder={placeholder}
                onClick={this._handleSelectClick}
                onChange={onChange}
                ref={(text) => this.textDOM = text}
                required={required} readOnly />
              <i className="c-select__icon"></i>
            </div>
            {
            // 校验错误信息
              !Boolean(valid) ? (
                <span className="o-text--error">{this.props.error}</span>
              ):''
            }
            <dl className="c-select-items">
              {
                //渲染下拉列表元素
                (items && items.length > 0)? (
                  items.map((item, index) => {
                    return <dd key={index} onClick={(e) => this._handleItemSelect(e)}>{item}</dd>;
                  })
                ):null
              }
            </dl>
          </div>
        </div>
      </div>
    );
  }
}

export default Select;