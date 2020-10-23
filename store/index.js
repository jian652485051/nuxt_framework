import v_getters from './getters'
import v_mutations from './mutations'
import v_actions from './actions'

import { api } from '../config'
const admin_url = api;

export const strict = false
export const state = () => ({
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
})
export const getters = v_getters
export const mutations = v_mutations
export const actions = v_actions