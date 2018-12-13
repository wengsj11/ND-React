import apiService from '../../service/api';

// action types
const INIT_CLASSLIST = 'INIT_CLASSLIST'
const ADD_CLASSITEM = 'ADD_CLASSITEM'

// reducer
export default function (state, action) {
  if (!state) {
    state = { classList: [] }
  }
  switch (action.type) {
    case INIT_CLASSLIST:
      // 初始化班级项
      return {
        classList: action.classList
      }
    case ADD_CLASSITEM:
      // 增加班级项
      return {
        classList: [...state.classList, action.classItem]
      }
    default:
      return state
  }
}


// action creators
export const initClassList = () => {
    // 获取本地json数据
    apiService.getClassList().then((result) => {
      // console.log(result)
      if (result.data) {
        this.props.initClassList(result.data);
      }
    });
    return { type: INIT_CLASSLIST, result.data }
}
export const addClassItem = (classItem) => {
  return { type: ADD_CLASSITEM, classItem }
}