<template>
    <header class="pageHeader">
        <div class="wrap flex-row">
            <nav class="pageNav flex-1">
                <ul class="fix">
                    <li v-for="(e, i) in nav" :key="i" :class="{'active':navActive(e)}"><nuxt-link :to="e.path">{{e.name}}</nuxt-link></li>
                </ul>
            </nav>
            <div>
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
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            nav:[
                {
                    name:'首页',
                    path:"/"
                },
                {
                    name:'新闻',
                    path:"/news"
                }
            ]
        }
    },
    computed: {
        ...mapState([
            'common_data',
            'userCheck',
            'user',
            'token'
        ])
    },
    watch: {
        '$route'(to){
            if(to.path != '/'){
                document.getElementsByTagName("body")[0].classList.remove('gray-bg')
            }
        }
    },
    methods: {
        navActive(e){
          let path = '/'
          if(this.$route.matched[0] && this.$route.matched[0].path){
            path = this.$route.matched[0].path
          }
          if(e.path == path){
            return true
          }
        }
    }
}
</script>

<style lang="postcss" scoped>
.pageHeader { height:100px; background-color:#ddd;}
.pageNav {
    li {
         float:left;
    }
    a {
        display:block;
        font-size:16px;
        padding:10px;
    }
    .active a {
        color:var(--def-color);
    }
}
</style>