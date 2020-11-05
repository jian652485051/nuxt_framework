<template>
    <section class="pageMain">
        <div class="wrap">
            <ul>
                <li class="flex-row" v-for="(e,i) in news_list.data" :key="i">
                    <div class="flex-1">
                        <nuxt-link :to="{name:'news-detail-id',params:{id:e.id}}">{{e.title}}</nuxt-link>
                    </div>
                    <div class="time">{{e.created_at | formatDate('yyyy-MM-dd')}}</div>
                </li>
            </ul>
            <div v-if="Number(news_list.totalRows) > 0">
                <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="Number(news_list.totalRows)"></el-pagination>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    async asyncData({ store, route, error }) {
        let params = {
            p: route.params.p || 1,
            pagesize: 10
        }
        await store.dispatch('NEW_LIST', params).catch((e) => {
            error({ statusCode:e.data.status, message:e.data.statusCode })
        })
        return {
            queryParam: params
        }
    },
    head(){
        return {
            title:'新闻列表 -' + this.common_data.title,
            script: [
              { src:'/js/jquery.min.js', type: 'text/javascript', charset: 'utf-8', 
                async: true,
                //body: true,
                onload:"var event = new Event('jsload');document.dispatchEvent(event);"
              },
            ]
        }
    },
    computed: {
        ...mapState([
            'common_data',
            'news_list'
        ])
    },
    methods: {
        pageChange(p){
            //console.log(p);
            this.$router.push({name:'news-p',params:{p:p}});
        },
        jsReady() {
          //第三方js加载完成后
          document.removeEventListener("jsload", this.jsReady);
          $('body').addClass('ok');
        },
    },
    mounted() {
        document.addEventListener("jsload", this.jsReady, { passive: true });
        //console.log(this.news_list)
    },
}
</script>

<style scoped>

</style>