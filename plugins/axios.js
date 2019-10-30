
import Vue from 'vue'
let $this = Vue.prototype;

export default function ({ $axios, redirect,store }) {
    $axios.onRequest(config => {
        config.headers['Content-Type'] = 'application/json';
        //config.headers['school'] = store.state.domain;
        if(store.state.token){
            config.headers['Authorization'] = store.state.token;
        }
        return config;
    }),
    
    $axios.onResponse(response => {
        let status = response.data.status;
        let statusCode = response.data.statusCode;
        if(status != 200){
            switch (status) {
                case 400:
                    $this.$message({
                        message: statusCode || '请求参数异常',
                        type: 'error'
                    });
                    break;
                case 401:
                    $this.$message({
                        message: statusCode || '账号登录失效，请重新登录',
                        type: 'error',
                        onClose(){
                            $this.common.emit("logout");
                        }
                    });
                    break;
                default:
                    $this.$message({
                        message: statusCode || '服务端异常，请联系技术支持',
                        type: 'error'
                    });
                    break;
            }
            return Promise.reject(response);
        }
        return response;
    })

    $axios.onError(error => {
        console.log(error);
        // const code = parseInt(error.response && error.response.status)
        // if (code === 400) {
        //     //redirect('/400')
        // }
        // let statusCode = error.data.statusCode;
        // $this.$message({
        //     message: statusCode || '系统发生错误',
        //     type: 'error'
        // });
    })
}