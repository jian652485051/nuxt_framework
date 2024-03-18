<template>
    <section class="pageMain">
        <div class="wrap">
            <div class="title">{{news_detail.title}}</div>
            <div class="time">{{news_detail.created_at | formatDate}}</div>
            <div class="content" v-html="news_detail.content"></div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    middleware: 'auth',
    async asyncData({ store, route, error }) {
        let params = {
            id: route.params.id || ''
        }
        await store.dispatch('public_detail', params).catch((e) => {
            error({ statusCode:e.data.status, message:e.data.statusCode })
        })
        return {
            queryParam: params
        }
    },
    head(){
        return {
            title:'新闻详情 -' + this.common_data.title,
        }
    },
    computed: {
        ...mapState([
            'common_data',
            'news_detail'
        ])
    },
    mounted() {
        //console.log(this.news_detail)
    }
}
</script>

<style scoped>
.title { text-align:center; font-size:20px; color:#333;}
.time { text-align:center; border-bottom:#ddd 1px solid; padding:8px 0;}
.content { padding:20px;}
</style>