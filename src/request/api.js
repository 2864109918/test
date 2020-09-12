import {
    get,
    post,
    post2
} from './http';



/*
 * 图片上传接口
 */
export const setImg = (params) => post2('api/user/upload', params);


//!-----------------------------------获取配置数据--------------------------------------------

/*
 *忘记密码管理员手机号获取
 */

export const indexConfig = (params) => post('api/index/config', params);



//!-----------------------------------登录--------------------------------------------

/*
 * 登录接口
 */
export const login = (params) => post('api/user/login', params);

/*
 * 注册接口
 */
export const register = (params) => post('api/user/register', params);





//!-----------------------------------答题--------------------------------------------
/*
 * 用户是否可以答题
 */
export const getstate = (params) => get('api/user/canAnswer', params);
/*
 * 获取题目
 */
export const getQues = (params) => get('api/Questionbank/question', params);
/*
 * 提交答案
 */
export const upAnsw = (params) => post('api/Questionbank/determineAnswer', params);

/*
 * 完成考试
 */
export const submit = (params) => post('api/Questionbank/questionGroup', params);


/*
 * 申请考试
 */
export const answerApply = (params) => post('api/Questionbank/answerApply', params);




//!-----------------------------------我的主页--------------------------------------------


/*
 * 个人资料
 */
export const userInfo = (params) => post('api/user/personalInformation', params);

/*
 * 修改头像
 */
export const userAvatar = (params) => post('api/user/modifyAvatar', params);


/*
 * 我的页面
 */
export const myCenter = (params) => post('api/user/myCenter', params);


/*
 * 答题记录
 */
export const answerRecord = (params) => post('api/user/answerRecord', params);




//!-----------------------------------公告--------------------------------------------

/*
 * 公告详情
 */
export const notice_detail = (params) => post('api/Article/notice_detail', params);


/*
 * 通知公告
 */
export const notice_list = (params) => post('api/Article/notice_list', params);



//!-----------------------------------设置--------------------------------------------

/*
 * 退出登录
 */
export const loginOut = (params) => post('api/user/logout', params);

/*
 * 修改登录密码
 */
export const changePsd = (params) => post('api/user/edit_password', params);




//!----------------------------------意见反馈--------------------------------------------
/*
 * 修改登录密码
 */
export const feedback = (params) => post('api/Message/feedback', params);


