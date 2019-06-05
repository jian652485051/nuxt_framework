export default {
    async nuxtServerInit({ dispatch, commit, getters }, { req, res }) {
        //console.log(req.headers);

        //存储前端域名
        let domain = 'http://'+req.headers.host
        commit('SET_DOMAIN',domain);

        //存储cookie中的token
        let cookieToJson = cookie => {
            let cookieArr = cookie.split(";");
            let obj = {} 
            cookieArr.forEach((i) => {
                let arr = i.split("=");
                obj[arr[0]] =arr[1];
            });
            return obj
        }
        if (req.headers.cookie) {
            let cookies = req.headers.cookie
            let token = cookieToJson(cookies).token || ''
            commit('SET_TOKEN', token)
        }

        //页面渲染前从接口获取网站基础配置
        const data = await this.$axios.$get(`${getters.baseUrl}/index.php/web/school/config`)
        //console.log(data);
        commit('SET_COMMON', data);
    },
    
    //登录
    async LOGIN({ commit, state, getters }, params) {
        const data = await this.$axios.$post(`${getters.baseUrl}/index.php/web/public/login`,params)
        if(data.data){
            commit('SET_TOKEN', data.data.access_token)
            commit('SET_USER', data.data)
        }
        return data
    },

    // 新闻列表
    async NEW_LIST({ commit, state, getters }, params) {
        const data = await this.$axios.$get(`${getters.baseUrl}/index.php/web/public/article`,{params:params})
        if(data){
            commit('NEW_LIST', data)
        }
        return data
    },

    // 新闻详情
    async NEW_DETAIL({ commit, state, getters }, params) {
        const data = await this.$axios.$get(`${getters.baseUrl}/index.php/web/public/detail`,{params:params})
        if(data){
            commit('NEW_DETAIL', data.data)
        }
        return data
    },

}
