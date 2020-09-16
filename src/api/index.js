import qs from 'qs'
import axios from 'axios'

console.log("22222222");
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
if (location.hostname === 'localhost') {
  var uri = 'http://search.localhost.com'
  // var uri = 'https://audit.123456q.com/'

} else {
  if (document.location.protocol === 'https:') {
    var uri = 'https://audit.123456q.com'
  } else {
    var uri = 'http://audit.123456q.com'
  }
}

const Http = (params, data) => {
  let option = {
    method: params.method || 'get',
    url: params.url,
    baseURL: uri,
    params: data,
    data: qs.stringify(data),
    withCredentials: true
  }
  if (params.method === 'post') {
    delete option.params
  } else {
    delete option.data
  }
  return new Promise((resolve, reject) => {
    axios(option)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 提审游戏录入
export const addGame = params => {
  return Http({
    method: "post",
    url: '/Home/Back/addGame'
  }, params)
}

// 创建者列表
export const User = params => {
  return Http({
    url: '/Home/Back/User'
  })
}

// 查询访问记录
export const showIPInfo = params => {
  return Http({
    method: "post",
    url: '/Home/Back/showIPInfo'
  }, params)
}

// 更新提审状态
export const updateAuditState = params => {
  return Http({
    method: "post",
    url: '/Home/Back/updateAuditState'
  }, params)
}

// 全部数据
export const getAllAudit = params => {
  return Http({
    method: "post",
    url: '/Home/Back/get_all_audit'
  }, params)
}

// 添加创建者
export const addUser = params => {
  return Http({
    method: "post",
    url: '/Home/Back/add_user'
  }, params)
}

// 修改游戏名称
export const editApp = params => {
  return Http({
    method: "post",
    url: '/Home/Back/edit_app'
  }, params)
}

// 是否登录
export const checkLogin = params => {
  return Http({
    url: '/Home/Login/checkLogin'
  }, params)
}

// 登录接口
export const loginAdmin = params => {
  return Http({
    method: "post",
    url: '/Home/Login/login'
  }, params)
}
// 	获取关键词分类列表
export const getKeyword = params => {
  var lang = localStorage.getItem('language') ? localStorage
    .getItem('language') : 'cn';
  return Http({
    method: "get",
    url: '/Home/KeywordRank/get_category?language=' + lang
  }, params)
}
// 获取语言
export const getLanguage = params => {
  return Http({
    url: '/Home/KeywordRank/get_language '
  }, params)
}
//获取关键词串
export const getKeystr = params => {
  var lang = localStorage.getItem('language') ? localStorage
    .getItem('language') : 'cn';
  return Http({
    method: "post",
    url: '/Home/KeywordRank/get_key_str?language=' + lang
  }, params)
}
export const upLoad = params => {
  var lang = localStorage.getItem('language') ? localStorage
    .getItem('language') : 'cn';
  return Http({
    method: "post",
    url: '/Home/KeywordRank/upload_excel?language=' + lang
  }, params)
}
export const getDownUrl = params => {
  var lang = localStorage.getItem('language') ? localStorage
    .getItem('language') : 'cn';
  return Http({
    method: "get",
    url: '/Home/KeywordRank/download_excel?language=' + lang
  }, params)
}
export const getThinkword = params => {
  return Http({
    method: "post",
    url: '/Home/KeywordRetrieval/get_key_list'
    // url: '/Home/KeywordRetrieval/test'
  }, params)
}

//下载
export const downloadThinkword = params => {
  return Http({
    method: "post",
    url: '/Home/KeywordRetrieval/get_key_excel'
  }, params)
}
export const postThinkword = params => {
  return Http({
    method: "post",
    url: '/Home/KeywordRetrieval/get_key_str'
  }, params)
}

//获取清榜结果
export const getCearList = params => {
  return Http({
    url: '/Home/ClearList/get_key_info'
  }, params)
}
//手动更新
export const handGet = params => {
  return Http({
    url: '/Home/ClearList/time_set'
  }, params)
}
//获取清榜结果详情
export const getCearListinfo = params => {
  checkLogin
  return Http({
    method: "post",

    url: '/Home/ClearList/get_key_list'
  }, params)
}
//删除清榜结果
export const deleteCearList = params => {
  return Http({
    method: "post",
    url: '/Home/ClearList/delete_key'
  }, params)
}
//获取历史预测
export const getHistoryJudge = params => {
  return Http({
    method: "post",
    url: '/Home/ClearList/get_history_judge'
  }, params)

}
//获取历史周期
export const getHistoryKeyword = params => {
  return Http({
    method: "post",
    url: '/Home/ClearList/get_history_keyword'
  }, params)
}
//获取国外关键词
export const getKeywordApp = params => {
  return Http({
    url: '/Home/KeywordApp/index'
  }, params)
  // return new Promise((resolve,reject)=>{
  //   setTimeout(()=>{
  //       resolve(params)
  //   },500)
  // })
}



//获取微信联想词
export const getWechatThink = params => {
  //get参数 keyword
  return Http({
    url: '/laravel/public/admin/api/search_sub'
    // url: '/admin/api/search_sub'
  }, params)
}
//获取小程序联想词
export const getWechatThinkWord = params => {
  //get参数 keyword
  return Http({
    url: '/laravel/public/admin/api/search_wechat_sub'
    // url: '/admin/api/search_wechat_sub'
  }, params)
}

//获取微信小程序搜索
export const getWechatSearch = params => {
  //get参数 keyword
  return Http({
    url: '/laravel/public/admin/api/search_app'
    // url: '/admin/api/search_app'
  }, params)
}

//获取小程序搜索关键词
export const getWechatSearchWord = params => {
  //get参数 keyword
  return Http({
    url: '/laravel/public/admin/api/search_wechat_app'
    // url: '/admin/api/search_wechat_app'
  }, params)
}
//获取商标注册
export const getBrandRegister = params => {
  //get参数 keyword
  return Http({
    url: '/laravel/public/admin/api/get_cnipa'
    // url: '/admin/api/get_cnipa'
  }, params)
}
//下载商标注册
export const downloadBrandRegister = params => {
  //get参数 keyword,c_id
  return Http({
    url: '/laravel/public/admin/api/download_cnipa'
    // url: '/admin/api/download_cnipa'
  }, params)
}
export const postKeyWordUrl = uri + 'Home/KeywordRank/add_jieba_dict';
export const downloadUrl = uri;
export const uploadUrl = uri + 'Home/KeywordRank/upload_excel';
export const verify = uri + '/Home/Login/verify';
export const excelBrandRegisterUrl = uri + "/laravel/public/admin/api/download_cnipa";
