
import Vue from 'vue'
let $this = Vue.prototype;

export default function ({ store, error, redirect, req }) {
    if (!store.state.token) {
        // $this.$message({
        //     message:'未登录',
        //     type: 'error'
        // });
        error({
            message: '用户未登录，请登录后操作',
            statusCode: 403
        })
        //redirect('/')
    }
}
