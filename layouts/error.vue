<template>
    <section class="error">
        <div class="tc"><i class="el-icon-warning"></i></div>
        <h2 class="error-info" v-if="error.statusCode == '404'">页面不存在</h2>
        <h2 class="error-info" v-else>{{ error.message }}</h2>
    </section>
</template>
<script>
export default {
    props: ['error'],
    mounted() {
        //console.log(this.$route.params);
        if(this.error.statusCode == '401'){
            this.common.delCookie();
            this.$store.state.token = '';
            this.common.storage('user','');
            setTimeout(() => {
                window.location.href='/'
            }, 1000);
        }
    }
}
</script>

<style lang="postcss" scoped>
.error {
  text-align: center;
  padding:70px 0;
  color:var(--gray);
  .el-icon-warning {
    font-size:50px;
    margin-bottom:10px;
  }
  .error-title {
    font-size: 50px;
    font-weight: bold;
  }
  .error-info {
    font-weight: normal;
    margin-bottom:20px;
  }
  .error-button {
    margin: 25px;
  }
}
</style>