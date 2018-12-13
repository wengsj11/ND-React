import axios from 'axios';

/* 
  axios数据接口
*/
const host = 'http://localhost:3003';
const apiService = {
  /* GET方式获取班级数据 */
  getClassList(id = '', param='') {
    return axios.get(host + '/list/' + id + '?' + param);
  },
  /* POST方式发送班级数据 */
  postClassList(data, id = '') {
    return axios.post(host + '/list/' + id, data);
  },
  /* GET方式获取班级成员数据 */
  getClassMembers(id = '', param='') {
    return axios.get(host + '/members/' + id + '?' +param);
  },
  /* POST方式发送班级成员数据 */
  postClassMembers(data, id = '') {
    return axios.post(host + '/members/' + id, data);
  }
}

export default apiService;