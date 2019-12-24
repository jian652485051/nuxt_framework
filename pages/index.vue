<template>
    <section class="pageMain">

        <div class="wrap">
            主体内容
            
            <responsive min="-1" max="543">
              <div>pagesize：xs</div>
            </responsive>
            <responsive min="544" max="767">
              <div>pagesize：sm</div>
            </responsive>
            <responsive min="768" max="991">
              <div>pagesize：md</div>
            </responsive>
            <responsive min="992" max="1199">
              <div>pagesize：lg</div>
            </responsive>
            <responsive min="1200">
              <div>pagesize：xl</div>
            </responsive>

            
        </div>

    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    head(){
        return {
            title:this.common_data.title
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
}
</script>

<style scoped>

</style>