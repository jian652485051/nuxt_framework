<template>
<div class="layout">
    <Header />
    <nuxt />
    <Footer />
    <login />
</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/PageHeader.vue'
import Footer from '@/components/PageFooter.vue'
export default {
    components:{
        Header,
        Footer
    },
    head(){
        return {
            link:[
                { rel:'icon', type:'image/x-icon', href:this.common_data.icon}
            ]
        }
    },
    data() {
        return {}
    },
    computed: {
        ...mapState([
            'common_data'
        ])
    },
    methods:{
        logout(){
            //退出登录
            this.common.delCookie();
            this.$store.state.token = '';
            this.common.storage('user','');
            window.location.href='/'
        }
    },
    mounted() {
        //console.log(this.common_data);
        //localstorage存取用户信息
        let user = this.common.storage('user') || '';
        this.$store.state.user = user;
        this.$store.state.userCheck = true;
        //全局监听退出登录
        this.common.on("logout",() =>{
            this.logout();
        });
    }
}
</script>

<style lang="postcss">
@import "assets/css/root.css";
</style>
