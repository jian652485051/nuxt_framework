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
@import 'root.css';

html,body { min-height:100%;}
html { position:relative; min-width:var(--wrapper); overflow-x:auto;}
body { margin:0; padding:0 0 100px; background-color:var(--bodybg-color); color:var(--def-text-color); font-size:var(--def-font-size); font-family:var(--def-font); line-height:1.8;}
textarea {font-family:var(--def-font);}
ul,li {list-style-type:none; margin:0; padding:0;}
em { font-style:normal;}
h1,h2,h3,h4,h5,h6,p,dl,dt,dd { margin:0; padding:0;}
img { border:0; max-width:100%; height:auto;}
a { color:#333333; text-decoration:none; transition:all 0.3s ease; cursor:pointer;}
a:hover { color:var(--def-color);}
s { color:#999999;}

.fix { *zoom:1; *clear:both;}
.fix:before, .fix:after { display:table; clear:both; content:'';}
.l { float:left;}
.r { float:right;}
.tl { text-align:left;}
.tr {text-align:right;}
.tc {text-align:center;}
.color { color:var(--def-color);}
.dib { display:inline-block; white-space:nowrap;}
.el { overflow:hidden; white-space:nowrap; text-overflow:ellipsis;}
.hide { display:none;}
.fz14 { font-size:var(--fz14);}
.fz16 { font-size:var(--fz16);}
.wrap { width:var(--wrapper); margin-left:auto; margin-right:auto;}
.noLink { cursor:default;}
.mb15 { margin-bottom:15px;}
.pb30 { padding-bottom:30px;}
.red { color:var(--red);}

/* flex栅格 */
.flex-col { overflow:hidden; display:-ms-box; display:-ms-flexbox; display:flex; flex-direction:column; -ms-flex-direction:column;}
.flex-row { overflow:hidden; display:-ms-box; display:-ms-flexbox; display:flex;}
.flex-1 { flex:1; min-width:0;}
.flex-2 { flex:2; min-width:0;}
.flex-3 { flex:3; min-width:0;}
.flex-4 { flex:4; min-width:0;}
.align-stretch { -ms-align-items:stretch; -ms-flex-align:stretch; align-items:stretch;}
.align-center { -ms-align-items:center; -ms-flex-align:center; align-items:center;}
.justify-center { -ms-box-pack:center; -ms-flex-pack:center; justify-content:center;}

.pageMain { padding:20px 0;}
</style>
