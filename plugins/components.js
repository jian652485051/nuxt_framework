import Vue from 'vue'
import nodata from '@/components/NoData.vue'
import login from '@/components/login.vue'

const components = { 
    nodata,
    login
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
