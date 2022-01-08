import axios from 'axios';
import {data} from "autoprefixer";
//访问框架
axios.defaults.timeout = 5000;//超时时间
axios.defaults.withCredentials = true;//允许跨域
//响应头Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-from-urlencoded;charset=UTF-8';
//基础url
axios.defaults.baseURL='http://localhost:8808';

//响应拦截器
axios.interceptors.response.use(
  response => {
    //若response里的状态码为200，则说明访问到接口，否则错误
    if(response.status = 200){
      return Promise.resolve(response);
    }else {
      return Promise.reject(response);
    }
  },
  error => {
    if(error.response.status){
      switch (error.response.status){
        case 401: //未登录
          router.replace({
          path:'/',
          query:{
            redirect:router.currentRoute.fullPath
          }
        });
          break;
        case 404: //没找到界面
      }
      return Promise.reject(error.response)
    }
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 */
export function get(url,data={}){
  return new Promise((resolve, reject) =>{
    axios.get(url, {
      params: data
    }).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data);
    })
  });}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, data={}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error =>{
        reject(error.data);
      })
  });
}



