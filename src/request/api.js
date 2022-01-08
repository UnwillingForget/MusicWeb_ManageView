//api接口统一管理
import {get,post} from "./Http";

//判断管理员是否成功登录
export const getLogin = (params) => post(`admin/login`,params);

//查询所有歌手
export const getAllSinger = () => get(`singer/SelectAll`);

//根据歌手名搜索
export const getSingerByName = (params) => post(`singer/SelectByName`,params);

//添加歌手
export const AddSinger = (params) => post(`singer/AddSinger`,params);

//编辑歌手
export const changeSinger = (params) => post(`singer/UpdateSinger`,params);

//删除歌手
export const deleteById = (id) => get(`singer/DeleteSinger?id=${id}`);
