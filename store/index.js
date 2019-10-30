import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import { api } from '../config'

const admin_url = api;

export default () => {
  return new Vuex.Store({
    state: {
      domain:"",
      adminDomain:admin_url,
      common_data:{},
      token:"",
      userCheck:false,
      user:{},
      download_url:admin_url+"/index.php/web/public/downfile?file_id=",
      upload_url:admin_url+"/index.php/web/file/upload",
      news_list:[],
      news_detail:{}
    },
    getters,
    mutations,
    actions
  })
}