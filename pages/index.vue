<template>
    <section class="pageMain">

        <div class="wrap">
            主体内容
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
        ...mapState(['common_data','user','token'])
    },
}
</script>

<style scoped>

</style>