<template>
    <section class="pageMain">

        <div class="wrap">
            <div v-if="token">
                <div v-if="userCheck">
                    用户名：{{user.username}} <br>
                    手机号：{{user.mobile}} <br>
                    <el-button type="primary" @click="common.emit('logout')">退出登录</el-button>
                </div>
                
            </div>
            <div v-else>
                <el-button type="primary" @click="common.emit('unlogin')">登录</el-button>
            </div>
        </div>

    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState([
            'userCheck',
            'user',
            'token'
        ])
    },
}
</script>

<style scoped>
.pageMain { padding:20px 0;}
</style>