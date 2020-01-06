<template>
  <el-dialog title="登录" :visible.sync="dialogVisible" class="sooc_box" custom-class="sooc_box" width="325px">
    <span slot="title" class="dialog-title">
        <label>登录</label>
        <span>Login</span>
    </span>
    <el-form ref="loginForm" :model="queryParam" :rules="rules" class="login-form">
        <el-form-item prop="code">
            <el-input placeholder="输入用户名" v-model="queryParam.code" @keypress.enter.native="login()" :autofocus="true"><i slot="prefix" class="el-input__icon account"></i></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input placeholder="输入密码" type="password" v-model="queryParam.password" @keypress.enter.native="login()"><i slot="prefix" class="el-input__icon pwd"></i></el-input>
        </el-form-item>
        <el-form-item class="submit-item">
             <el-button type="primary" class="submit-button" @click="login" :loading="loading" round>登录</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
const md5 = require('js-md5');

export default {
    data(){
        return {
            dialogVisible:false,
            loading: false,
            queryParam: {
                code: '',
                password: ''
            },
            rules: {
                code: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    //{ min: 0, max: 20, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    //{ min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        dialogVisible(type){
            if(type == false){
                this.$refs.loginForm.resetFields();
            }
        }
    },
    methods: {
        loginShow(){
            this.dialogVisible = true;
        },
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let password = md5(this.queryParam.password)

                    this.$store.dispatch('LOGIN',{code:this.queryParam.code,password:password}).then((res) => {
                        this.$message.success(res.statusCode);
                        let data = res.data;
                        this.common.setCookie('token',data.access_token, 0);
                        this.common.storage('user',data);
                        this.dialogVisible = false;
                        setTimeout(() => {
                            window.location.reload();
                        }, 200);
                    })
                } else {
                    return false;
                }
            });
        
        }
    },
    mounted() {
        this.common.on("unlogin",()=>{
            this.loginShow()
        });
    },
}
</script>

<style lang="postcss" scoped>
.sooc_box.el-dialog {   }
.sooc_box {
    >>> .el-dialog__header {  padding: 20px 30px 0; border: 0 !important; }
    .submit-button { width: 100%; margin-top: 10px; }
    .dialog-title { 
        label { font-size: 18px; color: #0f6ab4; }
        span { font-size: 12px; color: #b0c6e0; padding-left: 8px; }
    }
    >>> .el-dialog__body {
        padding: 25px 30px 10px;
        box-shadow: 0 10px 10px -5px #3a5f7a;
    }
    >>> .el-input {
        input { background: #e9f0f5; border: 0; padding-left: 45px; }
        .el-input__prefix { left: 15px; }
        i:after { width: 18px; height: 18px; }
        .account:after { background: resolve('m01.png')no-repeat; }
        .pwd:after { background: resolve('m02.png')no-repeat; }
    }
}
</style>
